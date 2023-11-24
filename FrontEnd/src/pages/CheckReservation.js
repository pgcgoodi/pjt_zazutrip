import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CheckReservation.module.css';
import {Url} from '../server_url';

function Modal({ show, onClose, children }) {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    {children}
                    <button className={styles.closeButton} onClick={onClose}>X</button>
                </div>
            </div>
        </div>
    );
    
}



function CheckReservation() {
    const url = Url;
    const [bookingDateTime, setBookingDateTime] = useState('');
    const [returnDateTime, setReturnDateTime] = useState('');
    const [selectedCarId, setSelectedCar] = useState('');
    const [selectedLatitude, setSelectedLatitude] = useState('');
    const [selectedLongitude, setSelectedLongitude] = useState('');
    const selectedCarFee = localStorage.getItem('selectedCarFee');
    const storedRegion = localStorage.getItem('selectedRegion');
    const [selectedLocation, setSelectedLocation] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setBookingDateTime(localStorage.getItem('bookingDateTime') || '');
        setReturnDateTime(localStorage.getItem('returnDateTime') || '');
        setSelectedCar(localStorage.getItem('selectedCarId') || '');
        setSelectedLatitude(localStorage.getItem('selectedLatitude') || '');
        setSelectedLongitude(localStorage.getItem('selectedLongitude') || '');
        setSelectedLocation(localStorage.getItem('selectedLocation') || '');
    }, []);
    
    const [isModalOpen, setModalOpen] = useState(false);

    const handleReservationConfirmation = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('로그인 후 이용해주세요');
            return;
        }
        
        try {
            const response = await axios.post(`${url}/reservation/make`, {
                vehicle_id: selectedCarId,
                reservation_time: bookingDateTime,
                return_time: returnDateTime,
                lat: selectedLatitude,
                lng: selectedLongitude,
                price: selectedCarFee,
                region: storedRegion,
                location : selectedLocation,
            }, {
                headers: { 'authorization': token }
            });

            console.log('Reservation Confirmation Response:', response.data);
            if (response.status === 200) {
                setModalOpen(true);
            }
        } catch (error) {
            console.error('Reservation Confirmation Error:', error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        navigate('/seereservation');
    };

    return (
        <div className={styles.checkReservationContainer}>
            <p className={styles.title}>예약 내역 확인 페이지</p>
            <div className={styles.reservationDetail}>
                <p>호출지역: {storedRegion}</p>
                <p>예약 시간: {bookingDateTime.replace('T', ' ')}</p>
                <p>반납 시간: {returnDateTime.replace('T', ' ')}</p>

                <p>예상 가격: {selectedCarFee}원</p>
                <p>호출 위치: {selectedLocation}</p>
            </div>
            <button onClick={handleReservationConfirmation} className={styles.confirmButton}>
                예약 확정
            </button>

            <Modal show={isModalOpen} onClose={closeModal}>
                <p>예약이 완료되었습니다</p>
            </Modal>
        </div>
    );
}

export default CheckReservation;
