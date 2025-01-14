import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import requestAxios from "../../api/requestAxios";
import { BeatLoader } from "react-spinners";

function ChangePassword(props) {
  const [loading, setLoading] = useState(true);

  let [Profile, setProfile] = useState(
    "https://d3gxsp5zp8da8n.cloudfront.net/hjstagram/icon/default_profile.png"
  );

  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  // 유효성 메세지 state
  const [CheckExPwMsg, setCheckExPwMsg] = useState("");
  const [PassWordMsg, setPassWordMsg] = useState("");
  const [CheckPassWordMsg, setCheckPassWordMsg] = useState("");

  // 유효성 검사 체크
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordCheckValid, setPasswordCheckValid] = useState(false);

  const onOldPasswordHandler = (event) => {
    setOldPassword(event.currentTarget.value);
  };

  const onNewPasswordHandler = (event) => {
    setNewPassword(event.currentTarget.value);
  };

  const onconfirmPassword = (event) => {
    setconfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 페이지 새로고침 방지
  };

  let id = "";

  let body = {
    Oldpassword: OldPassword,
    newPassword: NewPassword,
  };

  // 이전 비밀번호 DB값 비교
  const OldcheckPassword = (e) => {
    requestAxios.get("/api/auth/check").then((response) => {
      id = response.data._id;

      requestAxios
        .post(`api/auth/expwCheck/${id}`, { password: OldPassword })
        .then((response) => {
          if (response.data.expw === "틀림") {
            setCheckExPwMsg("비밀번호가 일치하지 않습니다.");
          } else {
            setCheckExPwMsg("");
          }
        });
    });
  };

  useEffect(() => {
    // 모든 필드가 유효한지 확인
    if (passwordValid && passwordCheckValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }

    const fetchData = async () => {
      try {
        await requestAxios.get("/api/auth/check").then((response) => {
          setProfile(response.data.profileurl);
        });

        await requestAxios
          .get("/api/auth/check")
          .then((response) => setDataUsername(response.data.username));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [passwordValid, passwordCheckValid]);

  //비밀번호 유효성 검사
  const checkPassword = (e) => {
    requestAxios
      .get("/api/auth/check") // 입력한 비밀번호와 내 기존 비밀번호가 일치한지비교?
      .then((response) => {});

    //  8~15자 영문, 숫자 조합
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$/;
    // 형식에 맞는 경우 true 리턴
    if (!regExp.test(e.target.value)) {
      setPassWordMsg("8~15자 영문 또는 숫자로 입력해주세요.");
      setPasswordValid(false);
    } else {
      setPassWordMsg(""); // 정규식이 맞다면 ''공백으로 처리
      setPasswordValid(true);
    }
  };

  //비밀번호 확인 검사
  const Check_checkPassword = (e) => {
    if (NewPassword !== confirmPassword || NewPassword === "") {
      // 입력된 두 state값을 서로 비교해준다.
      setCheckPassWordMsg("비밀번호가 다릅니다.");
      setPasswordCheckValid(false);
    } else {
      setCheckPassWordMsg("");
      setPasswordCheckValid(true);
    }
  };

  const onClickHandler = () => {
    // 특정 값 필요할시 Handler에 엑시오스 2개 묶어서 사용해야함

    requestAxios.get("/api/auth/check").then((response) => {
      id = response.data._id;

      requestAxios
        .patch(`/api/auth/changePassword/${id}`, body)
        .then((response) => {
          if (response) {
            props.history.push("/login");
          } else {
            alert("Failed");
          }
        });
    });
  };

  const [DataUsername, setDataUsername] = useState(""); // state에 데이터바인딩할 response값 담아서 뿌리기

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
    <div className="profile_username editprofile_username">{DataUsername}</div>
  );

  const main_profileImage = (
    <div className="closefriends_profileImage_box editprofile_profileImage_box">
      <img className="profile_profileImage" src={Profile} alt="" />
    </div>
  );

  return (
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
            <label className="editprofile_label">이전 비밀번호</label>
            <input
              type="password"
              className="form-control"
              placeholder="이전 비밀번호"
              value={OldPassword}
              onChange={onOldPasswordHandler}
              onBlur={OldcheckPassword}
            />
          </div>
          <p className="Msg2">{CheckExPwMsg}</p>

          <div className="form-group editprofile_form">
            <label className="editprofile_label">새 비밀번호</label>
            <input
              type="password"
              className="form-control"
              placeholder="새 비밀번호"
              value={NewPassword}
              onChange={onNewPasswordHandler}
              onBlur={checkPassword}
            />
          </div>
          <p className="Msg2">{PassWordMsg}</p>

          <div className="form-group editprofile_form">
            <label className="editprofile_label">비밀번호 확인</label>
            <input
              type="password"
              className="form-control"
              placeholder="비밀번호 확인"
              onBlur={Check_checkPassword}
              onChange={onconfirmPassword}
            />
          </div>
          <p className="Msg2">{CheckPassWordMsg}</p>

          <div className="form-group"></div>

          <button
            type="submit"
            className="btn btn-primary editprofile_btn"
            onClick={onClickHandler}
            disabled={!isFormValid}
          >
            비밀번호 변경
          </button>

          <p className=" text-right editprofile_forgot_password">
            <Link to="/recover_password">비밀번호를 잊으셨나요?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default withRouter(ChangePassword);
