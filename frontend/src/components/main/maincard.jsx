import React, { useState, useEffect } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Modal_main_point from "./modal_main_point";
import Modal_Main_Comments from "./modal_main_comments";
import requestAxios from "../../api/requestAxios";
import { Carousel } from "react-bootstrap";
import { withRouter, useHistory } from "react-router-dom";
import FollowStatusContext from "../../context/FollowStatusContext.js";
import CloseFriends from "./closefriends";
import { Link } from "react-router-dom";

function MainCard() {
  const history = useHistory();

  let [Profile, setProfile] = useState([]);

  let [modal, modal_change] = useState(false);

  // 좋아요 이미지변경 state
  let [heart, heart_change] = useState([false]);

  // 좋아요 숫자
  let [heartNum, setHeartNum] = useState([]);

  //팔로우 이미지변경 state
  let [follow, follow_change] = useState([false]);

  // 찜 모달 말풍선 모달
  let [zzim, zzim_change] = useState(false);

  let [comment, comment_change] = useState(false);

  // 서버에 보내고자 하는 값들을 state에서 가지고 있는 것
  let [commentsList, setCommentsList] = useState([]);

  // 내 댓글만 삭제
  let [IsMyComment, setIsMyComment] = useState([]);

  const [WhoLogin, setWhoLogin] = useState("");

  // 서버에 보내고자 하는 값들을 state에서 가지고 있는것
  const [comments, setcomments] = useState("");

  // ID값 담을  state
  const [ID, setID] = useState("");

  const [NamID, setNamID] = useState("");

  // 팔로우 상태를 관리하는 상태 추가
  const [followStatus, setFollowStatus] = useState({});

  const saveID = (id) => {
    setID(id);
    console.log(ID);
  };

  const onCommentsHandler = (event) => {
    setcomments(event.currentTarget.value);
  };

  const closeModal = () => {
    modal_change(false);
  };

  const closezzim = () => {
    zzim_change(!zzim);
  };

  const closecomment = () => {
    comment_change(!comment);
  };

  // state에 데이터바인딩할 response값 담아서 뿌리기
  const [DataUsername, setDataUsername] = useState([]);
  const [Contents, setContents] = useState([]);
  const [FileImg, setFileImg] = useState([[]]);
  const [CommentOjArr, setCommentOjArr] = useState([]);

  // 빈 배열 따로 만들어서 response.data[i] 담아줘야 배열에 하나씩 담겨짐
  const post = []; // contents
  const user = []; // username
  const file = []; // file
  const LikeBy = []; // 좋아요 리스트
  const HeartNum = []; // 좋아요 숫자
  const likePost = []; // 각 게시물의 좋아요 여부

  const commentOj = [];
  const commentWho = [];

  const writer = []; // 게시글 쓴사람
  const FollowPost = []; //팔로우 여부
  const eachprofile = [];
  const ismycmt = []; // 각 포스트당 댓글 돌면서 내 댓글인지 확인하고 여부 boolean 값으로 담아주기

  // ID값 담을 빈 배열
  let id = [];

  useEffect(() => {
    requestAxios.get("/api/posts").then((response) => {
      const newFollowStatus = { ...followStatus };
      for (let i = 0; i < response.data.length; i += 1) {
        writer[i] = response.data[i].user.username; // 글쓴이들 (팔로잉 당할것들)
        newFollowStatus[writer[i]] = false; // 초기 팔로우 상태는 false

        post[i] = response.data[i];
        user[i] = response.data[i].user.username;
        file[i] = response.data[i].fileurls;

        LikeBy[i] = response.data[i].likeby; // 좋아요 누른사람
        writer[i] = response.data[i].user.username; // 글쓴이들 (팔로잉 당할것들)
        eachprofile[i] = response.data[i].user.profileurl;
        FollowPost[i] = false;
        likePost[i] = false;

        commentOj[i] = response.data[i].comment;

        // commentsList 배열에 각 게시물의 댓글 상태 배열 추가
        commentsList[i] = ""; // 초기 값은 빈 문자열로 설정
        setCommentsList([...commentsList]);

        console.log(commentOj);

        HeartNum[i] = response.data[i].like;
        setHeartNum([...HeartNum]);

        id[i] = response.data[i]._id;

        setCommentOjArr([...commentOj]);
        setProfile([...eachprofile]);
        setContents(post);
        setDataUsername(user);

        setFileImg([...file]); // file을 setFileImg하면 게시물이 하나만 나옴
        console.log(writer);

        // 내가 좋아요 누른 게시물
        requestAxios.get("api/auth/check").then((response) => {
          console.log(response);

          const name = response.data.username;
          console.log(name);
          setWhoLogin(name);

          const following = response.data.followingPeople;
          console.log(following); //이거 왜 undefind임?

          for (let j = 0; j < LikeBy[i].length; j++) {
            if (name === LikeBy[i][j]) {
              // 로그인한 사람이랑 좋아요 누른사람이 같다면

              likePost[i] = true; // true로 변경
            }
          }
          heart_change([...likePost]);

          for (let j = 0; j < following.length; j++) {
            if (following[j] === writer[i]) {
              //팔로우 표시
              newFollowStatus[writer[i]] = true; // 팔로우 상태를 true로 변경
              FollowPost[i] = true;
            }
          }
          follow_change([...FollowPost]);
          console.log(follow);

          for (let j = 0; j < commentOj.length; j++) {
            for (let k = 0; k < commentOj[i].length; k++) {
              if (name === commentOj[i][k].who) {
                ismycmt[k] = true;
              } else {
                ismycmt[k] = false;
              }
            }
            setIsMyComment([...ismycmt]);
          }

          console.log(ismycmt);
        });
      }
      setFollowStatus(newFollowStatus); // 팔로우 상태를 업데이트
    });
  }, []);

  const OnHistoryPushUser = (i, a) => {
    const path =
      DataUsername[i] === WhoLogin ? "/profiles" : `/namprofiles/${a.user._id}`;
    history.push(path);
  };

  const OnHistoryPushWhoid = (i, a) => {
    const path =
      DataUsername[i] === WhoLogin ? "/profiles" : `/namprofiles/${a.whoid}`;
    history.push(path);
  };

  // 좋아요 하기
  const On_Heart = async (ID, index) => {
    console.log("아이디값: " + ID);

    heart_change((prevState) =>
      prevState.map((item, idx) => (idx === index ? true : item))
    );
    setHeartNum((prevState) =>
      prevState.map((item, idx) => (idx === index ? item + 1 : item))
    );

    try {
      await requestAxios.patch(`/api/posts/${ID}/likeby`);
      await requestAxios.patch(`/api/posts/${ID}/addlike`);
    } catch (error) {
      console.error(error);
    }
  };

  // 좋아요 취소
  const Off_Heart = async (ID, index) => {
    heart_change((prevState) =>
      prevState.map((item, idx) => (idx === index ? false : item))
    );
    setHeartNum((prevState) =>
      prevState.map((item, idx) => (idx === index ? item - 1 : item))
    );

    try {
      await requestAxios.patch(`/api/posts/${ID}/cancleLikeby`);
      await requestAxios.patch(`/api/posts/${ID}/canclelike`);
    } catch (error) {
      console.error(error);
    }
  };

  const On_Follow = async (werid, wername, index) => {
    let ingid = ""; // 팔로잉 하는 사람의 _id;
    let whofollow = ""; // 팔로잉 하는 사람의 username

    follow_change((prevState) =>
      prevState.map((item, idx) => (idx === index ? true : item))
    );

    const response = await requestAxios.get(`/api/auth/check`);
    ingid = response.data._id;
    whofollow = response.data.username;
    let body = {
      whofollowing: wername,
      whofollower: whofollow,
    };

    await requestAxios.patch(`api/auth/following/${ingid}/${werid}`, body);

    if (wername !== whofollow) {
      // 로그인한 사용자와 게시글의 작성자가 같지 않을 때만 새로고침 없이 노출
      setFollowStatus((prevState) => ({
        ...prevState,
        [wername]: true, // 팔로우 상태를 true로 변경
      }));
    }
  };

  const Off_Follow = async (werid, wername, index) => {
    let ingid = ""; // 팔로잉 하는 사람의 _id;
    let whounfollow = ""; // 팔로잉 하는 사람의 username

    follow_change((prevState) =>
      prevState.map((item, idx) => (idx === index ? false : item))
    );

    const response = await requestAxios.get(`/api/auth/check`);
    ingid = response.data._id;
    whounfollow = response.data.username;
    let body = {
      whounfollowing: wername,
      whounfollower: whounfollow,
    };

    await requestAxios.patch(`api/auth/unfollowing/${ingid}/${werid}`, body);

    if (wername !== whounfollow) {
      // 로그인한 사용자와 게시글의 작성자가 같지 않을 때만 새로고침 없이 노출
      setFollowStatus((prevState) => ({
        ...prevState,
        [wername]: false, // 팔로우 상태를 false로 변경
      }));
    }
  };

  // 댓글 게시
  async function onSubmitHandler(index) {
    await requestAxios
      .patch(`api/posts/${ID}/givecomment`, { content: commentsList[index] })
      .then((response) => {
        // 댓글 게시 후에 댓글 목록을 다시 불러옵니다.
        requestAxios.get(`/api/posts/${ID}`).then((response) => {
          const updatedComments = response.data.comment;
          setCommentOjArr((prev) =>
            prev.map((item, idx) => (idx === index ? updatedComments : item))
          );
        });
        // 댓글 게시 후에 commentsList 상태 초기화
        commentsList[index] = "";
        setCommentsList([...commentsList]);
      });
  }

  // 댓글 삭제
  async function deletecmt(cid, ID, index) {
    await requestAxios
      .patch(`api/posts/${ID}/${cid}/deleteComment`)
      .then((response) => {
        console.log("댓글삭제 성공!!");
        // 댓글 삭제 후에 댓글 목록을 다시 불러옵니다.
        requestAxios.get(`/api/posts/${ID}`).then((response) => {
          const updatedComments = response.data.comment;
          setCommentOjArr((prev) =>
            prev.map((item, idx) => (idx === index ? updatedComments : item))
          );
        });
      });
  }

  async function clickPoint(id) {
    modal_change(true);
    setNamID(id);
  }

  return (
    <FollowStatusContext.Provider value={followStatus}>
      {
        // Contents 배열에 담긴 갯수 기준으로 반복문 돌려서 card retrun해주고 i로 매개변수 따로 만들어줘서
        // 데이터 바인딩 할 곳에 배열 [i]로 뿌려줘야함
        Contents.map(function (a, i) {
          return (
            <div style={{ width: "40rem" }} className="main_card" key={a._id}>
              <div className="main_profile_div">
                <div className="main_profile">
                  <div className="profile_div">
                    <div className="main_profileImage_box main_cardprofileImage_box">
                      <img
                        className="main_profileImage"
                        src={Profile[i]}
                        alt=""
                      />
                    </div>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => OnHistoryPushUser(i, a)}
                      className="main_username"
                    >
                      {DataUsername[i]}
                    </span>
                  </div>
                  <div
                    className="main_Point_div"
                    onClick={() => {
                      clickPoint(a.user._id);
                    }}
                  >
                    <img
                      className="main_Point"
                      src="img/main_Point.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <Carousel>
                {
                  // [[],[],[]] 으로 뽑으려면 && 연산자 활용
                  FileImg[i] &&
                    FileImg[i].map((j) => {
                      return (
                        <Carousel.Item>
                          <Card.Img
                            variant="top"
                            src={j}
                            className="edit_img_size_card"
                          />
                        </Carousel.Item>
                      );
                    })
                }
              </Carousel>

              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <div>
                    {/* 좋아요 클릭 취소 삼항연산자 */}
                    {heart[i] === false ? (
                      <img
                        alt=""
                        className="main_herat_off"
                        src="img/main_heart_off.png"
                        onClick={() => On_Heart(a._id, i)}
                      />
                    ) : (
                      <img
                        alt=""
                        className="main_herat_off"
                        src="img/main_heart_on.png"
                        onClick={() => Off_Heart(a._id, i)}
                      />
                    )}

                    {DataUsername[i] !== WhoLogin &&
                      (followStatus[DataUsername[i]] === false ? (
                        <img
                          alt=""
                          className="main_follow"
                          src="img/main_follow_off.png"
                          onClick={() =>
                            On_Follow(a.user._id, a.user.username, i)
                          }
                        />
                      ) : (
                        <img
                          alt=""
                          className="main_follow"
                          src="img/main_follow_on.png"
                          onClick={() =>
                            Off_Follow(a.user._id, a.user.username, i)
                          }
                        />
                      ))}
                  </div>

                  {/* 좋아요 숫자 */}
                  <div className="like_div">좋아요 {heartNum[i]}개</div>

                  {/* 게시물 코맨트 */}
                  <div className="contents_div" key={i}>
                    {a.contents}
                  </div>

                  {/* 댓글쓴이 & 댓글 */}
                  {CommentOjArr[i] &&
                    CommentOjArr[i].map((w, j) => (
                      <React.Fragment key={w._id}>
                        <div className="contents_div_username">
                          {" "}
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => OnHistoryPushWhoid(i, a)}
                            className="W_Who"
                          >
                            {w.who}
                          </span>
                          <span className="contents_div_username_span">
                            {w.content}
                          </span>
                          {w.who === WhoLogin ||
                          WhoLogin === a.user.username ? (
                            <span className="contents_div_username_span">
                              <img
                                alt=""
                                className="delete_1"
                                src="img/delete_1.png"
                                onClick={() => deletecmt(w._id, a._id, i)}
                              />
                            </span>
                          ) : null}
                        </div>
                      </React.Fragment>
                    ))}
                </ListGroupItem>

                <ListGroupItem style={{ paddingBottom: "10px" }}>
                  {/* 댓글입력창 */}
                  <form
                    className="main_card_textarea"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmitHandler(i);
                    }}
                    onChange={() => saveID(a._id)}
                  >
                    <img alt="" className="main_smile" src="img/smile.png" />

                    <input
                      value={commentsList[i]}
                      type="text"
                      className="main_card_textarea"
                      name="w3review"
                      autoComplete="off"
                      rows="1"
                      cols="80"
                      placeholder="댓글달기..."
                      onChange={(e) => {
                        // commentsList의 해당 인덱스에 댓글 입력값 저장
                        commentsList[i] = e.target.value;
                        setCommentsList([...commentsList]);
                      }}
                    ></input>

                    <button
                      disabled={commentsList[i].length === 0}
                      className="main_card_textarea_button"
                    >
                      게시
                    </button>
                  </form>
                </ListGroupItem>
              </ListGroup>
            </div>
          );
        })
      }

      {modal === true ? (
        <Modal_main_point closeModal={closeModal} NamID={NamID} />
      ) : null}

      {comment === true ? (
        <Modal_Main_Comments closecomment={closecomment} />
      ) : null}

      <CloseFriends />
    </FollowStatusContext.Provider>
  );
}
export default withRouter(MainCard);
