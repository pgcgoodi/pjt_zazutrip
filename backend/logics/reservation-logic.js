const connection = require("../utils/database.js")
// 레디스 값 변경 로직 가져오기
const { setValue } = require("../utils/redis-logic.js")
// 예약하기 함수
exports.make = async (req, res) => {
    // 토큰으로 부터 유저 정보와 id 추출
    const user_email = res.locals.email
    const user_id = await new Promise((resolve, reject) => {
        connection.query('SELECT id FROM user WHERE (`email` = ?);', user_email, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
    // 요청 속 예약 시간과 반납 시간을 가져오기
    const reservation_time = new Date(req.body.reservation_time)
    const return_time = new Date(req.body.return_time)

    // reservation 테이블에 차례대로 값을 넣어주기
    const sql = 'INSERT INTO reservation (`user_id`, `vehicle_id`, `reservation_time`, `return_time`,`region`, `lat`, `lng`, `price`,`location`) VALUES (?,?,?,?,?,?,?,?,?)'
    const params = [user_id[0].id, req.body.vehicle_id, reservation_time, return_time, req.body.region, req.body.lat, req.body.lng, req.body.price, req.body.location]

    // sql 성공했다면 응답 보내주고 실패 했다면 에러 추출
    connection.query(sql, params, function (error, results, fields) {
        if (error) throw error;
        
        console.log('새로 추가', results)
        res.status(200).json(results)
    })
}

// 예약 내역 삭제
exports.delete = async (req, res) => {
    // 예약 id 가져오기
    const reservation_id = req.params.id
    // reservation 테이블에서 삭제하는 sql 작성
    const sql = 'DELETE FROM reservation WHERE (`id` = ?);'
    const params = [reservation_id]

    connection.query(sql, params, function (error, results, fields) {
        if (error) throw error;

        res.status(200).json(results)
    })
}

// 임시로 만든 바로 예약하기 기능
exports.now = async (req, res) => {
    // 토큰으로 유저 정보 추출
    const user_email = res.locals.email
    const user_id = await new Promise((resolve, reject) => {
        connection.query('SELECT id FROM user WHERE (`email` = ?);', user_email, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
    const vehicle_id = req.body.vehicle_id
    // 예약 시간은 현재 시간으로 지정
    const reservation_time = new Date()
    // 반납 시간은 하루 뒤 시간으로 지정
    const return_time = new Date();
    return_time.setDate(reservation_time.getDate() + 1);
    console.log(reservation_time)
    console.log(return_time)
    // reservation 테이블 추가 구문
    const sql = 'INSERT INTO reservation (`user_id`, `vehicle_id`, `reservation_time`,`return_time`, `lat`, `lng`,`location`) VALUES (?,?,?,?,?,?,?)'
    const params = [user_id[0].id, vehicle_id, reservation_time, return_time, req.body.lat, req.body.lng, req.body.location]
    console.log('바로 호출 예약 성공')
    connection.query(sql, params, function (error, results, fields) {
        if (error) throw error;

        res.status(200).json(results)
    })


}
// 예약한 차량 반납하기 기능
exports.return = async (req, res) => {
    // 토큰에서 유저정보 추출
    const user_email = res.locals.email
    const user_id = await new Promise((resolve, reject) => {
        connection.query('SELECT id FROM user WHERE (`email` = ?);', user_email, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
    
    // const sql = 'SELECT reservation_time FROM reservation WHERE (`id` = ?);'
    // const reservation_time = await new Promise((resolve, reject) => {
    //     connection.query(sql, req.body.reservation_id, function(error, results, fields) {
    //         if (error) reject(error)
    //         resolve(results)
    //     })
    // })
    // 반납 시간을 다시 현재 시간으로 바꾸고 데이터베이스 값 바꿔주기, 이용 완료 필드 1로 바꿔주기
    setValue(0,3)

    const return_time = new Date()
    const sql2 = 'UPDATE reservation SET `return_time`=?, `completed` = ? WHERE (`id` = ?);'
    connection.query(sql2, [return_time, 1, req.body.reservation_id], function(error, results, fields) {
        if (error) reject(error)
        console.log('반납성공')
        res.status(200).json('반납 성공')
    })

}