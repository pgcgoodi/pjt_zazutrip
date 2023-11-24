import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import styles from './RecommendedSpot.module.css';  // 스타일 파일 import
import BusanImage from '../assets/Busan.png';
import YangyangImage from '../assets/Yangyang.png';
import SeoulImage from '../assets/Seoul.png';
import BusanImage2 from '../assets/Busan2.png';
import YangyangImage2 from '../assets/Yangyang2.png';
import SeoulImage2 from '../assets/Seoul2.png';
import BusanImage3 from '../assets/Busan3.png';
import YangyangImage3 from '../assets/Yangyang3.png';
import SeoulImage3 from '../assets/Seoul3.png';
import BusanImage4 from '../assets/Busan4.png';
import YangyangImage4 from '../assets/Yangyang4.png';
import SeoulImage4 from '../assets/Seoul4.png';



function Slide({ images, text, onClick }) {
  return (
    <div className={styles.slideContainer} onClick={onClick}>
      {text}
      <div className={styles.imagesContainer}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={text} className={styles.slideImage} />
        ))}
      </div>
    </div>
  );
}

function RecommendedSpot() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const slidesData = [
    { images: [BusanImage, BusanImage2, BusanImage3, BusanImage4], text: '부산 가볼만한 곳 Top 20', link: '/busan' },
    { images: [YangyangImage, YangyangImage2, YangyangImage3, YangyangImage4], text: '양양 가볼만한 곳 Top 20', link: '/yangyang' },
    { images: [SeoulImage, SeoulImage2, SeoulImage3, SeoulImage4], text: '서울 가볼만한 곳 Top 20', link: '/seoul' },
  ];
  

  return (
    <div className="RecommendedSpot">
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <Slide key={index} {...slide} onClick={() => navigate(slide.link)} />
        ))}
      </Slider>
    </div>
  );
}

export default RecommendedSpot;
