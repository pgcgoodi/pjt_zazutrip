const connection = require("../utils/database.js")

// 해당 지역 이름을 요청에서 주면 그에 해당하는 여행지 정보들을 응답해주는 함수
exports.get_travel = async (req, res) => {
    const location = req.params.location
    const sql = 'SELECT * FROM travel WHERE `around` = ?'
    connection.query(sql, [location], function (error, results, fields) {
        if (error) throw error;
        
        
        res.status(200).json(results)
    })
}
