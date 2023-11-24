import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './SeeReservation.module.css';
import {Url} from '../server_url';

function SeeReservation() {
    const url = Url
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [selectedId, setSelectedId] = useState(null); // 삭제할 예약 ID를 임시 저장하기 위한 상태
    const [isLoading, setIsLoading] = useState(true);

    const handleCancelReservation = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User is not authenticated');
            return;
        }

        setSelectedId(id);
        setModalMessage("정말 취소하시겠습니까?");
        setShowModal(true);
        

    };

    const handleConfirm = async () => {

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${url}/reservation/delete/${selectedId}`, {
                headers: { 'authorization': token }
            });

            setReservations(reservations => reservations.filter(reservation => reservation.id !== selectedId));

        } catch (err) {
            console.error(err);
            setError('Error cancelling the reservation');
        } finally {

            window.location.reload();
        }
    }

    const handleCancel = () => {
        setSelectedId(null);
        setShowModal(false);
    }

    useEffect(() => {
        const fetchReservations = async () => {
            const token = localStorage.getItem('token'); 
            if(!token) {
                setError('User is not authenticated');
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${url}/user/reservation`, {
                    headers: { 'authorization': token }
                });

                setReservations(response.data);
                console.log(response.data);
            } catch (err) {
                console.error(err);
                setError('Error fetching reservation data');
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            }
        };

        fetchReservations();
    }, []);

    if (isLoading) {
        return <div className={styles.loading}>Loading&#8230;</div>;
    }

    
    return (
        <div className={styles.container}>
            
            {reservations.length > 0 ? (
                reservations.map((reservation, index) => (
                    <div key={index} className={styles.reservationItem}>


                        <p>예약 시간: {new Date(reservation.reservation_time).toLocaleString()}</p>
                        <p>반납 시간: {new Date(reservation.return_time).toLocaleString()}</p>

                        <p>예상 가격:{reservation.price}원</p>
                        <p>차량 번호: {reservation.car_info[0].car_number}</p>
                        {/* <p>차량종류: {reservation.car_info_id}</p> */}
                        <p>호출지역 : {reservation.region}</p> 
                        <p>호출장소 : {reservation.location}</p>   
                        <button onClick={() => handleCancelReservation(reservation.id)} className={styles.cancelButton}>예약 취소하기</button>
                    </div>
                ))
            ) : (
                <p>예약내역이 없습니다</p>
            )}
    
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p className={styles.modalMessage}>{modalMessage}</p>
                        <button className={styles.confirmButton} onClick={handleConfirm}>확인</button>
                        <button className={styles.cancelModalButton} onClick={handleCancel}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SeeReservation;
