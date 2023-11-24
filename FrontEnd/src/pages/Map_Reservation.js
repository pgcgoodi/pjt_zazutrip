import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Map_Reservation.module.css';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON, useMap } from 'react-leaflet';
import osm from "../osm-providers";
import osm2 from "../osm-providers2";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import pathData from '../Path.json';

import placeholderImage from '../assets/placeholder.png'
import HotelImage from '../assets/Hotel.png';
import MBCImage from '../assets/MBC.png';
import coffeeImage from '../assets/coffee.png';
import samsungImage from '../assets/samsung.png';
import restaurantImage from '../assets/restaurant.png';
import stationImage from '../assets/station.png';
import swimImage from '../assets/swimmer.png';
import beerImage from '../assets/beer.png';


const ZOOM_LEVEL = 16;

const createIcon = (iconUrl) => new L.Icon({
  iconUrl,
  iconSize: [45, 45],
  className: 'leaflet-circle-icon' // CSS 클래스 이름 추가
});


const defaultIcon = createIcon(placeholderImage);
const hotelIcon = createIcon(HotelImage);
const MBCIcon = createIcon(MBCImage);
const coffeeIcon = createIcon(coffeeImage);
const samsungIcon = createIcon(samsungImage);
const restaurantIcon = createIcon(restaurantImage);
const stationIcon = createIcon(stationImage);
const swimIcon = createIcon(swimImage);
const beerIcon = createIcon(beerImage);

const markers = [
  // 상암
  { position: [37.58200, 126.8889], icon: beerIcon, label: '인쌩맥주' },
  { position: [37.582486, 126.886834], icon: hotelIcon, label: '스탠포드호텔' },
  { position: [37.581255, 126.890845], icon: MBCIcon, label: 'MBC 방송국' },
  { position: [37.582278, 126.887739], icon: coffeeIcon, label: '커피빈' },
  { position: [37.583062, 126.887092], icon: samsungIcon, label: '삼성SDS IT센터' },
  { position: [37.581406, 126.88789], icon: restaurantIcon, label: '한국식 소고기 전문 음식점 [ 배꼽집]' },
  { position: [37.582814591, 126.888950294], icon: stationIcon, label: '역삼역' },
  { position: [37.245428193272716, 126.7750329522217], icon: hotelIcon, label: '스탠포드호텔' },

  // K-city
  { position: [37.23918867370749, 126.77313034628662], icon: defaultIcon, label: 'Start 지점' },
  { position: [37.24068299201391, 126.77130810123954], icon: restaurantIcon, label: '한국식 소고기 전문 음식점 [ 배꼽집]' },
  { position: [37.23833240877633, 126.77201420033694], icon: coffeeIcon, label: '커피빈' },
  { position: [37.24444434990808, 126.77585464595262], icon: swimIcon, label: '수영장' },
  { position: [37.23576639296262, 126.77286038119048], icon: beerIcon, label: '술집' },


  // 제주도
  { position: [33.506691, 126.494019], icon: defaultIcon, label: '제주공항' },
  { position: [33.512792, 126.510484], icon: hotelIcon, label: '미르 게스트하우스' },
  { position: [33.512738, 126.526128], icon: defaultIcon, label: '제주 동문 시장' },
  { position: [33.500715, 126.505564], icon: coffeeIcon, label: '제주 스타벅스' },
  { position: [33.495223, 126.492732], icon: defaultIcon, label: '맥도날드' },


  // 부산
  { position: [35.114751, 129.043291], icon: stationIcon, label: '부산역' },
  { position: [35.117730, 129.041295], icon: defaultIcon, label: '대건명가돼지국밥' },
  { position: [35.116212, 129.041592], icon: hotelIcon, label: '아스티호텔 4성급' },
  { position: [35.116263, 129.040803], icon: coffeeIcon, label: '부산 스타벅스' },
  { position: [35.120741, 129.039271], icon: defaultIcon, label: '개미집 부산역점' },


];

const callVehicle = async (lat, lng) => {
  try {
    const token = localStorage.getItem('token');
    const reservation_time = localStorage.getItem('reservation_time');
    const return_time = localStorage.getItem('return_time');
    const carType = localStorage.getItem('carType');

    console.log(reservation_time)
    console.log(return_time)
    console.log(carType)


  } catch (error) {
    console.error('Error:', error);
  }
};


function UpdateCenter({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

const RenderMarkers = () => {
  const navigate = useNavigate();

  const handleButtonClick = (lat, lng, label) => {
    localStorage.setItem('selectedLatitude', lat); // 위도 저장
    localStorage.setItem('selectedLongitude', lng); // 경도 저장
    localStorage.setItem('selectedLocation', label); // marker.label 저장
    callVehicle(lat, lng, label); // 기존에 있던 호출 함수
    navigate('/checkreservation'); // navigate 함수를 사용하여 /checkreservation로 이동
  }

  return markers.map((marker, index) => (
    <Marker key={index} position={marker.position} icon={marker.icon}>
      <Popup>
        <b>{marker.label}</b>
        <br/>
        <button className={styles.callButton} onClick={() => handleButtonClick(marker.position[0], marker.position[1],marker.label)}>
          이곳으로 호출하기
        </button>
      </Popup>
    </Marker>
  ));
};



function Map() {
  const [clickedPosition, setClickedPosition] = useState(null);
  const [mapType, setMapType] = useState('normal');

  const [center, setCenter] = useState({ lat: 37.581897810470394, lng: 126.88914155948626 });
  useEffect(() => {
    const selectedRegion = localStorage.getItem('selectedRegion');
    console.log(selectedRegion); // 지역을 콘솔에 로깅
    if (selectedRegion) {
      switch (selectedRegion) {
        case '서울':
          setCenter({ lat: 37.581897810470394, lng: 126.88914155948626 });
          break;
        case '부산':
          setCenter({ lat: 35.117191, lng: 129.038916 });
          break;
        case '제주':
          setCenter({ lat: 33.511751, lng: 126.498355 });
          break;
        // 필요한 경우 여기에 더 많은 경우를 추가하세요
        default:
          break;
      }
    }
  }, []);


  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        setClickedPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
        console.log(`위도: ${e.latlng.lat}, 경도: ${e.latlng.lng}`);
      },
    });
    return null;
  };

  const lineStringData = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: pathData // Path.json 파일에서 가져옴
    }
  };

  return (
    <div>
      <div className={styles.row}>
        <div className={`${styles.col} ${styles.textCenter}`}>
          <div className={styles.col}>
            <MapContainer center={center} zoom={ZOOM_LEVEL} className={styles.mapContainer}>
              <UpdateCenter center={center} />
              <div className={styles.mapButtons}>
                {/* ... */}
              </div>
              <TileLayer 
                url={mapType === 'normal' ? osm.maptiler.url : osm2.maptiler.url} 
                attribution={mapType === 'normal' ? osm.maptiler.attribution : osm2.maptiler.attribution} 
              />
              <MapEvents />
              <RenderMarkers />
              <GeoJSON data={lineStringData} />
            </MapContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Map;