import React from "react";
import Header from "../components/common/header";
import Profile from "../components/profile/profile";
import ProfilePost from "../components/profile/profile_post";

function ProfilePage() {
  return (
    <>
      <Header />
      <Profile />
      <ProfilePost />
    </>
  );
}

export default ProfilePage;
