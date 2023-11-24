
// const User_data = require('./index.js');
const express = require("express")
const cors = require("cors")
const { checkRedisValue } = require("./utils/redis-logic.js")


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 3000 포트 사용
const PORT = 3001
// cors 
app.use(cors())
app.set('port', PORT)

// user로 시작하는 url로 api가 들어왔을 때 userRoutes로 이동
const userRoutes = require("./routes/user-router")
app.use('/user', userRoutes)
// vehicle로 시작하는 url일 때 vehicleRouter로 이동
const vehicleRoutes = require("./routes/vehicle-router")
app.use('/vehicle', vehicleRoutes)
// reservation으로 시작한다면 reservationRouter로 이동
const reservationRoutes = require("./routes/reservation-router")
app.use('/reservation', reservationRoutes)
// travel로 시작한다면 travelRouter로 이동
const traverlRoutes = require("./routes/travel-router")
app.use('/travel', traverlRoutes)

function periodicRedisCheck() {
    // 5초마다 checkRedisValue 함수를 실행
    setInterval(() => {
      checkRedisValue() // checkRedisValue 함수는 redis.js 모듈에 정의되어 있어야 합니다.
    }, 1000); // 5초마다 실행 (5초 = 5000 밀리초)
  }

// 3000번 포트에 관해서 요청 듣고 있기
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중')
    periodicRedisCheck()
})