import React, { useState } from 'react';
import styles from './Signup.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Url} from '../server_url';

function Signup() {
  const url = Url
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [message, setMessage] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState(false); // 사용 가능한 아이디인지 여부

  const navigate = useNavigate();

  const idCheck = async () => {
    if(!email) {
      setMessage('이메일을 입력해주세요.');
      return;
    }
    
    try {
      const response = await axios.post(`${url}/user/idcheck`, { email });
      if (response.status === 205) {
        setMessage('이미 존재하는 이메일입니다.');
        setIsIdAvailable(false);
      } else {
        setMessage('사용 가능한 이메일입니다.');
        setIsIdAvailable(true);
      }
    } catch (error) {
      console.error('ID Check Error:', error);
      setMessage('이메일 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isIdAvailable) return; // 사용 가능한 아이디가 아니면 서버에 회원가입 요청을 보내지 않음

    const userData = {
      email,
      name,
      password,
      phonenumber,
    };

    try {
      const response = await axios.post(`${url}/user/signup`, userData);
      
      if (response.status === 200) {
        alert('회원가입이 완료되었습니다');
        navigate('/login');
      } else {
        setMessage('회원가입 중 오류가 발생했습니다');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('회원가입 중 오류가 발생했습니다');
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <h2>Signup</h2>
        {message && <p>{message}</p>}
        <div className={styles.inputField}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="button" onClick={idCheck}>아이디 중복검사</button>
        </div>
        <div className={styles.inputField}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <div className={styles.inputField}>
          <label>Phone Number</label>
          <input
            type="tel"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            pattern="\d*"
            title="Please enter numbers only"
            required
          />
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
