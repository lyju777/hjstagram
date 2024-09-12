import React, { useState, useEffect } from "react";
import requestAxios from "../../api/requestAxios";
import { MoonLoader } from "react-spinners";

function Modal_Profile_Follow(props) {
  const [loading, setLoading] = useState(true);
  const [followerPeople, setfollowerPeople] = useState([]);

  const [Profile, setProfile] = useState([]);

  const myfollower = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestAxios.get(`/api/auth/check`);
        setfollowerPeople(response.data.followerPeople);
        const follower = response.data.followerPeople;

        for (let i = 0; i < follower.length; i++) {
          await requestAxios
            .patch(`api/auth/getF4Fprofile`, { username: follower[i] })
            .then((response) => {
              myfollower[i] = response.data.profileurl;
              setProfile([...myfollower]);
            });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="modal_background modal_background_white">
      <div className="modal_profile_follow">
        <img
          className="CloseButton"
          src="img/close.png"
          alt=""
          onClick={props.closeFollow}
        />
        <div className="modal_profile_follow_text">
          <p className="following_text">팔로워</p>

          {loading ? (
            <div
              className="loading_spinner"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30vh",
              }}
            >
              <MoonLoader
                size={40}
                color={"#308fff"}
                animation="border"
                role="status"
              />
            </div>
          ) : (
            followerPeople.map((a, i) => {
              return (
                <div className="modal_profile_follow_in" key={i}>
                  <div className="main_profileImage_box main_profileImage_heart_box">
                    <img
                      className="main_profileImage main_profileImage_heart"
                      alt=""
                      src={Profile[i]}
                    />
                  </div>
                  <div
                    className="main_username main_username_heart"
                    style={{ color: "#515151" }}
                  >
                    {a}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal_Profile_Follow;
