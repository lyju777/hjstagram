import Router from "koa-router";
import * as authCtrl from "./auth.ctrl";
import * as emailCtrl from "./email.ctrl";
import checkLoggedIn from "../../lib/chekLoggedIn";

const auth = new Router();

// /api/auth/register  회원가입
auth.post("/register", authCtrl.register);

// /api/auth/login   로그인
auth.post("/login", authCtrl.login);

// /api/auth/check   로그인체크
auth.get("/check", authCtrl.check);

// /api/auth/edit/:id     회원수정
auth.patch("/edit/:id", checkLoggedIn, authCtrl.edit);

// /api/auth/delete/:id     회원탈퇴
auth.delete("/delete/:id", checkLoggedIn, authCtrl.remove);

// /api/auth/logout   로그아웃
auth.post("/logout", authCtrl.logout);

// /api/auth/sendemail  비밀번호 재설정 이메일 발송
auth.post("/sendemail", emailCtrl.sendPasswordResetEmail);

// /api/auth/receive_new_password/:userId/:token 비밀번호 재설정 (이메일)
auth.post("/receive_new_password/:userId/:token", emailCtrl.receiveNewPassword);

// /api/auth/changepw  비밀번호 변경 (로그인한 상태)
auth.patch("/changePassword/:id", checkLoggedIn, authCtrl.changePassword);

// /api/auth/idCheck  중복아이디 확인
auth.post("/idCheck", authCtrl.idCheck);

// /api/auth/idAndPassWordCheck  아이디, 비번 체크 (유효성 검사)
auth.post("/idAndPassWordCheck", authCtrl.idAndPassWordCheck);

// /api/auth/expwCheck/:id  이전 비밀번호 체크 (유효성 검사)
auth.post("/expwCheck/:id", authCtrl.expwCheck);

// /api/auth/emailCheck  이메일 중복확인 (유효성 검사)
auth.post("/emailCheck", authCtrl.emailCheck);

// /api/auth/following/:ingid/:werid 팔로잉
auth.patch("/following/:ingid/:werid", authCtrl.following);

// /api/auth/unfollowing/:ingid/:werid 언팔로잉
auth.patch("/unfollowing/:ingid/:werid", authCtrl.unfollowing);

// /api/auth/addPost 게시물 개수 +1
auth.patch("/addPost", authCtrl.addPost);

// /api/auth/removePost 게시물 개수 -1
auth.patch("/removePost", authCtrl.removePost);

// /api/auth/profileChange 프로필 사진 변경
auth.patch("/profileChange", authCtrl.profileurl);

// /api/auth/getF4Fprofile
auth.patch("/getF4Fprofile", authCtrl.getF4Fprofile);

// /api/auth/:id user정보
auth.get("/:id", authCtrl.getUser);

export default auth;
