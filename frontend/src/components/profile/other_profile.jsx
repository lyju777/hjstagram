import React, { useState, useLayoutEffect } from "react";
import requestAxios from "../../api/requestAxios";
import { BeatLoader } from "react-spinners";

function Other_Profile(match) {
  let [Profile, setProfile] = useState(
    "https://d3gxsp5zp8da8n.cloudfront.net/hjstagram/icon/default_profile.png"
  );

  const [loading, setLoading] = useState(true);
  const [DataUsername, setDataUsername] = useState(""); // state에 데이터바인딩할 response값 담아서 뿌리기
  const [DataName, setDataName] = useState("");
  const [Introment, setIntroment] = useState("");

  const [followingNum, setfollowingNum] = useState(0); // 팔로잉 숫자
  const [followerNum, setfollowerNum] = useState(0); // 팔로워 숫자
  const [postNum, setPostNum] = useState(0); // 게시글 숫자
  const [ID, setID] = useState("");
  const [IsFollower, setIsFollower] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    const { id } = match;

    const fetchData = async () => {
      try {
        const response = await requestAxios.get(`/api/auth/${id}`);
        setDataUsername(response.data.username); // 아이디
        setDataName(response.data.name); // 이름
        setIntroment(response.data.introment); // 소개글

        setfollowingNum(response.data.followingNum);
        setfollowerNum(response.data.followerNum);
        setPostNum(response.data.postsNum);

        setProfile(response.data.profileurl);
        setID(response.data._id);
        const isFollowing = response.data.followerPeople;
        await requestAxios.get(`/api/auth/check`).then((response) => {
          const whofollowname = response.data.username;

          for (let i = 0; i < isFollowing.length; i++) {
            if (isFollowing[i] === whofollowname) {
              setIsFollower(true);
            }
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //팔로우
  const On_Follow = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      await requestAxios.get(`/api/auth/check`).then((response) => {
        const whofollowid = response.data._id;
        const whofollowname = response.data.username;

        let body = { whofollowing: DataUsername, whofollower: whofollowname };

        requestAxios
          .patch(`/api/auth/following/${whofollowid}/${ID}`, body)
          .then((response) => {
            // 팔로우 수 업데이트
            setfollowerNum(followerNum + 1);
            // 팔로우 상태 업데이트
            setIsFollower(true);
          });
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  //팔로윙 끊기
  const Off_Follow = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      requestAxios.get(`/api/auth/check`).then((response) => {
        const whounfollowid = response.data._id;
        const whounfollowname = response.data.username;
        let body = {
          whounfollowing: DataUsername,
          whounfollower: whounfollowname,
        };

        requestAxios
          .patch(`/api/auth/unfollowing/${whounfollowid}/${ID}`, body)
          .then((res) => {
            // 팔로우 수 업데이트
            setfollowerNum(followerNum - 1);
            // 팔로우 상태 업데이트
            setIsFollower(false);
          });
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const main_profileImage = (
    <div className="closefriends_profileImage_box profile_profileImage_box">
      <img className="profile_profileImage" alt="" src={Profile} />
    </div>
  );

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

  return (
    <>
      <div className="profile_profile_div">
        <div className="profile_profile">
          {main_profileImage}

          <div className="profile_username">
            {DataUsername}
            {IsFollower === true ? (
              <button
                style={{ bottom: "3px" }}
                variant="secondary"
                className="Modal_profile_following_button"
                onClick={Off_Follow}
              >
                <span>팔로우 취소</span>
              </button>
            ) : (
              <button
                style={{ bottom: "3px" }}
                className="Modal_profile_follow_button2"
                onClick={On_Follow}
              >
                <span>팔로우</span>
              </button>
            )}
          </div>
        </div>

        <div className="namprofile_button_div"></div>
      </div>

      <div className="profile_profile_div2">
        <div className="profile_profile_text">
          <span>게시물 {postNum}</span>
        </div>
        <div className="profile_profile_text">
          <span>팔로워 {followerNum}</span>
        </div>

        <div className="profile_profile_text">
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
    </>
  );
}

export default Other_Profile;
