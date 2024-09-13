import React, { useState, useLayoutEffect } from "react";
import Modalprofilegear from "./modal_profile_gear";
import ModalProfileChange from "./modal_profile_change";
import ModalProfileFollow from "./modal_profile_follow";
import ModalProfileFollower from "./modal_profile_follower";
import requestAxios from "../../api/requestAxios";
import { BeatLoader } from "react-spinners";

function Profile() {
  const [loading, setLoading] = useState(true);

  let [gear, gear_change] = useState(false);

  let [profile, profile_change] = useState(false);

  let [follow, follow_change] = useState(false);

  let [follower, follower_change] = useState(false);

  let [Profile, setProfile] = useState(
    "https://d3gxsp5zp8da8n.cloudfront.net/hjstagram/icon/default_profile.png"
  );

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

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestAxios.get("/api/auth/check");

        setDataUsername(response.data.username); // 아이디
        setDataName(response.data.name); // 이름
        setIntroment(response.data.introment); // 소개글
        setfollowingNum(response.data.followingNum);
        setfollowerNum(response.data.followerNum);
        setPostNum(response.data.postsNum);
        setProfile(response.data.profileurl);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        className="loading_spinner"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <BeatLoader
          color="#308fff"
          animation="border"
          role="status"
        ></BeatLoader>
      </div>
    );
  }

  const username = (
    <div className="profile_username">
      {DataUsername}
      <img
        className="profile_gear"
        src="img/gear.png"
        alt=""
        onClick={() => {
          gear_change(true);
        }}
      />
    </div>
  );

  const main_profileImage = (
    <div className="closefriends_profileImage_box profile_profileImage_box">
      <img
        className="profile_profileImage"
        src={Profile}
        alt=""
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
          {username}
        </div>
      </div>

      <div className="profile_profile_div2">
        <div className="profile_profile_text">
          <span>게시물 {postNum}</span>
        </div>

        <div
          className="profile_profile_text"
          onClick={() => {
            follower_change(true);
          }}
        >
          <span>팔로워 {followerNum}</span>
        </div>

        <div
          className="profile_profile_text"
          onClick={() => {
            follow_change(true);
          }}
        >
          <span>팔로잉 {followingNum}</span>
        </div>
      </div>

      <div className="profile_profile_div2">
        <div className="profile_profile_name">
          <span>{DataName}</span>
        </div>
      </div>

      <div className="profile_profile_div2 profile_profile_div3">
        <div className="profile_profile_name">
          <span>{Introment}</span>
        </div>
      </div>

      {gear === true ? <Modalprofilegear closeGear={closeGear} /> : null}

      {profile === true ? (
        <ModalProfileChange closeProfile={closeProfile} />
      ) : null}

      {follow === true ? (
        <ModalProfileFollow closeFollow={closeFollow} />
      ) : null}

      {follower === true ? (
        <ModalProfileFollower closeFollow={closeFollower} />
      ) : null}
    </>
  );
}

export default Profile;
