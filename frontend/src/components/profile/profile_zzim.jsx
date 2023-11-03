import React from "react";
import { Link } from "react-router-dom"

function Profile_Zzim(){

    return(
<>
    
    <hr className="profile_hr"></hr>
    <hr className="profile_hr profile_bk_2"></hr>

    <div className="profile_tabs">
        <div className="profile_tabs_button">
        <Link to="/profile">
            <img className="profile_profiletabs_imges" src="img/profile_1.png"/>게시물
        </Link>
        </div>

        <div className="profile_tabs_button">
        <Link to="/profile_zzim">
            <img className="profile_profiletabs_imges" src="img/profile_2.png"/>저장됨
        </Link>
        </div>

        <div className="profile_tabs_button">
        <Link to="/profile_tags">
            <img className="profile_profiletabs_imges" src="img/profile_3.png"/>태그됨
        </Link>
        </div>
    </div>

    <div className="profile_div_box">
        <div className="profile_div_imgbox">
            <img className="profile_div_img" src="img/pizza.jpg"/>
        </div>

        <div className="profile_div_imgbox">
            <img className="profile_div_img" src="img/pizza.jpg"/>
        </div>
    </div>

    
</>
    )
}

export default Profile_Zzim;