import React from "react";
import styles from './Yangyang.module.css';
import YangImage from '../assets/Yangyang.png'
import YangImage2 from '../assets/Yangyang2.png'
import YangImage3 from '../assets/Yangyang3.png'
import YangImage4 from '../assets/Yangyang4.png'
import YangImage5 from '../assets/Yangyang5.png'
import YangImage6 from '../assets/Yangyang6.png'
import YangImage7 from '../assets/Yangyang7.png'
import YangImage8 from '../assets/Yangyang8.png'
import YangImage9 from '../assets/Yangyang9.png'
import YangImage10 from '../assets/Yangyang10.png'
import { useNavigate } from 'react-router-dom';

function Yangyang() {
  const handleGoBack = () => {
    navigate("/");
  };
  const dummyData = [
    { id: 1, title: "쏠티 캐빈", image: YangImage },
    { id: 2, title: "서피비치", image: YangImage2 },
    { id: 3, title: "서피비치", image: YangImage3 },
    { id: 4, title: "양양 퍼시픽랜드", image: YangImage4 },
    { id: 5, title: "남애항 스카이워크 전망대", image: YangImage5 },
    { id: 6, title: "양양시장", image: YangImage6 },
    { id: 7, title: "의상대", image: YangImage7 },
    { id: 8, title: "쏠비치 양양", image: YangImage8 },
    { id: 9, title: "대게 맛집", image: YangImage9 },
    { id: 10, title: "버스터미널", image: YangImage10 }
  ];
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <p className={styles.goback} onClick={handleGoBack}>뒤로가기</p>
      <p className={styles.pageTitle}>양양</p>
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

export default Yangyang;
