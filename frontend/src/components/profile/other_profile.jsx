import React, { useState, useEffect } from "react";
import requestAxios from '../../api/requestAxios';

function Other_Profile(match) {

  let [Profile, setProfile] = useState("/img/default_profile.png");

  const [DataUsername, setDataUsername] = useState(""); // state에 데이터바인딩할 response값 담아서 뿌리기
  const [DataName, setDataName] = useState("");
  const [Introment, setIntroment] = useState("");

  const [followingNum, setfollowingNum] = useState(0); // 팔로잉 숫자
  const [followerNum, setfollowerNum] = useState(0); // 팔로워 숫자
  const [postNum, setPostNum] = useState(0); // 게시글 숫자
  const [ID, setID] = useState("");
  const [IsFollower, setIsFollower] = useState(false);

  useEffect(() => {
    const { id } = match;

    requestAxios.get(`/api/auth/${id}`).then((response) => {
      setDataUsername(response.data.username); // 사용자이름
      setDataName(response.data.name); // 이름
      setIntroment(response.data.introment); // 소개글

      setfollowingNum(response.data.followingNum);
      setfollowerNum(response.data.followerNum);
      setPostNum(response.data.postsNum);

      setProfile(response.data.profileurl);
      setID(response.data._id);
      const isFollowing = response.data.followerPeople;
      requestAxios.get(`/api/auth/check`).then((response) => {
        const whofollowname = response.data.username;

        for (let i = 0; i < isFollowing.length; i++) {
          if (isFollowing[i] === whofollowname) {
            setIsFollower(true);
          }
        }
      });
    });
  }, []);

  //팔로우
  const On_Follow = () => {
    requestAxios.get(`/api/auth/check`).then((response) => {
      const whofollowid = response.data._id;
      const whofollowname = response.data.username;

      let body = { whofollowing: DataUsername, whofollower: whofollowname };

      requestAxios.patch(`/api/auth/following/${whofollowid}/${ID}`, body)
        .then((response) => {
          // 팔로우 수 업데이트
          setfollowerNum(followerNum + 1);
          // 팔로우 상태 업데이트
          setIsFollower(true);
        });
    });
  };

  //팔로윙 끊기
  const Off_Follow = () => {
    requestAxios.get(`/api/auth/check`).then((response) => {
      const whounfollowid = response.data._id;
      const whounfollowname = response.data.username;
      let body = {
        whounfollowing: DataUsername,
        whounfollower: whounfollowname,
      };

      requestAxios.patch(`/api/auth/unfollowing/${whounfollowid}/${ID}`, body)
        .then((res) => {
          // 팔로우 수 업데이트
          setfollowerNum(followerNum - 1);
          // 팔로우 상태 업데이트
          setIsFollower(false);
        });
    });
  };

  const main_profileImage = (
    <div className="closefriends_profileImage_box profile_profileImage_box">
      <img
        className="profile_profileImage"
        alt=""
        src={Profile}
      />
    </div>
  );

  return (
    <>
      <div className="profile_profile_div">
        <div className="profile_profile">
          {main_profileImage}

          <div className="profile_username">
            {DataUsername}
            {IsFollower === true ? (
              <button
                className="Modal_profile_following_button"
                onClick={Off_Follow}
              >
                팔로잉 끊기
              </button>
            ) : (
              <button
                className="Modal_profile_follow_button2"
                onClick={On_Follow}
              >
                팔로우
              </button>
            )}
          </div>
        </div>

        <div className="namprofile_button_div"></div>
      </div>

      <div className="profile_profile_div2">
        <div className="profile_profile_text">게시물 {postNum}</div>

        <div
          className="profile_profile_text"
        >
          팔로워 {followerNum}
        </div>

        <div
          className="profile_profile_text"
        >
          팔로우 {followingNum}
        </div>
      </div>

      <div className="profile_profile_div2">
        <div className="profile_profile_name">{DataName}</div>
      </div>

      <div className="profile_profile_div2 profile_profile_div3">
        <div className="profile_profile_name">{Introment}</div>
      </div>
    </>
  );
}

export default Other_Profile;
