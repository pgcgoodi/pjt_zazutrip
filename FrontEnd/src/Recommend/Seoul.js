import React from "react";
import styles from './Seoul.module.css';

import SeoulImage from '../assets/Seoul.png'
import SeoulImage2 from '../assets/Seoul2.png'
import SeoulImage3 from '../assets/Seoul3.png'
import SeoulImage4 from '../assets/Seoul4.png'
import SeoulImage5 from '../assets/Seoul5.png'
import SeoulImage6 from '../assets/Seoul6.png'
import SeoulImage7 from '../assets/Seoul7.png'
import SeoulImage8 from '../assets/Seoul8.png'
import SeoulImage9 from '../assets/Seoul9.png'
import SeoulImage10 from '../assets/Seoul10.png'

import { useNavigate } from 'react-router-dom';

function Seoul() {

  const handleGoBack = () => {
    navigate("/");
  };

  const dummyData = [
    { id: 1, title: "제2롯데타워", image: SeoulImage },
    { id: 2, title: "경복궁", image: SeoulImage2 },
    { id: 3, title: "카카오 스토어", image: SeoulImage3 },
    { id: 4, title: "남산", image: SeoulImage4 },
    { id: 5, title: "한강", image: SeoulImage5 },
    { id: 6, title: "홍대", image: SeoulImage6 },
    { id: 7, title: "롯데월드", image: SeoulImage7 },
    { id: 8, title: "해방촌 경리단길", image: SeoulImage8 },
    { id: 9, title: "만선호프", image: SeoulImage9 },
    { id: 10, title: "공항버스", image: SeoulImage10 }
  ];
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <p className={styles.goback} onClick={handleGoBack}>뒤로가기</p>
      <p className={styles.pageTitle}>서울</p>
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


export default Seoul;