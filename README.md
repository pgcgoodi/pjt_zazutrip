# 🚗자주,여행 - 자율주행 랜탈 플랫폼

![타이틀이미지](<./exec/image/자주,여행(로고).PNG>)

## 프로젝트 진행 기간

2023.8.21(월) ~ 2023.10 .6(금) (47일간 진행)  
SSAFY 9기 2학기 특화프로젝트 - 자주,여행

</br>

## 🎵 자주,여행 - 개요

_- 모두가 즐기는 여행 -_

요즘 여행들 많이 다니시나요? 코로나 이후 여행객이 급증하는 상황이 왔습니다. 하지만 차를 가지고 다니는 여행에서 풍부한 자연 경관 및 휴식을 즐기지 못하는 사람이 있습니다. 바로 운전자인데요 때문에 저희 팀은 자율 주행 4단계 프로그램 구현 및 이를 이용한 어플리케이션을 만들어 택시처럼 하지만 친구, 가족, 애인 과 함께 하는 여행을 만들기 위해 이 프로젝트를 진행 하였습니다.

</br>

## 🎵 주요 기능

---

- ### 차량 예약
  - 원하는 차량을 원하는 시간에 사용하고 싶을때.
  <br/>

- ### 차량 위치
  - gps와 imu센서를 통해 차량의 위치를 정확히 파악
  <br/>

- ### 인지
  - 카메라를 통해 객체(사람, 장애물, 신호등, 차선)를 인지(yolo)
  - 인지한 신호등 및 차선의 색을 검출(opencv)
  <br/>

- ### 판단
  - 도착지 선택 시 dijstra 알고리즘을 통해 경로 생성
  - 경로의 모든 차선이 못 가는 경우 경로를 재탐색
  - 신호등의 상황에 맞게 주행 상태를 결정
  - 사람 및 장애물 인식 시 주행 상태 판단
  - 고속도로에서 차선 변경가능할 시 차선 변경
  <br/>

- ### 제어
  - pid 제어를 통해 종방향 제어
  - pure pursuit를 통해 횡방향 제어
  - 검출된 차선을 curve-fitting하여 차선 중앙을 유지
  - 경로의 곡률에 따라 목표 속도 조정
  - ACC
  <br/>

## ✔ 주요 기술

---

**Backend - Nodejs**

- Redis
- mySQL

**Frontend**

- React
- WebSocket-Driver 0.7.4
- Leaflet 1.9.4

**CI/CD**

- AWS EC2
- Jenkins
- NGINX

**AutoDrive**

- ROS
- yolo
- python 3.8.10
- MORAI

## ✔ 프로젝트 파일 구조

---

### Back

```
backend
  ├── logics
  │   ├── reservation-logic.js
  │   ├── travel-logic.js
  │   ├── user-logic.js
  │   └── vehicle-logic.js
  ├── routes
  │   ├── reservation-router.js
  │   ├── travel-router.js
  │   ├── user-router.js
  │   └── vehicle-router.js
  ├── utils
  │   ├── database.js
  │   ├── redis-logic.js
  │   ├── time-check.js
  │   └── tokenverify.js
  ├── index.js
  ├── package-lock.json
  ├── package.json
  └── server2.js

```

### Front

```
Frontend
  ├── Dockerfile
  ├── dockerignore
  ├── package-lock.json
  ├── package.json
  ├── public
  │   ├── fonts/Jua
  │   ├── favicon.ico
  │   ├── index.html
  │   ├── manifest.json
  │   └── robots.txt
  └── src
      ├── Recommend
      │   ├── Busan
      │   ├── Seoul
      │   ├── Yangyang
      │   └── RecommendedSpot
      ├── assets
      ├── pages
      │   ├── CarList
      │   ├── Changeinfo
      │   ├── CheckReservation
      │   ├── Event
      │   ├── Login
      │   ├── Map
      │   ├── Map_Reservation
      │   ├── Menu
      │   ├── Reservation
      │   ├── SeeReservation
      │   └── Signup
      ├── App
      ├── Footer
      ├── Header
      ├── Path.json
      ├── ROS.js
      ├── index
      └── server_url.js

```

## ✔ 협업 툴

---

- Git
- Notion
- JIRA
- MatterMost
- Discord

## ✔ 팀원 역할 분배

---

- 한석현(팀장,AD) : Infra 구축, CI,CD 구축, Ros-FE연결
- 박근창(AD) : 라이다,카메라 센서퓨징, 신호인지, PID를 이용한 차량제어
- 김세훈(AD) : Yolo를 이용한 물체인지, 개발환경구성
- 이성연(AD) : Dijstra 경로생성, Ros-DB 연결
- 임채상(FE) : 서비스 구성, Ros-FE연결
- 김민국(BE) : DB, 서버 구축

---

## ✔ 프로젝트 산출물

---

- [기능명세서](./exec/FunctionalSpecification.md)
- [ERD](./exec/ERD.md)

## ✔ 프로젝트 결과물

- [포팅메뉴얼](./exec/C104_포팅_메뉴얼.docx)
- [중간발표자료](./exec/PPT/자주여행_중간발표.pptx)
- [최종발표자료](./exec/PPT/자주여행_최종발표.pptx)

## 🚓 서비스 화면

---
