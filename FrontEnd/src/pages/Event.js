


import styles from './Event.module.css';  
import { useState } from 'react';


function Event() {
    const [currentEvent, setCurrentEvent] = useState('ongoing'); // 기본값은 '진행중인 이벤트'

    const renderEventList = () => {
        if (currentEvent === 'ongoing') {

            return <p>현재 진행중인 이벤트가 없습니다.</p>;
        } else {
            return (
                <>

                    <div style={{ marginBottom: '20px' }}>
                        <h2 className={styles.eventTitle}>여행지 사진 공모전</h2>
                        <p className={styles.eventPeriod}>응모 기간: 2023년 7월 1일 ~ 2023년 7월 31일 (종료)</p>
                        <p className={styles.eventDescription}>당첨자에게는 전문 여행 사진작가와 함께하는 워크숍에 참가할 기회가 제공됩니다!</p>
                    </div>
                    <hr className={styles.eventSeparator} />
                    <div style={{ marginBottom: '20px' }}>
                        <h2 className={styles.eventTitle}>가족과 함께하는 여름 휴가 이벤트</h2>
                        <p className={styles.eventPeriod}>응모 기간: 2023년 6월 1일 ~ 2023년 6월 30일 (종료)</p>
                        <p className={styles.eventDescription}>당첨자에게는 전국 5성급 호텔에서의 무료 숙박 기회가 제공됩니다!</p>
                    </div>
                    <hr className={styles.eventSeparator} />
                    <div style={{ marginBottom: '20px' }}>
                        <h2 className={styles.eventTitle}>꿈의 여행지 공유 이벤트</h2>
                        <p className={styles.eventPeriod}>응모 기간: 2023년 5월 1일 ~ 2023년 5월 31일 (종료)</p>
                        <p className={styles.eventDescription}>당첨자에게는 꿈에 그리던 여행지로의 무료 여행 패키지가 제공됩니다!</p>
                    </div>
                </>
            );
        }
    };

    return (
        <div className={styles.eventContainer}>
            <div className={styles.buttonContainer}>
                <button 
                    className={currentEvent === 'ongoing' ? styles.activeButton : ''} 
                    onClick={() => setCurrentEvent('ongoing')}>
                    진행중인 이벤트
                </button>
                <button 
                    className={currentEvent === 'ended' ? styles.activeButton : ''} 
                    onClick={() => setCurrentEvent('ended')}>
                    종료된 이벤트x
                </button>
            </div>
            {renderEventList()}
        </div>
    );
    
}

  export default Event;
