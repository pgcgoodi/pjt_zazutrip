


// 레디스 값 변경 로직 가져오기
const { setValue } = require("../utils/redis-logic.js")
// 데이터베이스와 연결
const connection = require("../utils/database.js")

// 설정한 지역과 시간에 예약이 가능한 차량 정보 불러오기
exports.find = async (req, res) => {
    // 요청에 있는 예약 시간과 반납 시간을 날짜시간 형태로 변경
    const start_time = new Date(req.body.start_time)
    const end_time = new Date(req.body.end_time)
    console.log(start_time, end_time)
    // 예약과 반납 사이 시간 계산
    const between_time = (end_time - start_time) / 3600000
    console.log(between_time)
    // 가능한 차량들을 담기 위한 배열 생성
    let vehicle_list = []
    console.log(start_time, end_time)
    // 데이터베이스에 저장되어 있는 차 정보 배열 가져오기
    const car_info = await new Promise((resolve, reject) => {
        
        connection.query('SELECT * from car_info;', function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
    console.log(car_info)

    try {
        // 요청 내용의 지역과 db에 등록된 지역이 동일한 차량 리스트들 뽑아오기
        const sql = 'SELECT * from vehicle WHERE (`around_location`=?);'
        const params = [req.body.around_location]
        // results 라는 이름으로 배열 저장
        const results = await new Promise((resolve, reject) => {
            connection.query(sql, params, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        });

        
        
        // 위 results들 안에 있는 객체마다
        for (const vehi_id of results) {
            // 처음에 빌릴 수 있는 것으로 가정
            let reservate_able = true
            // 해당 차량의 예약 정보를 모두 조회
            const sql2 = 'SELECT * from reservation WHERE (`vehicle_id`=?);'
            const par = [vehi_id.id]
            const result = await new Promise((resolve, reject) => {
                connection.query(sql2, par, function (error, results, fields) {
                    if (error) reject(error);
                    
                    resolve(results);
                });
            })
            // 해당 차량의 예약 내역이 있다면
            if (result.length >= 1) {
                // 그 예약 내역들 중 
                for (const res of result) {
                    // 지금 빌리고 싶은 시간과 겹치는 것이 있다면
                    if ((start_time <= res.reservation_time && res.reservation_time <= end_time) ||
                        (start_time <= res.return_time && res.return_time <= end_time) ||
                        (res.reservation_time <= start_time && start_time <= res.return_time) ||
                        (res.reservation_time <= end_time && end_time <= res.return_time)) {
                        // 빌리지 못하는 것으로 변수 변경
                        reservate_able = false
                        // 반복문 중단
                        break
                        
                    }
                
                }
            }
            // 해당 차량이 위의 조건에 걸리지 않아 빌릴 수 있는 것이라면
            if (reservate_able === true) {
                // 해당 차량의 요금 계산 ( 차량 정보 금액 정보와 사이 시간을 통해 계산 )하여 속성 추가
                vehi_id.total_fee = between_time*car_info[vehi_id.car_info_id-1].fee_per_hour
                // 해당 차량을 빌릴 수 있는 차량 배열에 추가
                vehicle_list.push(vehi_id)
            }
        }
        
        console.log(vehicle_list)
        // 빌릴 수 있는 차량 배열 모두 응답
        res.status(200).json(vehicle_list);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

// 임시로 바로 빌릴 수 있는 차량 정보 불러오기
exports.rightnow = async (req, res) => {
    // 예약 시간과 반납 시간은 모두 현재 시간으로 지정
    const today_date = new Date()
    console.log(today_date)
    console.log(today_date.toString())
    // 날짜시간 데이터를 날짜로만 끊기
    const today = today_date.toString().substring(0, 10)
    console.log(today)
    const around_location = req.body.around_location

    // 현재 지역과 등록된 지역이 같은 차량들 조회
    const sql = 'SELECT * FROM vehicle WHERE `around_location`=?;'
    const cars = await new Promise((resolve, reject) => {
        connection.query(sql, around_location,function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        })
    })
    // console.log (cars)
    let selected_car = null
    // 차량들에서 반복문을 돌며
    for (const car of cars) {
        let reservate_able = true
        const sql2 = 'SELECT * from reservation WHERE (`vehicle_id`=?);'
        const par = [car.id]
        const result = await new Promise((resolve, reject) => {
            connection.query(sql2, par, function (error, results, fields) {
                if (error) reject(error);
                
                resolve(results);
            });
        })
        // 해당 차량의 예약정보가 있다면
        if (result.length >= 1) {

            for (const res of result) {
                const start = res.reservation_time
                const end = res.return_time
                // 예약 시간과 현재 빌리고 싶은 날이 겹친다면
                if (start <= today_date && today_date <= end) {
                    // 예약 불가
                    reservate_able = false
                    break
                }
            }
            // 예약 정보가 겹치지 않다면
            if (reservate_able === true) {
                // 해당 차를 호출하는 것으로 하고 반복문 종료
                selected_car = car
                break
            }
            else {
                continue
            }
        }
        // 해당 차량의 예약 정보가 없다면
        else {
            // 해당 차량을 바로 선택하고 반복문 종료
            selected_car = car
            break
        }
       
    }
    const car_info = await new Promise((resolve, reject) => {
        
        connection.query('SELECT * from car_info;', function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
    console.log(selected_car)
    // 선택 차량 정보 넘겨주기
    res.status(200).json(selected_car)
}

// 차량을 목적지로 이동시키는 신호 보내주기
exports.move = async (req, res) => {
    // 현재 어떤 차량인지 알기 위해 차량 id를 요청에서 넘겨 받기
    const vehicle_id = req.body.vehicle_id
    // 목적지 이름도 요청에서 넘겨 받기
    const destination_name = req.body.destination_name
    // db에 해당 목적지 이름에 해당하는 정보들 불러오기
    const destination = await new Promise((resolve, reject) => {
        
        connection.query('SELECT * FROM desti WHERE (`name`=?);', destination_name, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
    console.log(destination)
    console.log(destination_name)
    // 해당 차량의 목적지를 해당 목적지의 노드 번호로 바꾸기
    const sql = 'UPDATE `vehicle` SET `destination` = ? WHERE (`id` = ?);'
    const params = [destination[0].node_number , vehicle_id]
    console.log(params)

    connection.query(sql, params, function (error, results, fields) {
        if (error) reject(error);
        
        console.log('목적지 등록 성공')
    });
    
    console.log(setValue)
    // 해당 목적지의 id로 redis cmd 값 바꾸고 status를 start로 바꾸기
    setValue(destination[0].id, 1)
    // 목적지 정보 넘겨주기
    res.status(200).json(destination)
}

exports.stop = async (req, res) => {
    // 멈추고 싶은 차량 id 넘겨 받기
    const vehicle_id = req.body.vehicle_id

    const sql = 'UPDATE `vehicle` SET `destination` = null WHERE (`id` = ?);'
    const params = [ vehicle_id]
    // 해당 차량의 목적지 삭제
    connection.query(sql, params, function (error, results, fields) {
        if (error) reject(error);
        
        console.log('목적지 삭제 성공')
    });
    // 레디스 status 값 stop으로 바꾸어 정지 신호 보내기
    setValue(0,0)
    res.status(200).json('목적지 삭제 성공')
}


exports.call = async (req, res) => {
    try {

        // 해당 차량 호출지로 호출하는 신호 보내기
        console.log('call 요청 성공')
        setValue(0,2)
        res.status(200).json('호출 시작')
    }
    catch(error) {
        console.log(error)
    }
}

