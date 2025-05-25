import Koa from "koa";
import mongoose from "mongoose";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import api from "./api";
import jwtMiddleware from "./lib/jwtMiddleware";
import serve from "koa-static";
import path from "path";
import dotenv from "dotenv";

const cors = require("@koa/cors");

const PORT = process.env.SERVER_PORT;
const app = new Koa();
const router = new Router();

// AWS Load Balancer의 프록시 헤더를 신뢰하도록 설정
app.proxy = true;

console.log("환경 변수:", {
  NODE_ENV: process.env.NODE_ENV,
  PORT: PORT,
  DB_URL: process.env.DB_URL ? "설정됨" : "설정안됨",
});

app.use(cors({ origin: process.env.URL, credentials: true }));

// secure 쿠키 문제를 해결하는 미들웨어 추가
app.use((ctx, next) => {
  // AWS Load Balancer 환경에서 모든 요청에 대해 쿠키를 secure로 설정할 수 있도록 함
  ctx.cookies.secure = true;
  return next();
});

dotenv.config();

// 루트 경로 핸들러 추가
router.get("/", (ctx) => {
  ctx.type = "html";
  ctx.body = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hjstagram API</title>
    </head>
    <body>
        <h1>Hello World</h1>
        <p>Hjstagram API 서버가 정상적으로 실행 중입니다.</p>
    </body>
    </html>
  `;
});

// favicon.ico 핸들러 추가
router.get("/favicon.ico", (ctx) => {
  ctx.status = 204; // No Content
});

router.use("/api", api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

app.use(serve(path.join(__dirname, "../../frontend/public/files")));
app.use(serve(path.join(__dirname, "../../frontend/public/profile")));

//MongoDB 연결
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error(e);
  });

app
  .listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다...`);
  })
  .on("error", (err) => {
    console.error("서버 시작 오류:", err);
    process.exit(1);
  });
