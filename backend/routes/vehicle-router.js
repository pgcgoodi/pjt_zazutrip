const express = require('express');
const router = express.Router();
const vehicleLogic = require('../logics/vehicle-logic');
const { verifyToken } = require('../utils/tokenverify');

// 예약 가능 차량 확인
router.post('/find', verifyToken, vehicleLogic.find)

// 해당 차량의 다음 목적지 설정
router.post('/move', verifyToken, vehicleLogic.move)

// 해당 차량의 다음 목적지 취소
router.post('/stop', verifyToken, vehicleLogic.stop)

// 지금 즉시 예약 가능한 차량이 있다면 정보 불러오기
router.post('/rightnow', verifyToken, vehicleLogic.rightnow)

// 차량 호출하기
router.get('/call', verifyToken, vehicleLogic.call)
module.exports = router;