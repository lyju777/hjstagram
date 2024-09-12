import React from "react";
import NamHeader from '../components/common/namheader';
import OtherProfile from "../components/profile/other_profile";
import OtherProfilePost from "../components/profile/other_profile_post";

function OtherProfilePage(match){

    const { id } = match;

    return (
        <>
          <NamHeader/>
          <OtherProfile id={id}/>
          <OtherProfilePost id={id}/>
        </>
    )
}

export default OtherProfilePage;