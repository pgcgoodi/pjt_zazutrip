import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './CarList.module.css'; 

import k5Image from '../assets/k5.png';
import starexImage from '../assets/starex.png';
import niroImage from '../assets/niro.png';

function CarList() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);  // 모달의 상태를 관리하는 state

  const navigate = useNavigate();
  const location = useLocation();
  const availableCars = location.state.availableCars;

  const allCars = [
    { id: 1, name: "Niro", src: niroImage },
    { id: 2, name: "K5", src: k5Image },
    { id: 3, name: "Starex", src: starexImage },
  ];

const handleCarSelection = (car) => {
    setSelectedCar(car);
    localStorage.setItem('selectedCarId', car.id);
    localStorage.setItem('selectedCarFee', car.total_fee.toString());
};

const handleNavigate = () => {
  console.log("handleNavigate called");
  if (!selectedCar) {
    setShowModal(true);
  } else {
    navigate('/mapreservation');
  }
};



return (
  <div>
    <div className={styles.carList}>
        {availableCars.map((availableCar, index) => (
            <div key={index} className={styles.carItem}>
                
                <img 
                    src={allCars[availableCar.car_info_id - 1].src} 
                    alt={allCars[availableCar.car_info_id - 1].name} 
                    className={styles.carImage} 
                />

                <div>{availableCar.fuel_left}km 주행 가능</div> {/* 이미지 아래로 이동 */}
                <button 
                    onClick={() => handleCarSelection(availableCar)} 
                    className={styles.button}
                >
                    {allCars[availableCar.car_info_id - 1].name} 선택
                </button>
            </div>
        ))}
    </div>
    {selectedCar && <p>예상가격: {selectedCar.total_fee}원 </p>}
    <button onClick={handleNavigate} className={styles.navigateButton}>호출할 지역 선택하기</button>
    {showModal && (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <p>차량을 선택해 주세요.</p>
          <button onClick={() => setShowModal(false)}>확인</button>
        </div>
      </div>
    )}
  </div>
);



}

export default CarList;
