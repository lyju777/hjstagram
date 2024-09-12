import Router from "koa-router";
import * as profilePicCtrl from "./profilePic.ctrl";
import multer from "@koa/multer";
import multerS3 from "multer-s3";
import path from "path";
import s3 from "../../lib/s3";
import { getUserById } from "../../lib/getUserById";

const profilePic = new Router();

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
    files: 1,
    fileSize: 1024 * 1024 * 1024,
  },
});

profilePic.post(
  "/:id",
  getUserById,
  upload.single("profile"),
  profilePicCtrl.saveProfile
);
profilePic.delete("/:id", profilePicCtrl.removeProPic);

export default profilePic;
