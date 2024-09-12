import React, { useState } from "react";
import Follow from "./follow";
import Following from "./following";

function Modal_main_heart(props) {
  let [following, following_change] = useState(false);

  const closefollowing = () => {
    following_change(!following);
  };

  const username = (
    <div className="main_username main_username_heart">
      wjdgntest님이 회원님을 팔로우 했습니다.
    </div>
  );

  const main_profileImage = (
    <div className="main_profileImage_box main_profileImage_heart_box">
      <img
        className="main_profileImage main_profileImage_heart"
        src="img/pizza.jpg"
        alt=""
      />
    </div>
  );

  return (
    <div className="modal_background_white">
      <div className="modal_main_heart">
        <img
          className="CloseButton"
          src="img/close.png"
          alt=""
          onClick={props.closeModal_herat}
        />
        <div className="modal_main_heart_text">
          <div className="modal_main_heart_in">
            <p>
              {main_profileImage}
              {username}
            </p>
            {following === false ? (
              <Following closefollowing={closefollowing} />
            ) : (
              <Follow closefollowing={closefollowing} />
            )}
          </div>

          <div className="modal_main_heart_in">
            <p>
              {main_profileImage}
              {username}
            </p>
            {following === false ? (
              <Following closefollowing={closefollowing} />
            ) : (
              <Follow closefollowing={closefollowing} />
            )}
          </div>

          <div className="modal_main_heart_in">
            <p>
              {main_profileImage}
              {username}
            </p>
            {following === false ? (
              <Following closefollowing={closefollowing} />
            ) : (
              <Follow closefollowing={closefollowing} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal_main_heart;
