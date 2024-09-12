import React from "react";
import Header from "../components/common/header";
import OtherProfile from "../components/profile/other_profile";
import OtherProfilePost from "../components/profile/other_profile_post";

function OtherProfilePostPage(match){


    return (
        <>
        <Header/>
        <OtherProfile id={match.params.id}/>
        <OtherProfilePost/>
        </>
    )
}

export default OtherProfilePostPage;