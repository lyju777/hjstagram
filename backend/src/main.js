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

const port = 4000;
const app = new Koa();
const router = new Router();

app.use(cors({ origin: process.env.URL, credentials: true }));

dotenv.config();

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

app.listen(port, () => {
  console.log(`${port}로 서버 실행중 ...`);
});
