import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.css'; 
import axios from 'axios'; 
import {Url} from '../server_url';


function Menu() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null); 
  const [id, setId] = useState(null);
  const url = Url
  const [isModalOpen, setIsModalOpen] = useState(false); // modal창
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedName = localStorage.getItem('name'); // 로컬 스토리지에서 이름을 가져옵니다.
    const storedId = localStorage.getItem('id');
    setToken(storedToken);
    setName(storedName); // 상태 변수에 이름을 저장합니다.
    setId(storedId);

    console.log(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name'); 
    localStorage.removeItem('userId');
    setToken(null);
    setName(null); // 상태 변수도 초기화합니다.
    navigate('/');
    window.location.reload(); // 페이지를 새로고침합니다.
  };
  const confirmDeleteAccount = async () => {
    try {
      const response = await axios.delete(`${url}/user/delete`, {
        headers: {
          'authorization': localStorage.getItem('token')
        }
      });
      if(response.status === 200) {
        alert('회원 탈퇴가 완료되었습니다.');
        handleLogout();
      } else {
        alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const goToLogin = () => {
    navigate('/login');
  
  };

  const goToSignup = () => {
    navigate('/signup');
  
  };

  const goToChangeinfo = () => {
    navigate('/changeinfo');

  };



  const goToSeeReservation = () => {
    navigate('/seereservation');
   
  };



  return (
    <div className={styles.container}>
      <h1>메뉴</h1>
      {name && <p>반갑습니다! {name}님!</p>} {/* 이름이 있는 경우 화면에 표시합니다. */}
      {id && <p>ID: {id}</p>}
      {!token && <button className={styles.button} onClick={goToLogin}>로그인</button>}
      {!token && <button className={styles.button} onClick={goToSignup}>회원가입</button>}
      {token && <button className={styles.button} onClick={handleLogout}>로그아웃</button>}
      {token && <button className={styles.button} onClick={goToChangeinfo}>회원정보변경</button>}
      {token && <button className={styles.button} onClick={goToSeeReservation}>예약내역확인</button>}

      {token && <button className={`${styles.button} ${styles.deleteButton}`} onClick={openModal}>회원 탈퇴</button>}


      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>정말로 회원 탈퇴 하시겠습니까?</p>
            <button className={` ${styles.confirmButton}`} onClick={confirmDeleteAccount}>예</button>
            <button className={` ${styles.closeButton}`} onClick={closeModal}>아니오</button>
          </div>
        </div>
      )}

    </div>
  );
}


export default Menu;
