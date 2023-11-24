import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Url} from '../server_url';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const url = Url
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try { // 집 가서 Localhost 로 바꾸기
      const response = await axios.post(`${url}/user/login`, userData);
      

      if (response.status === 200) {
        const { token, name, id } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        localStorage.setItem('userId', id);
        navigate('/');
        window.location.reload();
      } else {
        handleModal(response.status);
      }

    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('로그인 중 오류가 발생했습니다');
    }
  };

  const handleModal = (status) => {
    if (status === 202) {
      setModalMessage('등록되지 않은 아이디 입니다');
    } else if (status === 205) {
      setModalMessage('비밀번호가 틀렸습니다');
    } else {
      setModalMessage('로그인 중 오류가 발생했습니다');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <div className={styles.inputField}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputField}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          <a href="/password-reset" style={{ color: '#800080' }}>비밀번호를 잊어버리셨나요?</a>
        </p>
      </form>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>{modalMessage}</p>
            <button className={styles.button} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
};

export default Login;


