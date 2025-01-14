import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  hashedpassword: {
    type: String,
  },
  postsNum: {
    type: Number,
    default: 0,
  },
  introment: {
    type: String,
  },
  followingNum: {
    type: Number,
    default: 0,
  },
  followerNum: {
    type: Number,
    default: 0,
  },
  followingPeople: [String],
  followerPeople: [String],
  profileurl: {
    type: String,
    default:
      "https://d3gxsp5zp8da8n.cloudfront.net/hjstagram/icon/default_profile.png",
  },
});

// 비밀번호 암호화
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedpassword = hash;
};

// 입력한 비밀번호와 암호화되서 저장된 비밀번호 비교
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedpassword);
  return result;
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("email")) {
    // 회원가입할 때 암호화 반복 방어
    return next();
  } else if (this.isModified("hashedpassword")) {
    this.hashedpassword = await bcrypt.hash(this.hashedpassword, 10);
    return next();
  }
});

// 사용자쪽으로 password 제외한 data를 json으로 전달
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedpassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      email: this.email,
      name: this.name,
      username: this.username,
      introment: this.introment,
      followingPeople: this.followingPeople,
      followerPeople: this.followerPeople,
      followerNum: this.followerNum,
      followingNum: this.followingNum,
      postsNum: this.postsNum,
      profileurl: this.profileurl,
    },
    "!@#$%^&*()",
    { expiresIn: "7d" }
  );
  return token;
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

const User = mongoose.model("User", UserSchema);
export default User;
