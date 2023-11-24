const express = require('express');
const router = express.Router();
const reservationLogic = require('../logics/reservation-logic');
const { verifyToken } = require('../utils/tokenverify');

// 예약하기
router.post('/make', verifyToken, reservationLogic.make)
// 예약 취소하기
router.delete('/delete/:id', verifyToken, reservationLogic.delete)
// 바로 호출 차량 예약하기
router.post('/now', verifyToken, reservationLogic.now)
// 차량 반납하기
router.put('/return', verifyToken, reservationLogic.return)




module.exports = router;