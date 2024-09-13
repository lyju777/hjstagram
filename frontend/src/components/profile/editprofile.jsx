import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ModalEditProfile from "./modal_editprofile";
import requestAxios from "../../api/requestAxios";
import { BeatLoader } from "react-spinners";

function EditProfile(props) {
  const [loading, setLoading] = useState(true);

  let [Profile, setProfile] = useState(
    "https://d3gxsp5zp8da8n.cloudfront.net/hjstagram/icon/default_profile.png"
  );

  const [Username, setUsername] = useState(""); // state에 데이터바인딩할 response값 담아서 뿌리기
  const [TitleUsername, setTitleUsername] = useState(""); // state에 데이터바인딩할 response값 담아서 뿌리기
  const [Name, setName] = useState("");
  const [Introment, setIntroment] = useState("");

  // react는 input에 value값을 지정하면 입력이 불가능, handler만들어서 onChange로 설정해줘야함
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onIntroductionHandler = (event) => {
    setIntroment(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 페이지 새로고침 방지
  };

  let id = "";

  // DB에서 가져온값 바로 setState 해주고 바로 서버에서 전달
  // state 두개만들 필요 없음
  let body = {
    name: Name,
    username: Username,
    introment: Introment,
  };

  // DB값은 수정됬고 /main으로 넘어가는거도 에러없이 성공했는데 바인딩이 실패했다 무엇일까??
  const onClickHandler = () => {
    // 특정 값 필요할시 Handler에 엑시오스 2개 묶어서 사용해야함

    requestAxios.get("/api/auth/check").then((response) => {
      id = response.data._id;

      requestAxios
        .patch(`api/posts/editusername`, { username: Username })
        .then((response) => {});

      requestAxios.patch(`/api/auth/edit/${id}`, body).then((response) => {
        props.history.push("/profiles");
      });
    });
  };

  let [modal, modal_change] = useState(false);

  const closeModal = () => {
    modal_change(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await requestAxios
          .get("/api/auth/check")
          // 데이터 두개 여러개 가져올때는 , 써서 연속으로 써준다
          .then((response) => {
            setUsername(response.data.username);
            setName(response.data.name);
            setIntroment(response.data.introment);
            setTitleUsername(response.data.username);
            setProfile(response.data.profileurl);
          });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        className="loading_spinner"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <BeatLoader
          color="#308fff"
          animation="border"
          role="status"
        ></BeatLoader>
      </div>
    );
  }

  const username = (
    <div className="profile_username editprofile_username">{TitleUsername}</div>
  );

  const main_profileImage = (
    <div className="closefriends_profileImage_box editprofile_profileImage_box">
      <img className="profile_profileImage" src={Profile} alt="" />
    </div>
  );

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner editprofile_div">
          <div className="profile_profile_div editprofile_profile_div">
            <div className="profile_profile editprofile_profile">
              {main_profileImage}
              {username}
            </div>
          </div>

          <form onClick={onSubmitHandler}>
            <div className="form-group editprofile_form">
              <label className="editprofile_label">이름</label>
              <input
                type="text"
                className="form-control"
                maxLength="10"
                placeholder="이름"
                value={Name}
                onChange={onNameHandler}
              />
            </div>

            <div className="form-group editprofile_form">
              <label className="editprofile_label">아이디</label>
              <input
                type="text"
                className="form-control"
                placeholder="아이디"
                value={Username}
                disabled={true}
              />
            </div>

            <div className="form-group editprofile_form">
              <label className="editprofile_label">소개</label>
              <textarea
                placeholder="최대 20자"
                maxLength="20"
                type="text"
                className="form-control changepassword_textarea"
                value={Introment}
                onChange={onIntroductionHandler}
              />
            </div>

            <div className="form-group"></div>

            <button
              type="submit"
              className="btn btn-primary editprofile_btn"
              onClick={onClickHandler}
              disabled={Name ? false : true}
            >
              변경
            </button>

            <span
              className=" text-right editprofile_forgot_password"
              onClick={() => {
                modal_change(true);
              }}
            >
              <p>
                <button
                  style={{
                    color: "#4395ff",
                    cursor: "pointer",
                    fontWeight: "bolder",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                >
                  회원탈퇴 하시겠습니까?
                </button>
              </p>
            </span>
          </form>
        </div>
      </div>

      {modal === true ? <ModalEditProfile closeModal={closeModal} /> : null}
    </>
  );
}

export default withRouter(EditProfile);
