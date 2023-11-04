import React, { useState, useEffect } from "react";
import Modal_profile_gear from "./modal_profile_gear";
import Modal_Profile_Change from "./modal_profile_change";
import Modal_Profile_Follow from "./modal_profile_follow";
import Modal_Profile_Follower from "./modal_profile_follower";
import axios from "axios";

function Other_Profile(match) {
  let [gear, gear_change] = useState(false);

  let [profile, profile_change] = useState(false);

  let [follow, follow_change] = useState(false);

  let [follower, follower_change] = useState(false);

  let [Profile, setProfile] = useState("/img/default_profile.png");

  const closeGear = () => {
    gear_change(false);
  };

  const closeProfile = () => {
    profile_change(false);
  };

  const closeFollow = () => {
    follow_change(false);
  };

  const closeFollower = () => {
    follower_change(false);
  };

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

    axios.get(`/api/auth/${id}`).then((response) => {
      setDataUsername(response.data.username); // 사용자이름
      setDataName(response.data.name); // 이름
      setIntroment(response.data.introment); // 소개글

      setfollowingNum(response.data.followingNum);
      setfollowerNum(response.data.followerNum);
      setPostNum(response.data.postsNum);

      setProfile(response.data.profileurl);
      setID(response.data._id);
      const isFollowing = response.data.followerPeople;
      axios.get(`/api/auth/check`).then((response) => {
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
    axios.get(`/api/auth/check`).then((response) => {
      const whofollowid = response.data._id;
      const whofollowname = response.data.username;

      let body = { whofollowing: DataUsername, whofollower: whofollowname };

      axios
        .patch(`/api/auth/following/${whofollowid}/${ID}`, body)
        .then((response) => {
          console.log("팔로잉성공!");
          // 팔로우 수 업데이트
          setfollowerNum(followerNum + 1);
          // 팔로우 상태 업데이트
          setIsFollower(true);
        });
    });
  };

  //팔로윙 끊기
  const Off_Follow = () => {
    axios.get(`/api/auth/check`).then((response) => {
      const whounfollowid = response.data._id;
      const whounfollowname = response.data.username;
      let body = {
        whounfollowing: DataUsername,
        whounfollower: whounfollowname,
      };

      axios
        .patch(`/api/auth/unfollowing/${whounfollowid}/${ID}`, body)
        .then((res) => {
          console.log("언팔성공!");
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
        src={Profile}
        onClick={() => {
          profile_change(true);
        }}
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
          onClick={() => {
            follower_change(true);
          }}
        >
          팔로워 {followerNum}
        </div>

        <div
          className="profile_profile_text"
          onClick={() => {
            follow_change(true);
          }}
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
