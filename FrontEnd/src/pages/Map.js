
import React, { useEffect, useState, useRef } from 'react';
import { Url } from '../server_url';
import axios from 'axios';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet';
import osm from "../osm-providers";
import osm2 from "../osm-providers2";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import ROSLIB from 'roslib';

import placeholderImage from '../assets/placeholder.png';
import HotelImage from '../assets/Hotel.png';
import coffeeImage from '../assets/coffee.png';
import restaurantImage from '../assets/restaurant.png';
import swimImage from '../assets/swimmer.png';
import beerImage from '../assets/beer.png';
import childrenImage from '../assets/children.png';
import stationImage from '../assets/station.png';
import barrierImage from '../assets/barrier.png';
import tanghuluImage from '../assets/tanghulu.png';
import CircleImage from '../assets/Circle.png'
import maraImage from '../assets/mara.png'
import parkingImage from '../assets/parking.png'


import ROSLIB from 'roslib';
import proj4 from 'proj4';

const url = Url

const center = { lat: 37.23954358351303, lng: 126.771327801793 };
const ZOOM_LEVEL = 15;

const createIcon = (iconUrl) => new L.Icon({
  iconUrl,
  iconSize: [45, 45],
});

const createIcon2 = (iconUrl) => new L.Icon({
  iconUrl,
  iconSize: [60, 60],
});

const defaultIcon = createIcon(placeholderImage);
const hotelIcon = createIcon(HotelImage);
const coffeeIcon = createIcon(coffeeImage);
const restaurantIcon = createIcon(restaurantImage);
const swimIcon = createIcon(swimImage);
const beerIcon = createIcon(beerImage);
const childrenIcon = createIcon(childrenImage)
const barrierIcon = createIcon(barrierImage)
const stationIcon = createIcon(stationImage)
const CircleIcon = createIcon(CircleImage)
const tanghuluIcon = createIcon(tanghuluImage)
const maraIcon = createIcon(maraImage)
const parkingIcon = createIcon(parkingImage)
const markers = [
  { position: [37.24514971019341, 126.77504146110552], icon: hotelIcon, label: '신라호텔' },

  { position: [37.24068299201391, 126.77130810123954], icon: restaurantIcon, label: '한국식 소고기 전문 음식점 [ 배꼽집]' },
  { position: [37.23833240877633, 126.77201420033694], icon: coffeeIcon, label: '커피빈' },
  { position: [37.24444434990808, 126.77585464595262], icon: swimIcon, label: '수영장' },
  { position: [37.23576639296262, 126.77286038119048], icon: beerIcon, label: '한잔어때' },

  { position: [37.241963098645286, 126.77443742793005], icon: barrierIcon, label: '공사중 막혀서 돌아감' }, //
  // { position: [37.23864139722333, 126.77278808039286], icon: defaultIcon, label: '한바퀴돌아서 도착' }, //  
  { position: [37.23854529782744, 126.77299597702779], icon: parkingIcon, label: '주차장' }, //  
  { position: [37.239071349649535, 126.77305532061546], icon: stationIcon, label: '호출지' }, //
  { position: [37.24000507292737, 126.77429711745246], icon: maraIcon, label: '마라탕집' }, //
  { position: [37.2430196110599, 126.77451974507942], icon: tanghuluIcon, label: '탕후루집' }, //

];

function Map() {
  const [isRented, setIsRented] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [clickedLatitude, setClickedLatitude] = useState(null);
  const [clickedLongitude, setClickedLongitude] = useState(null);
  const [mapType, setMapType] = useState('normal');
  const [modalContent, setModalContent] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [arrivedMessage, setArrivedMessage] = useState(null);

  useEffect(() => {
    console.log("Updated destinationCoords:", destinationCoords);
}, [destinationCoords]);



  const [showModal, setShowModal] = useState(false);

  const [carInfo, setCarInfo] = useState({ name: '', number: '', fuel_left: '' });

  // 예약 정보를 저장하기 위한 상태 추가

  const [vehicleId, setVehicleId] = useState(null); // to store vehicle id

  const [position, setPosition] = useState([0, 126.77313034628662]);

  const [reservationId, setReservationId] = useState(null);
  const [pathData, setpathData] = useState([])
  const [hasArrived, setHasArrived] = useState(false);
  const [lineStringData, setlineStringData] = useState({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: pathData
    }
  })
  const utmProjection = "+proj=utm +zone=52";
  const wgs84Projection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
  let east = 0;
  let north = 0;
  let result = 0;
  let ros = new ROSLIB.Ros({
    url: 'ws://13.124.128.202:9091', // ROS Bridge WebSocket URL
  });

  let storedLocations = localStorage.getItem('locations');
  let pathDat = storedLocations ? JSON.parse(storedLocations) : [];

  const returnVehiclePrompt = () => {
    setShowModal(true);
    setModalContent(false);
    localStorage.removeItem('locations');  
  };



  const callVehicle = async (lat, lng) => {
    try {
      setClickedLatitude(lat); // set latitude here
      setClickedLongitude(lng); // set longitude here

      const token = localStorage.getItem('token');
      const around_location = '제주';
      const postData = { around_location, lat, lng };
      const response = await axios.post(`${url}/vehicle/rightnow`, postData, { headers: { 'authorization': token } });
      console.log("Response Data:", response.data);
      let carName = '';
      switch (response.data.car_info_id) {
        case 1:
          carName = 'Niro';
          break;
        case 2:
          carName = 'K5';
          break;
        case 3:
          carName = 'Starex';
          break;
        default:
          carName = 'Unknown';
      }

      setCarInfo({
        name: carName,
        number: response.data.car_number,
        fuel_left: response.data.fuel_left,
      });

      // 예약 ID를 상태에 저장합니다.

      setVehicleId(response.data.id); // save vehicle_id to state
      setShowModal(true);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const returnVehicle = async () => {
    try {
      if (reservationId) {
        const token = localStorage.getItem('token');
        const headers = {
          'authorization': token,
          'Content-Type': 'application/json'
        };

        const response = await axios.put(`${url}/reservation/return`,
          { reservation_id: reservationId }, { headers });

        if (response.status === 200) {
          console.log("Vehicle returned successfully!");
          setReservationId(null);  // 예약이 성공적으로 반환된 후, reservationId를 초기화합니다.
        } else {
          console.error("Failed to return the vehicle");
        }

      } else {
        console.error("No reservation ID available for return");
      }

      setIsRented(false);
      setVehicleId(null);
      setShowModal(false); // 모달 창을 숨기는 코드 추가
      setModalContent(false); // Modal content를 예약으로 설정


    } catch (error) {
      console.error('Error while returning the vehicle:', error);
    }
  };


  useEffect(() => {
    console.log("Updated destinationCoords:", destinationCoords);
    ros = new ROSLIB.Ros({
      url: 'ws://13.124.128.202:9091', // ROS Bridge WebSocket URL
    });

    ros.on('connection', () => {
      console.log('Connected to ROS Bridge');

    });

    ros.on('error', (error) => {
      console.error('Error connecting to ROS Bridge:markers ', error);
    });

    ros.on('close', () => {
      console.log('Connection to ROS Bridge closed');
    });

    setInterval(subscribe4, 5000)


    return () => {
      ros.close();
    };
  }, []);
  useEffect(() => {
    setlineStringData((current) => {
      let newData = { ...current }
      newData.geometry.coordinates = pathData
      console.log(newData)
      return newData
    })

    let example = { ...lineStringData }
    example.geometry.coordinates = pathData
    console.log(example)
    setlineStringData(example)



  }, [...pathData]);

  function subscribe() {
    const GPS_topic_listner = new ROSLIB.Topic({
      ros: ros,
      name: "/gps",
      messageType: "morai_msgs/GPSMessage"
    });

    GPS_topic_listner.subscribe(function (data) {
      // 위도와 경도 값을 상태로 설정
      setPosition([data.latitude, data.longitude]);

      // 목적지 위도, 경도
      const targetLatitude = clickedPosition ? clickedPosition.lat : null;
      const targetLongitude = clickedPosition ? clickedPosition.lng : null;

      // 범위 설정
      const range = 0.000005;

      // 위도와 경도가 목적지의 범위 안에 있는지 확인
      if ((data.latitude >= targetLatitude - range && data.latitude <= targetLatitude + range) &&
        (data.longitude >= targetLongitude - range && data.longitude <= targetLongitude + range)) {
        console.log("목적지에 도착했습니다.");
        // usestate + modal() 이런 함수 띄워서 도착 표시하기 
      } else {
        // console.log(data.latitude);
        // console.log(data.longitude);
      }
    });

  }


  function utmTogps(east, north) {
    let coords = proj4(utmProjection, wgs84Projection, [east, north]);
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



    GPS_topic_listner.subscribe(function (data) {

      // 배열 초기화
      let locations = [];

      // for문 돌려서 경로 재탐색
      for (let i = 0; i < data.poses.length; i++) {
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
      // console.log(locations);  // 전체 위치 데이터를 출력
      localStorage.setItem('locations', JSON.stringify(locations));

      // 메시지를 받은 후 즉시 구독 취소
      GPS_topic_listner.unsubscribe();
    });


  }


  const RenderMarkers = () => {
    const token = localStorage.getItem('token');
    const handleSelectDestination = async (marker) => {
      console.log(marker.label);
      if (marker.label === '호출지') {

        console.log(token)
        const response = await axios.get(`${url}/vehicle/call`, { headers: { 'authorization': token } });
        console.log(response)
      }
      else if (marker.label === '마라탕집') {

        const postdata = { vehicle_id: vehicleId, destination_name: 'school' }
        const response = await axios.post(`${url}/vehicle/move`, postdata, { headers: { 'authorization': token } });
        console.log(response)
      }
      // 여기에서 원하는 작업을 수행할 수 있습니다.
    };
    return markers.map((marker, index) => (
      <Marker key={index} position={marker.position} icon={marker.icon}>
        <Popup>

          <div className={styles.centerContent}>
            <b>{marker.label}</b>
          </div>
          <br />


        </Popup>

      </Marker>
    ));
  };
  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        setClickedPosition({ lat: e.latlng.lat, lng: e.latlng.lng });

        console.log(`위도: ${e.latlng.lat}, 경도: ${e.latlng.lng}`);
      },
    });
    return null;
  };
  const reserveVehicle = async () => {
    try {
      const token = localStorage.getItem('token');
      const postData = {
        // reservation: true,
        lat: clickedLatitude,
        lng: clickedLongitude,
        vehicle_id: vehicleId
      };

      const response = await axios.post(
        `${url}/reservation/now`,
        postData,
        { headers: { 'authorization': token } }
      );

      if (response.status === 200) {
        console.log("Vehicle reserved successfully!");
        setIsRented(true); // 예약이 성공하면 isRented를 true로 설정
        setModalContent(true); // Modal content를 예약으로 설정
        closeModal();
        console.log(response.data)
        setReservationId(response.data.insertId);

        // reserveVehicle가 실행될 때마다 subscribe3와 subscribe4를 호출
        subscribe3();
        subscribe4();

      } else {
        console.error("Failed to reserve the vehicle");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  function subscribe3() {
    const GPS_topic_listner = new ROSLIB.Topic({
      ros: ros,
      name: "/gps",
      messageType: "morai_msgs/GPSMessage"
    });

    GPS_topic_listner.subscribe(function (data) {

      let lastLocation = JSON.parse(localStorage.getItem('lastLocation'));

      // Set the latitude and longitude values as state
      setPosition([data.latitude, data.longitude]);

      // 가져온 위치 데이터를 사용하여 targetLatitude와 targetLongitude에 값을 할당
      const targetLatitude = lastLocation ? lastLocation[1] : null;
      const targetLongitude = lastLocation ? lastLocation[0] : null;
      // 로그 출력
      console.log("Target Latitude:", targetLatitude);
      console.log("Target Longitude:", targetLongitude);

      // Set range
      const range = 0.0001;

      if (!hasArrived && 
        (data.latitude >= targetLatitude - range && data.latitude <= targetLatitude + range) &&
        (data.longitude >= targetLongitude - range && data.longitude <= targetLongitude + range)) {
    
        setHasArrived(true);  // set hasArrived to true
    
        // localStorage에서 'lastLocation' 값을 삭제
        localStorage.removeItem('lastLocation');
    
        // Set the arrived message
        setArrivedMessage("목적지에 도착했습니다.");
    }
    
    
    });
}


  async function subscribe4() {
    const GPS_topic_listner = new ROSLIB.Topic({
      ros: ros,
      name: "/global_path",
      messageType: "nav_msgs/Path"
    });

    GPS_topic_listner.subscribe(function (data) {
      // 배열 초기화
      let locations = [];

      // for문 돌려서 경로 재탐색
      for (let i = 0; i < data.poses.length; i++) {
        let east = data.poses[i].pose.position.x + 302459.942;
        let north = data.poses[i].pose.position.y + 4122635.537;

        let result = utmTogps(east, north);

        // 결과를 locations 배열에 추가
        locations.push([
          result.longitude,
          result.latitude
        ]);
      }
      // console.log(locations);  // 전체 위치 데이터를 출력
      let exam = { ...lineStringData }
      exam.geometry.coordinates = locations
      // console.log(exam.geometry.coordinates)
      setlineStringData(exam)



      setpathData(locations)
      localStorage.setItem('locations', JSON.stringify(locations));
        // for문이 종료된 후 마지막 위치 데이터만 localStorage에 저장
      if (locations.length > 0) {
        let lastLocation = locations[locations.length - 1];
        localStorage.setItem('lastLocation', JSON.stringify(lastLocation));
      }

      // 메시지를 받은 후 즉시 구독 취소
      GPS_topic_listner.unsubscribe();
    });

    // console.log('제잘');
  }

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    const token = localStorage.getItem('token');

    if (option === '호출지') {
      console.log(token);
      setDestinationCoords({ lat: 37.239071349649535, lng: 126.77305532061546 });
      const response = await axios.get(`${url}/vehicle/call`, { headers: { 'authorization': token } });
      console.log(response);
      setArrivedMessage(null);  // 메시지 초기화
    } else if (option === '마라탕집') {
      setDestinationCoords({ lat: 37.24000507292737, lng: 126.77429711745246 });
      const postdata = { vehicle_id: vehicleId, destination_name: 'school' };
      const response = await axios.post(`${url}/vehicle/move`, postdata, { headers: { 'authorization': token } });
      console.log(response);
      setArrivedMessage(null);  // 메시지 초기화
    } else if (option === '신라호텔') {
      setDestinationCoords({ lat: 37.24514971019341, lng: 126.77504146110552 });
      const postdata = { vehicle_id: vehicleId, destination_name: 'hotel' }
      const response = await axios.post(`${url}/vehicle/move`, postdata, { headers: { 'authorization': token } });
      console.log(response);
      setArrivedMessage(null);  // 메시지 초기화
    }

    // 여기에서 원하는 작업을 수행할 수 있습니다.
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  const lineStringDat = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: pathData
    }
  }
  console.log(lineStringDat)

  async function stop() {
    console.log('정지')
    const postdata = { vehicle_id: vehicleId }
    const token = await localStorage.getItem('token');
    const response = await axios.post(`${url}/vehicle/stop`, postdata, { headers: { 'authorization': token } });
    console.log(response)

  }

  return (
    <div>
      {/* <button onClick={() => subscribe()}>차 실시간 위치 확인하기</button>
      <button onClick={() => subscribe2()}>경로 탐색</button> */}
      <div className={styles.row}>
        <div className={`${styles.col} ${styles.textCenter}`}>
          <div className={styles.col}>
          {arrivedMessage && <p className={styles.purpleText}>{arrivedMessage}</p>}
            <MapContainer center={center} zoom={ZOOM_LEVEL} className={styles.mapContainer}>
              <div className={styles.mapButtons}>
                <button className={`${styles.button} ${mapType === 'normal' ? styles.buttonSelected : ''}`} onClick={() => setMapType('normal')}>일반지도</button>
                <button className={`${styles.button} ${mapType === 'satellite' ? styles.buttonSelected : ''}`} onClick={() => setMapType('satellite')}>위성지도</button>
                <br />
                <br />
                <div className={styles.dropdown}>
                  {isRented ? (
                    <>
                      <button className={styles.destinationButton} onClick={toggleDropdown}>
                        목적지 선택하기
                      </button>
                      {isDropdownOpen && (
                        <div className={styles.dropdownMenu}>
                          <button onClick={() => handleOptionSelect('호출지')}>호출지</button>
                          <button onClick={() => handleOptionSelect('마라탕집')}>마라탕집</button>
                          <button onClick={() => handleOptionSelect('탕후루집')}>탕후루집</button>
                          <button onClick={() => handleOptionSelect('신라호텔')}>신라호텔</button>
                          <button onClick={() => handleOptionSelect('한잔어때')}>한잔어때</button>
                          <button onClick={() => handleOptionSelect('배꼽집')}>배꼽집</button>
                          <button onClick={() => handleOptionSelect('커피빈')}>커피빈</button>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      className={styles.callVehicleButton}
                      onClick={() => callVehicle(0, 0)}
                    >
                      호출하기
                    </button>
                  )}
                </div>
              </div>

              <TileLayer url={mapType === 'normal' ? osm.maptiler.url : osm2.maptiler.url} attribution={mapType === 'normal' ? osm.maptiler.attribution : osm2.maptiler.attribution} />
              <MapEvents />
              <Marker position={position} icon={CircleIcon} label='Start 지점[제주공항]' />

              <RenderMarkers />
              <GeoJSON key={JSON.stringify(lineStringData.geometry.coordinates)} data={lineStringData} />
              {isRented && (
                <div className={styles.returnButtonContainer}>
                  <button onClick={returnVehiclePrompt} className={styles.returnButton}>반납하기</button>
                  <button onClick={stop} className={styles.stopButton}>정지하기</button>

                </div>
              )}


            </MapContainer>



          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {modalContent ? (
              <>
                <h3>이 차량을 빌리시겠습니까?</h3>
                <p>차량 종류: {carInfo.name}</p>
                <p>주행가능 거리: {carInfo.fuel_left}km</p>
                <p>차량 번호: {carInfo.number}</p>
                <button className={styles.confirmButton} onClick={reserveVehicle}>예</button>
                <button className={styles.cancelButton} onClick={closeModal}>아니오</button>
              </>
            ) : (
              <>
                <h3>차량을 반납하시겠습니까?</h3>
                <button className={styles.confirmButton} onClick={returnVehicle}>예</button>
                <button className={styles.cancelButton} onClick={closeModal}>아니오</button>
              </>
            )}
          </div>
        </div>
      )}



    </div>
  );
}

export default Map;


