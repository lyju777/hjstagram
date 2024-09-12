import Router from "koa-router";
import * as filesCtrl from "./files.ctrl";
import { getPostById } from "../posts/post.ctrl";
import multer from "@koa/multer";
import multerS3 from "multer-s3";
import path from "path";
import s3 from "../../lib/s3";

const files = new Router();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: (ctx, file, callback) => {
      const extension = path.extname(file.originalname);
      const basename = path.basename(file.originalname, extension);
      callback(null, `hjstagram/${basename}_${Date.now()}${extension}`);
    },
  }),
  limits: {
    files: 20, // 최대 파일 개수
    fileSize: 1024 * 1024 * 1024, // 최대 파일 크기
  },
});

files.post(
  "/:id",
  getPostById,
  upload.array("attachment", 20),
  filesCtrl.saveFile
);
files.get("/", filesCtrl.filelist);
files.delete("/:id", filesCtrl.removeFile);

export default files;
