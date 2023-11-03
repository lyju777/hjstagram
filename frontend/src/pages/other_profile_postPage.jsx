import React from "react";
import Header from "../components/common/header";
import Other_Profile from "../components/profile/other_profile";
import Other_Profile_Post from "../components/profile/other_profile_post";

function OtherProfilePostPage(match){


    return (
        <>
        <Header/>
        <Other_Profile id={match.params.id}/>
        <Other_Profile_Post/>
        </>
    )
}

export default OtherProfilePostPage;