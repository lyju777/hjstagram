import React from "react";

function Modal_Main_Comments(props) {
  const username = <div className="main_username">wjdgntest</div>;

  const main_profileImage = (
    <div className="main_profileImage_box main_cardprofileImage_box">
      <img className="main_profileImage" src="img/pizza.jpg" alt="" />
    </div>
  );

  return (
    <>
      <div className="modal_background">
        <div className="main_comments_card">
          <div className="main_profile_div"></div>

          <div className="comment_div">
            <div className="profile_div">
              {main_profileImage}
              {username}
            </div>
            <div className="main_Point_div" onClick={props.closecomment}>
              <img
                className="main_Point commment_close"
                src="img/close.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal_Main_Comments;
