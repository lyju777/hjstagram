import React, { useState, useEffect, useContext } from "react";
import FollowStatusContext from "../../context/FollowStatusContext.js";
import requestAxios from '../../api/requestAxios';
import { Link } from "react-router-dom";

function CloseFriends() {
  const followStatus = useContext(FollowStatusContext);

  let [userProfile, setUserProfile] = useState("img/default_profile.png");

  const [Profile, setProfile] = useState([]);
  const [DataUsername, setDataUsername] = useState(""); // state에 데이터바인딩할 response값 담아서 뿌리기
  const [DataName, setDataName] = useState("");
  const [F4F, setF4F] = useState([]); // 서로 맞팔한 유저 state
  const [F4FID, setF4FID] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const f4fprofile = [];
      const f4fid = [];
      try {
        const response = await requestAxios.get("/api/auth/check", {
          headers: { "cache-control": "no-cache" },
        });
        setDataUsername(response.data.username);
        setDataName(response.data.name);
        setUserProfile(response.data.profileurl);

        const following = response.data.followingPeople || [];
        const follower = response.data.followerPeople || [];
        const FollowingEachOther = following.filter((it) =>
          follower.includes(it)
        );
        setF4F([...FollowingEachOther]);
        const requests = FollowingEachOther.map((user) =>
        requestAxios.patch("/api/auth/getF4Fprofile", { username: user })
        );
        const responses = await Promise.all(requests);
        responses.forEach((response, i) => {
          f4fid[i] = response.data._id;
          f4fprofile[i] = response.data.profileurl;
        });

        setF4FID([...f4fid]);
        setProfile([...f4fprofile]);
      } catch (error) {
        // 오류 처리
        console.error(error);
      }
    };

    if (followStatus) {
      fetchData();
    }
  }, [followStatus]); // followStatus를 의존성 배열에 포함하여 followStatus가 변경될 때만 fetchData 함수 호출

  const username = <span className="main_username">{DataUsername}</span>;
  const name = <div className="main_name">{DataName}</div>;

  const main_profileImage = (
    <div className="closefriends_profileImage_box main_cardprofileImage_box">
      <img className="main_profileImage" src={userProfile} alt="" />
    </div>
  );

  return (
    <div className="closefriends_div_mem">
      <div className="closefriends_div_me">
        <div className="closefriends">
          {main_profileImage}
          {username}
          {name}
          <span className="closefriends_closetext">EACH OTHER</span>
          {/* <span className="closefriends_alltext">모두보기</span> */}
        </div>

        <div className="closefriends_div">
          {F4F.map((a, i) => {
            return (
              <div className="closefriends" key={i}>
                <div className="each_other_image_box main_cardprofileImage_box">
                  <img alt="" className="each_other_profile" src={Profile[i]} />
                </div>
                <Link
                  to={{ pathname: `/namprofiles/${F4FID[i]}` }}
                  className="modal_text_blue"
                >
                  <span className="closefriends_span">{a}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CloseFriends;
