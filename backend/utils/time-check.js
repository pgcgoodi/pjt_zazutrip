// 주기적으로 현재 시간을 가져와서 MySQL 데이터와 비교하는 함수
function compareTimes() {
    const currentTime = new Date();
  
    // MySQL에서 데이터 가져오는 쿼리 작성 (예: 예약된 시간 컬럼인 'reservation_time'과 비교)
    const query = 'SELECT * FROM your_table WHERE reservation_time > ?';
  
    connection.query(query, [currentTime], (error, results) => {
      if (error) {
        console.error('쿼리 실행 오류:', error);
        return;
      }
  
      // 결과 처리
      if (results.length > 0) {
        console.log('예약된 시간이 현재 시간보다 미래에 있는 데이터가 있습니다.');
        // 여기에서 필요한 작업을 수행하세요.
      } else {
        console.log('예약된 시간이 현재 시간보다 미래에 있는 데이터가 없습니다.');
      }
    });
  }
  
  // 일정한 간격(예: 1분)으로 함수를 실행
  const intervalMs = 60000; // 1분 = 60,000 밀리초
  setInterval(compareTimes, intervalMs);
  