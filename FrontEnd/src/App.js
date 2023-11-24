import React, { useState, useEffect } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Map from './pages/Map';
import MapReservation from './pages/Map_Reservation';
import Reservation from './pages/Reservation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Changeinfo from './pages/Changeinfo';
import Event from './pages/Event'
import CarList from './pages/CarList';
import CheckReservation from './pages/CheckReservation';
import SeeReservation from './pages/SeeReservation';
import Header from './Header';
import Menu from './pages/Menu';
import Footer from './Footer';
import ROS from './ROS';

import Recommended from './Recommend/RecommendedSpot';  // RecommendedSpot 임포트
import Yangyang from './Recommend/Yangyang';
import Seoul from './Recommend/Seoul';
import Busan from './Recommend/Busan';

function MainPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 추가

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
  }, []);
  if (isLoading) {
    return <div class="loading">Loading&#8230;</div>  // 로딩 중일 때의 화면
  }


  const goToMap = () => {
    navigate('/map');
  };
  const goToReservation = () => {
    if (token) {
      navigate('/reservation');
    } else {
      alert('로그인 후 이용해 주세요.');
      navigate('/login');
    }
  };
  

  const goToEvent = () => {
    navigate('/event');
  };


  return (
    <div>
      <div className="map-buttons">
        <button onClick={goToMap}>바로 이용가능한 차량 보기</button>
        <button onClick={goToReservation}>예약하기</button>
        <button onClick={goToEvent}>이벤트</button>
      </div>
      <Recommended />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/changeinfo" element={<Changeinfo />} />
        <Route path="/map" element={<Map />} />
        <Route path="/mapreservation" element={<MapReservation />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/event" element={<Event />} />
        <Route path="/carlist" element={<CarList />} />
        <Route path="/checkreservation" element={<CheckReservation />} />
        <Route path="/seereservation" element={<SeeReservation />} />
        <Route path="/yangyang" element={<Yangyang />} />
        <Route path="/seoul" element={<Seoul />} />
        <Route path="/busan" element={<Busan />} />
        <Route path="/ros" element={<ROS />} />



      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
