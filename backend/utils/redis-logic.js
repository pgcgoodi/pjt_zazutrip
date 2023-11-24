

// Redis에 값을 저장
async function setValue (a, select) {
  const Redis = require('ioredis');

  // Redis 서버에 연결
  const redis = new Redis({
    host: 'j9c104.p.ssafy.io',
    port: 6379, // Redis 기본 포트
    password: 'c104' // 비밀번호
  });
  try {
    // select가 1이라면 목적지로 출발하라는 신호이니
    if ( select === 1) {
      // cmd 값을 목적지 id값으로 변경
      await redis.set('cmd', a);
      // redis status 값을 start로 변경
        await redis.set('status', 'start')
        console.log('값이 설정되었습니다.');
    }
    // 0이라면 정지 신호이니
    else if (select === 0) {
      // redis status 를 stop으로 변경
        await redis.set('status', 'stop')
        console.log('값이 설정되었습니다.');
    }
    // 이후 나머지는 호출지로 호출하는 신호이다.
    else if (select === 2 ) {
      // redis status 를 call로 변경
      await redis.set('status', 'call')
      console.log('값이 설정되었습니다.');
    }
    else {
      await redis.set('status', 'return')
    }
  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    redis.quit(); // 연결 종료
  }
}

async function checkRedisValue() {
  const Redis = require('ioredis');

  // Redis 서버에 연결
  const redis = new Redis({
    host: 'j9c104.p.ssafy.io',
    port: 6379, // Redis 기본 포트
    password: 'c104' // 설정된 경우에만 필요
  });
  try {
    // 찾고 싶은 redis 값
    const value = await redis.get('status'); 
    // 그 값이 있다면
    if (value !== null) {
      console.log('Redis 값:', value);
    // 그 값이 없다면
    } else {
      console.log('Redis에 저장된 값이 없습니다.');
    }
  } catch (error) {
    console.error('Redis 조회 오류:', error);
  }
}



module.exports = {setValue, checkRedisValue}