import jwt, { decode } from "jsonwebtoken";
import User from "../models/user";

// 개발/프로덕션 환경에 따른 쿠키 설정
const getCookieOptions = () => {
  // NODE_ENV가 설정되지 않은 경우 PORT로 프로덕션 환경 판단
  const isProduction =
    process.env.NODE_ENV === "production" || process.env.PORT === "8080";

  return {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
    httpOnly: true,
    secure: true, // 항상 secure 쿠키 사용 (main.js의 미들웨어에서 처리됨)
    sameSite: isProduction ? "None" : "Lax", // 프로덕션에서만 cross-site 허용
    domain: isProduction ? ".hjstagram.site" : undefined, // 프로덕션에서 도메인 설정
  };
};

// ctx 객체와 , next 콜백 (다음 미들웨어로 넘어감)
const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get("hjsta_token");
  if (!token) return next(); // hjsta_token 란 token 없으면 다음 미들웨어로 넘어가
  try {
    const decoded = jwt.verify(token, "!@#$%^&*()"); // token 과 내가 만든 암호를 넣어서 그 토큰이 유효한지 알아냄
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
      name: decoded.name,
      email: decoded.email,
      introment: decoded.introment,
      followingPeople: decoded.followingPeople,
      followerPeople: decoded.followerPeople,
      followerNum: decoded.followerNum,
      followingNum: decoded.followingNum,
      postsNum: decoded.postsNum,
      profileurl: decoded.profileurl,
    };
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      // 남은 시간이 3.5일보다 적다면
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set("hjsta_token", token, getCookieOptions());
    }

    return next();
  } catch (e) {
    //토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;
