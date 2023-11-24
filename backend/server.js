
// // const User_data = require('./index.js');
// const express = require("express")
// const cors = require("cors")
// const crypto = require("crypto");

// const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// const PORT = 3001

// app.use(cors())
// app.set('port', PORT)

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host     : 'j9c104.p.ssafy.io',
//   user     : 'root',
//   password : '1',
//   database : 'auto_drive',
//   port : 9876
// });
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

// // 회원 조회
// app.get('/read', (req,res) => {
 
//     connection.query('SELECT * from user', function (error, results, fields) {
//     if (error) throw error;
//     console.log('users: ', results);
//     res.status(200).json(results)
    
//     });
// })
// // 아이디 중복 검사
// app.post('/idcheck', (req, res) =>{
//     const check_id = req.body.userid
//     const sql = 'SELECT * from user WHERE (`userid`=?);'
//     const params = [check_id]
//     connection.query(sql, params, function (error, results, fields) {
//         if (error) throw error;
        
//         if (results.length === 1) {
//             res.status(501).send('중복됨')
//         }
//         else {
//             res.send('사용 가능함')
//         }
//     })
// })
// // 회원 가입
// app.post('/create', (req,res) => {
//     let salt = crypto.randomBytes(8).toString("base64");
    
    
//     const sql = 'INSERT INTO user (`email`, `password`, `name`, `phonenumber`) VALUES (?,?,?,?)'
//     const params = [req.body.email, req.body.password+salt, req.body.name, req.body.phonenumber]
//     // console.log(params)
//     connection.query(sql, params, function (error, results, fields) {
//         if (error) throw error;
        
//         // console.log('새로 추가', results)
//         res.send(results)
//     })
// })

// // 회원 정보 수정
// app.put('/update', (req, res) => {
//     console.log(req.body.userid)
//     console.log(req.body.username)
//     const id = req.body.id
//     const sql = 'UPDATE user SET `userid`=?, `name`=?, `email`=? WHERE (`id` = ?);'
//     const params = [req.body.userid, req.body.name, req.body.email, req.body.id]
//     connection.query(sql, params, function (error, results, fields) {
//         if (error) throw error;
        
//         // console.log('새로 추가', results)
//         res.send(results)
//     })
// })
// // 회원 탈퇴
// app.delete('/delete/:id', (req, res) => {
//     const id = req.params.id
//     console.log(id)
//     const sql = 'DELETE FROM user WHERE (`id` = ?);'
//     const params = [id]
//     connection.query(sql, params, function (error, results, fields) {
//         if (error) throw error;
        
//         // console.log('새로 추가', results)
//         res.send(results)
//     })
// })
// app.listen(app.get('port'), () => {
//     console.log(app.get('port'), '번 포트에서 대기중')
// })