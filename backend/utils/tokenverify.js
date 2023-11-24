const jwt = require('jsonwebtoken');
const YOUR_SECRET_KEY = 'secret_key';

 
const verifyToken = (req, res, next) => {
  try {
    const clientToken = req.headers.authorization;
    
    const decoded = jwt.verify(clientToken, YOUR_SECRET_KEY);
 
    if (decoded) {
      res.locals.email = decoded.email;
      // console.log(decoded)
      next();
    } 
  } catch (error) {
    // 인증 실패
    // 유효시간이 초과된 경우
    if (error.name === "TokenExpiredError") {
        
        return res.status(401).json({
          code: 401,
          message: "토큰이 만료되었습니다.",
        });
      }
      // 토큰의 비밀키가 일치하지 않는 경우
      if (error.name === "JsonWebTokenError") {
        
        return res.status(401).json({
          code: 401,
          message: "유효하지 않은 토큰입니다.",
        });
      }
      return res.status(500).json({
        code: 500,
        message: "서버에러",
      });
  }
};
 
exports.verifyToken = verifyToken;