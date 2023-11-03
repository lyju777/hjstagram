import React,{useState, useEffect} from "react";
import axios from "axios";

function CloseFriends(){

  let [userProfile,setUserProfile] = useState("img/default_profile.png");

  const [Profile, setProfile] = useState([]);
  const [DataUsername, setDataUsername] = useState("")  // state에 데이터바인딩할 response값 담아서 뿌리기
  const [DataName, setDataName] = useState("")
  const [F4F, setF4F] = useState([]); // 서로 맞팔한 유저 state

  const f4fprofile = [];

  useEffect(() => {
      axios.get('/api/auth/check')
      // 데이터 두개 여러개 가져올때는 , 써서 연속으로 써준다
      .then(response =>  {
        
        setDataUsername(response.data.username)
        setDataName(response.data.name)
        setUserProfile(response.data.profileurl)
        
        const following = response.data.followingPeople;
        const follower = response.data.followerPeople;
        const FollowingEachOther = following.filter(it => follower.includes(it)); 
        setF4F([...FollowingEachOther])
        console.log(FollowingEachOther);

        for(let i=0; i<FollowingEachOther.length; i++){
          console.log(FollowingEachOther[i]);
          axios.patch('/api/auth/getF4Fprofile', {username:FollowingEachOther[i]})
          .then(response => {
            console.log(response);
            f4fprofile[i] = response.data.profileurl;
            console.log(f4fprofile);
          })
        }
        
        setProfile([...f4fprofile]);

      }
      
      )}, []);


  



    const username = <div className="main_username">{DataUsername}</div>;
    const name = <div className="main_name">{DataName}</div>;

    const main_profileImage = <div className="closefriends_profileImage_box main_cardprofileImage_box">
    <img className="main_profileImage" src={userProfile} /></div>

    const close_profileImage = <div className="main_profileImage_box main_cardprofileImage_box">
    <img className="main_profileImage" src="img/pizza.jpg" /></div>
      

    return(

      <div className="closefriends_div_mem">
      <div className="closefriends_div_me">
      <div className="closefriends"> 
        {main_profileImage}{username}{name}
      <span className="closefriends_closetext">EACH OTHER</span>
      {/* <span className="closefriends_alltext">모두보기</span> */}
      </div>

      <div className="closefriends_div">


      <div className="closefriends"> 
      {
        F4F.map( (a,i) => {
          return(
            <>
            <div className="main_profileImage_box main_cardprofileImage_box">
            <img className="main_profileImage" src={Profile[i]} /></div>
            <span className="closefriends_span">{a}</span>
            </>
          )
        })
      }
    </div>


      </div>
      </div> 
      </div>
      
    )
}

export default CloseFriends;