import React, { useState, useEffect } from 'react';
import styles from './Reservation.module.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import {Url} from '../server_url';


const Reservation = () => {
  const url = Url
  const [region, setRegion] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingMinutes, setBookingMinutes] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [returnMinutes, setReturnMinutes] = useState('');
  const [availableCars, setAvailableCars] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  const regions = ['서울', '부산', '제주','강릉','대전','광주','구미'];
  const times = Array.from({length: 24}, (_, i) => i < 10 ? `0${i}` : `${i}`);
  const minutesOptions = ['00', '30'];

  // 현재 날짜 및 시간 얻기
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  const currentHour = currentDate.getHours();

  const checkValidTime = () => {
    if (!bookingDate || !returnDate || !bookingTime || !returnTime) return;  // 초기 상태 및 필요한 값이 없는 경우 검사를 건너뜁니다.

    if (bookingDate === formattedDate && bookingTime <= currentHour) {
      setBookingTime('');
      alert('예약 시간이 현재 시간 이전입니다. 다른 시간을 선택해주세요.');
    }

    if (bookingDate === returnDate && returnTime <= bookingTime) {
      setReturnTime('');
      alert('반납 시간이 예약 시간과 동일하거나 이전입니다. 다른 시간을 선택해주세요.');
    }
};


  useEffect(() => {
    checkValidTime();
  }, [bookingTime, returnTime]);


    

    // 예약 날짜 및 시간 변경 핸들러
    const handleBookingDateChange = (e) => {
      setBookingDate(e.target.value);
      const fullBookingDateTime = `${e.target.value} ${bookingTime}:${bookingMinutes}`; // 'T'를 공백으로 바꿈
      localStorage.setItem('bookingDateTime', fullBookingDateTime);
    };
  
    const handleBookingTimeChange = (e) => {
      setBookingTime(e.target.value);
      const fullBookingDateTime = `${bookingDate}T${e.target.value}:${bookingMinutes}`;
      localStorage.setItem('bookingDateTime', fullBookingDateTime);
    };
  
    const handleBookingMinutesChange = (e) => {
      setBookingMinutes(e.target.value);
      const fullBookingDateTime = `${bookingDate}T${bookingTime}:${e.target.value}`;
      localStorage.setItem('bookingDateTime', fullBookingDateTime);
    };
  
    // 반납 날짜 및 시간 변경 핸들러
    const handleReturnDateChange = (e) => {
      setReturnDate(e.target.value);
      const fullReturnDateTime = `${e.target.value} ${returnTime}:${returnMinutes}`; // 'T'를 공백으로 바꿈
      localStorage.setItem('returnDateTime', fullReturnDateTime);
    };
  
    const handleReturnTimeChange = (e) => {
      setReturnTime(e.target.value);
      const fullReturnDateTime = `${returnDate}T${e.target.value}:${returnMinutes}`;
      localStorage.setItem('returnDateTime', fullReturnDateTime);
    };
  
    const handleReturnMinutesChange = (e) => {
      setReturnMinutes(e.target.value);
      const fullReturnDateTime = `${returnDate}T${returnTime}:${e.target.value}`;
      localStorage.setItem('returnDateTime', fullReturnDateTime);
    };
  const handleFindVehicle = async () => {
    if (!region || !bookingDate || !bookingTime || !bookingMinutes || !returnDate || !returnTime || !returnMinutes) {
      alert('지역과 날짜를 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`${url}/vehicle/find`, {
        around_location: region,
        start_time: `${bookingDate}T${bookingTime}:${bookingMinutes}:00Z`,
        end_time: `${returnDate}T${returnTime}:${returnMinutes}:00Z`
      }, {
        headers: {
          'authorization': token 
        }
      });
      console.log(response.data);

      const availableCarIds = response.data
      setAvailableCars(availableCarIds);
      console.log(availableCarIds);
      if (availableCarIds.length === 0) {
        setShowModal(true);
      }

    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  const navigate = useNavigate();

  const checkInputAndNavigate = async () => {
    if (!region || !bookingDate || !bookingTime || !bookingMinutes || !returnDate || !returnTime || !returnMinutes) {
      alert('지역과 날짜를 입력해주세요.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
  
      const response = await axios.post(`${url}/vehicle/find`, {
        around_location: region,
        start_time: `${bookingDate}T${bookingTime}:${bookingMinutes}:00Z`,
        end_time: `${returnDate}T${returnTime}:${returnMinutes}:00Z`
      }, {
        headers: {
          'authorization': token 
        }
      });
      console.log(response.data);
  
      const availableCarIds = response.data
      setAvailableCars(availableCarIds);
  
      // 차량이 없는 경우 모달을 띄우고, 차량이 있는 경우에만 /carlist로 이동합니다.
      if (availableCarIds.length === 0) {
        setShowModal(true);
      } else {
        console.log(availableCarIds)
        navigate('/carlist', { state: { availableCars: response.data } } );
      }
  
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };
  

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);
    localStorage.setItem('selectedRegion', selectedRegion);
  };
  
return (
    <div className={styles.reservationContainer}>

      <div className={styles.field}>
        <label>지역: </label>
          <select value={region} onChange={handleRegionChange}>
            <option value="" disabled>지역을 선택하세요</option>
            {regions.map((r, index) => (
              <option key={index} value={r}>{r}</option>
            ))}
          </select>
      </div>

      <div className={styles.field}>
        <label>예약 날짜 및 시간: </label>
        <div className={styles.dateTime}>
          <input 
            type="date" 
            value={bookingDate} 
            onChange={handleBookingDateChange} 
            min={formattedDate}
            max="2025-12-31" 
            className={styles.dateInput}
          />
          <select value={bookingTime} onChange={handleBookingTimeChange} className={styles.timeInput}>
            <option value="" disabled>시</option>
            {times.map((t, index) => (
              <option key={index} value={t}>{t}</option>
            ))}
          </select>
          <select value={bookingMinutes} onChange={handleBookingMinutesChange} className={styles.timeInput}>
            <option value="" disabled>분</option>
            {minutesOptions.map((m, index) => (
              <option key={index} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label>반납 날짜 및 시간: </label>
        <div className={styles.dateTime}>
          <input 
            type="date" 
            value={returnDate} 
            onChange={handleReturnDateChange} 
            min={bookingDate ? bookingDate : formattedDate} 
            max="2025-12-31" 
            className={styles.dateInput}
          />
          <select value={returnTime} onChange={handleReturnTimeChange} className={styles.timeInput}>
            <option value="" disabled>시</option>
            {times.map((t, index) => (
              <option key={index} value={t}>{t}</option>
            ))}
          </select>
          <select value={returnMinutes} onChange={handleReturnMinutesChange} className={styles.timeInput}>
            <option value="" disabled>분</option>
            {minutesOptions.map((m, index) => (
              <option key={index} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.field}>
        <button onClick={checkInputAndNavigate} className={styles.viewCarsButton}>이용 가능 차량 보기</button>
        {/* <div className={styles.field}>
          <button onClick={handleFindVehicle} className={styles.findVehicleButton}>콘솔로 찍어보기</button>
        </div> */}
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={() => setShowModal(false)}>X</span>
            이용 가능한 차량이 없습니다.
          </div>
        </div>
      )}
    </div>
  );
};


export default Reservation;
