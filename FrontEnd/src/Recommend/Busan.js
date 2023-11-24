import React from "react";
import styles from './Busan.module.css';
import { useNavigate } from 'react-router-dom';
import BusanImage from '../assets/Busan.png';
import BusanImage2 from '../assets/Busan2.png';
import BusanImage3 from '../assets/Busan3.png';
import BusanImage4 from '../assets/Busan4.png';
import BusanImage5 from '../assets/Busan5.png';
import BusanImage6 from '../assets/Busan6.png';
import BusanImage7 from '../assets/Busan7.png';
import BusanImage8 from '../assets/Busan8.png';
import BusanImage9 from '../assets/Busan9.png';
import BusanImage10 from '../assets/Busan10.png';

function Busan() {
  const handleGoBack = () => {
    navigate("/");
  };
  const dummyData = [
    { id: 1, title: "해운대", image: BusanImage },
    { id: 2, title: "부산 타워", image: BusanImage3 },
    { id: 3, title: "부산 돼지국밥", image: BusanImage2 },
    { id: 4, title: "카페 디에디트", image: BusanImage4 },
    { id: 5, title: "감천 문화 마을", image: BusanImage5 },
    { id: 6, title: "부산 국제 영화제", image: BusanImage6 },
    { id: 7, title: "부산 아쿠아리움", image: BusanImage7 },
    { id: 8, title: "영종도", image: BusanImage8 },
    { id: 9, title: "동백섬", image: BusanImage9 },
    { id: 10, title: "부산역", image: BusanImage10 }

  ];
  const navigate = useNavigate();

  
  return (
    <div className={styles.pageContainer}>
      <p className={styles.goback} onClick={handleGoBack}>뒤로가기</p>
      <p className={styles.pageTitle}>부산</p>
      <div className={styles.itemList}>
        {dummyData.map(item => (
          <div key={item.id} className={styles.item}>
            <img src={item.image} alt={item.title} className={styles.itemImage} />
            <p className={styles.itemTitle}>{item.title}</p>
          </div>
        ))}
      </div>
      <button className={styles.reservationButton} onClick={() => navigate('/reservation')}>예약 페이지로 이동</button>
    </div>
  );
  
}

export default Busan;
