import Router from "koa-router";
import * as postCtrl from "./post.ctrl";
import checkLoggedIn from "../../lib/chekLoggedIn";
const posts = new Router();

// /api/posts   피드 올리기
posts.post("/", checkLoggedIn, postCtrl.write);

// /api/posts   전체 피드 리스트
posts.get("/", postCtrl.list);

// /api/posts/editprofileurl user profileurl 변경(해당 글쓴이가 프로필사진을 변경했을 떄 ㄴ)
posts.patch("/editprofileurl", postCtrl.editprofileurl);

// /api/posts/editusername user username 변경(해당 글쓴이가 username 변경했을 때)
posts.patch("/editusername", postCtrl.editusername);

const post = new Router();

// /api/posts/:id
post.get("/", postCtrl.read);

// /api/posts/:id    피드 삭제
post.delete("/", checkLoggedIn, postCtrl.remove);

// /api/posts/:id/addlike   좋아요 +1
post.patch("/addlike", postCtrl.addLike);

// /api/posts/:id/canclelike    좋아요 -1
post.patch("/canclelike", postCtrl.cancleLike);

// /api/posts/:id/likeby  좋아요 눌렸을때 좋아요 누른 사람 배열에 추가
post.patch("/likeby", postCtrl.likeby);

// /api/posts/:id/cancleLikeby  좋아요 취소했을 때 좋아요 누른 사람 배열에서 삭제
post.patch("/cancleLikeby", postCtrl.cancleLikeby);

// /api/posts/:id   파일 첨부할때 url 넘겨줌
post.patch("/", postCtrl.path);

//  api/posts/:id/givecomment   댓글 달기
post.patch("/givecomment", postCtrl.giveComment);

// api/posts/:id/:cid/deleteComment 댓글 삭제
post.patch("/:cid/deleteComment", postCtrl.deleteComment);

posts.use("/:id", postCtrl.getPostById, post.routes());

export default posts;
