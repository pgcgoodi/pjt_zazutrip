const express = require('express');
const router = express.Router();
const userLogic = require('../logics/user-logic');
const { verifyToken } = require('../utils/tokenverify');
// 회원가입
router.post('/signup', userLogic.signup)
// 아이디 중복 검사
router.post('/idcheck', userLogic.idcheck)
// 회원 정보 수정
router.put('/update', verifyToken, userLogic.update)
// 회원 탈퇴
router.delete('/delete',verifyToken, userLogic.delete)
// 예약 정보 조회
router.get('/reservation',verifyToken, userLogic.get_reservation)
// 로그인
router.post('/login', userLogic.login)



module.exports = router;