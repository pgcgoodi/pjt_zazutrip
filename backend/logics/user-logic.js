
const connection = require("../utils/database.js")
const jwt = require("jsonwebtoken");


const crypto = require("crypto");
const { resolve } = require("path");


// 회원 가입
exports.signup = async (req, res) => {
    // 일정한 길이의 랜덤한 문자열 salt 생성
    let salt = crypto.randomBytes(8).toString("base64");
    // user테이블에 새로운 열 삽입
    const sql = 'INSERT INTO user (`email`, `password`, `name`, `phonenumber`) VALUES (?,?,?,?)'
    // 비밀번호에 salt를 더해서 저장하기
    const params = [req.body.email, req.body.password+salt, req.body.name, req.body.phonenumber]
    // 위에 만든 sql문과 params를 결합하기
    connection.query(sql, params, function (error, results, fields) {
        if (error) throw error;
        
        
        res.status(200).json(results)
    })
}

// 아이디 중복 검사
exports.idcheck = async (req, res) => {
    // 요청에 담겨진 이메일 추출
    const check_email = req.body.email
    // 유저 데이터베이스에서 해당 이메일로 저장된 열이 있는지 검사
    const sql = 'SELECT * from user WHERE (`email`=?);'
    const params = [check_email]
    // sql문과 params 결합
    connection.query(sql, params, function (error, results, fields) {
        if (error) throw error;
        
        // 해당 열에 해당하는 데이터가 있다면 중복된 것이기 때문에
        if (results.length === 1) {
            // 중복 메세지 전달
            res.status(205).json('중복됨')
        }
        // 없다면 사용 가능 메세지 전달
        else {
            res.status(200).json('사용 가능함')
        }
    })
}
// 회원 정보 수정
exports.update = async (req, res) => {
    // 토큰을 통해 이메일을 추출하여 유저 확인
    const user_email = res.locals.email
    // 추출한 이메일을 통해 유저 인덱스 가져오기
    const user_id = await new Promise((resolve, reject) => {
        connection.query('SELECT id FROM user WHERE (`email` = ?);', user_email, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
    // 가져온 인덱스에 해당하는 열의 정보를 수정하는 sql문
    const sql = 'UPDATE user SET  `name`=?, `phonenumber`=? WHERE (`id` = ?);'
    // 요청에서 바꾸고 싶은 내용 추출하여 대입
    const params = [ req.body.name, req.body.phonenumber, user_id[0].id]
    connection.query(sql, params, function (error, results, fields) {
        if (error) throw error;
        
        
        res.status(200).json(results)
    })
}
// 회원 탈퇴
exports.delete = async (req, res) => {
    // 토큰에서 유저 이메일 추출
    const user_email = res.locals.email
    
    // 데이터베이스에서 추출한 이메일에 해당하는 열 삭제
    const sql = 'DELETE FROM user WHERE (`email` = ?);'
    const params = [user_email]
    connection.query(sql, params, function (error, results, fields) {
        if (error) throw error;
        
        
        res.status(200).json(results)
    })
}
// 현재 유저의 예약정보 받아오기
exports.get_reservation = async (req, res) => {
    // 토큰에서 유저 이메일 추출
    const user_email = res.locals.email
    // 추출한 이메일을 기반으로 유저 id 찾기
    const user_id = await new Promise((resolve, reject) => {
        connection.query('SELECT id FROM user WHERE (`email` = ?);', user_email, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    });
    
    // 찾은 유저 id를 통해 그 유저의 예약한 리스트들 조회
    const sql = 'SELECT * FROM reservation WHERE (`user_id` = ?);'
    const params = [user_id[0].id]
    console.log(user_id[0].id)
    const reservation_list = await new Promise((resolve, reject) => {
        connection.query(sql, params, function(error, results, fields) {
            if (error) reject(error)
            console.log(user_id)
            console.log(results)
            resolve(results)
        })
    })
    console.log(reservation_list)

    for (const reser of reservation_list) {
        console.log(reser.vehicle_id)
        const sql2 = 'SELECT car_info_id, car_number from vehicle WHERE (`id`=?);'
        const car_info = await new Promise((resolve, reject) => {
            connection.query(sql2, reser.vehicle_id, function (error, results, fields) {
                if (error) reject(error);
                
                resolve(results);
            });
        })
        console.log(car_info)
        reser.car_info = car_info
        console.log(reser)
    }


    res.status(200).json(reservation_list)
    
}

// 로그인
exports.login = async (req, res) => {
    try {
      const params = [req.body.email]
      // 입력한 이메일이 데이터베이스에 있는지 확인
      let sql = "select * from `user` where email=?;"
  
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, params, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
            });
        });
    // 만약 데이터베이스에 없다면
      if (result.length === 0) {
        // 존재하지 않는 아이디 전송
        return res
          .status(202)
          .json({ code: 202, message: "존재하지 않는 아이디" });
      }

      // 입력한 아이디가 있다면 그 아이디에 해당하는 비밀번호를
      // salt를 빼고 추출
      const str = result[0].password
      const pw = str.substring(0, str.length - 12);
      console.log(pw)
      console.log(req.body.password)
      // 입력한 비밀번호와 저장된 비밀번호가 같다면
      // 로그인이 된 것이니 생략
      if (pw === req.body.password) {
        console.log('로그인 성공')
      }
      // 다르다면 틀린 비밀번호 메세지 전송
      else {
        
        return res.status(205).json({code : 205, message : '비밀번호 틀림.'})
      }
      
      // 위에서 return 되지 않았다면 로그인 성공
      // 토큰 생성
      // 만료시간은 3시간
      const token = jwt.sign(
        { email: req.body.email },
        "secret_key",
        { expiresIn: "3h" }
      );
  
      
      // 로그인이 성공했으니 저장된 데이터들 전송
      return res
        .status(200)
        .json({
          code: 200,
          message: "로그인 성공",
          token: token,
          id : result[0].id,
          email: result[0].email,
          name : result[0].name,
          phonenumber : result[0].phonenumber
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ code: 500, message: "서버 오류" });
    }
  };
  