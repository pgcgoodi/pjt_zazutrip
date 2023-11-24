# Node.js 빌드 단계
FROM node:18.16.1 as builder

# Dockerfile made by 한석현

WORKDIR /app

COPY . .

# Nginx 단계
FROM nginx:latest

# 기본 Nginx 설정 파일은 이미 존재합니다.

# 빌드된 Node.js 어플리케이션을 Nginx의 웹 루트 디렉터리로 복사합니다.
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
