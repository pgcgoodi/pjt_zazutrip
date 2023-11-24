const express = require('express');
const router = express.Router();
const travelLogic = require('../logics/travel-logic');
const { verifyToken } = require('../utils/tokenverify');
// 해당 지역의 여행지들 불러오기
router.get('/recommend/:location',verifyToken, travelLogic.get_travel)




module.exports = router;