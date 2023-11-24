

// mysql 라이브러리 가져오기
const mysql = require('mysql');

// 로컬 디비 정보
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'driver',
//   password : 'test',
//   database : 'auto_drive',
  
// });

// 팀 서버에 올라가 있는 데이터베이스와 연결
const connection = mysql.createConnection({
  host     : 'j9c104.p.ssafy.io',
  user     : 'root',
  password : '1',
  database : 'auto_drive',
  port : 9876
});


module.exports = connection

