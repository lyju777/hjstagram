import React, {useState, useLayoutEffect} from "react";
import requestAxios from '../../api/requestAxios';
import { MoonLoader } from "react-spinners";

function Modal_Profile_Follow(props){

  const [loading, setLoading] = useState(true);

  const [followingPeople, setfollowingPeople] = useState([]);
  let [Profile, setProfile] = useState("https://d3gxsp5zp8da8n.cloudfront.net/hjstagram/icon/default_profile.png");
  const myfollow = [];
  
  useLayoutEffect(() => {

    const fetchData = async () => {
      try {
       const response = await requestAxios.get(`/api/auth/check`)
          setfollowingPeople(response.data.followingPeople);
          const follow = response.data.followingPeople;
          for(let i=0; i<follow.length; i++){
            await requestAxios.patch('/api/auth/getF4Fprofile', {username:follow[i]})
            .then(response => {
              myfollow[i] = response.data.profileurl;
              setProfile([...myfollow]);
            })
          }
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    
  }, []);


return (
  <div className="modal_background modal_background_white">
    <div className="modal_profile_follow">
      <img className="CloseButton" src="img/close.png" alt="" onClick={props.closeFollow} />
      <div className="modal_profile_follow_text">
        <p className="following_text">팔로잉</p>

        {loading ? (
          <div className="loading_spinner" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
            <MoonLoader size={40} color={"#308fff"} animation="border" role="status" />
          </div>
        ) : (
          followingPeople.map((a, i) => {
            return (
              <div className="modal_profile_follow_in" key={i}>
                <div className="main_profileImage_box main_profileImage_heart_box">
                  <img className="main_profileImage main_profileImage_heart" src={Profile[i]} alt="" />
                </div>
                <div className="main_username main_username_heart" style={{color: "#515151"}}>
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