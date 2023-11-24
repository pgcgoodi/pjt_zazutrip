
import React, { useEffect, useState } from 'react';
import ROSLIB from 'roslib';
import proj4 from 'proj4';

function ROS() {
  const [message, setMessage] = useState('');

  
  const utmProjection = "+proj=utm +zone=52";
  const wgs84Projection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
  let east = 0;
  let north = 0;
  let result = 0;

  let ros = new ROSLIB.Ros({
    url: 'ws://13.124.128.202:9091', // ROS Bridge WebSocket URL
  });
  
  useEffect(() => {

    ros = new ROSLIB.Ros({
    url: 'ws://13.124.128.202:9091', // ROS Bridge WebSocket URL
  });

    ros.on('connection', () => {
      console.log('Connected to ROS Bridge');
      // const listener = new ROSLIB.Topic({
      //   ros: ros,
      //   name: '', // 구독하려는 ROS 토픽 이름
      //   messageType: '', // 토픽 메시지 타입
      // });

      // listener.subscribe((message) => {
      //   console.log('Received message: ', message.data);
      //   setMessage(message.data);
      // });
    });

    ros.on('error', (error) => {
      console.error('Error connecting to ROS Bridge: ', error);
    });

    ros.on('close', () => {
      console.log('Connection to ROS Bridge closed');
    });
    

    return () => {
      ros.close();
    };
  }, []);

  function subscribe() {

    const GPS_topic_listner = new ROSLIB.Topic({
      ros: ros,
      name: "/gps",
      messageType: "morai_msgs/GPSMessage"
    });



    GPS_topic_listner.subscribe(function(data){
      // console.log('제발 되게 해주세요');
      console.log(data.latitude);
      console.log(data.longitude);
      
    });
    // console.log('제잘')
    
    // GPS_topic_listner.subscribe(data);
    // console.log('msg', data);
  }

  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////

  function utmTogps(east,north){
    let coords = proj4(utmProjection, wgs84Projection, [east,north]);
    return {
      latitude: coords[1],
      longitude: coords[0]
    };
  }


  function subscribe2() {
    const GPS_topic_listner = new ROSLIB.Topic({
        ros: ros,
        name: "/global_path",
        messageType: "nav_msgs/Path"
    });
    


    GPS_topic_listner.subscribe(function(data){

        // 배열 초기화
        let locations = [];

        // for문 돌려서 경로 재탐색
        for(let i = 0; i < data.poses.length; i++) {
            let east = data.poses[i].pose.position.x + 302459.942;
            let north = data.poses[i].pose.position.y + 4122635.537;
            
            // console.log(east, north);

            let result = utmTogps(east, north);
            // console.log(result.latitude, result.longitude);
            
            // 결과를 locations 배열에 추가
            locations.push([
                result.longitude,
                result.latitude
            ]);
        }
        console.log(locations);  // 전체 위치 데이터를 출력
        localStorage.setItem('locations', JSON.stringify(locations));

        // 메시지를 받은 후 즉시 구독 취소
        GPS_topic_listner.unsubscribe();
    });
    
    console.log('제잘');
}




  return (
    <div className="App">

      <p>{message}</p>
      <button onClick={() => subscribe()}>Publish</button>
      <button onClick={() => subscribe2()}>Path</button>
    </div>
  );
}

export default ROS;




