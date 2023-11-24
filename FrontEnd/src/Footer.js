import React, { useEffect } from 'react';
import styles from './Footer.module.css';

function requestNotificationPermission() {
  return Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.error('Notification permission not granted');
    }
  });
}

function sendNotification() {
  if (Notification.permission === 'granted') {
    new Notification('알림', { body: '예약시간이 10분 남았습니다' });
  } else if (Notification.permission !== 'denied') {
    requestNotificationPermission().then(sendNotification);
  } else {
    console.error('Notification permission not granted');
  }
}

function Footer() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <footer className={styles.footer}>
      <p> 
        <span>이용내역</span> | 
        <span onClick={sendNotification} style={{ cursor: 'pointer' }}>알림</span> | 
        <span>FAQ</span>
      </p>
      {/* 여기에 다른 내용이나 링크를 추가할 수 있습니다 */}
    </footer>
  );
}


export default Footer;
