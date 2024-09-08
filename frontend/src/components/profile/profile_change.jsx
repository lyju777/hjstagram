import requestAxios from '../../api/requestAxios';
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function Profile_Change(props) {
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState([]); // 단일이어도 배열 처리 해줘야함
  const [FileUpload, setFileUpload] = useState([]);

  // 파일 업로드 및 미리보기 이미지
  const saveFileImage = (e) => {
    const profile = e.target.files[0];

    if (!profile) {
      console.log("No file selected");
      return;
    }

    const profilePic = [...fileImage];
    const nowImageUrl = URL.createObjectURL(profile);
    profilePic.push(nowImageUrl);
    console.log(nowImageUrl);

    setFileImage(profilePic);
    setFileUpload(e.target.files);
  };

  console.log("FileUpload");
  console.log(FileUpload);
  console.log(fileImage);

  //파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage([]);
    setFileUpload([]);
  };

  const UploadPost = (event) => {
    event.preventDefault(); // 페이지 새로고침 방지

    const formData = new FormData();

    formData.append("profile", FileUpload[0], FileUpload[0].name);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let id = "";

    requestAxios.get("/api/auth/check").then((response) => {
      console.log(response);
      id = response.data._id;

      requestAxios.post(`/api/profilePic/${id}`, formData, config).then((response) => {
        console.log("profilePic의 response↓");
        console.log(formData);
        const profilepicurl = response.data.path;
        console.log("profilepicurl: " + profilepicurl);

        let body = {
          profilepicurl: profilepicurl,
        };

        //patch api 메소드
        requestAxios.patch(`/api/auth/profileChange`, body).then((response) => {
          console.log(response);

          requestAxios.patch(`api/posts/editprofileurl`, body).then((response) => {
            console.log(response);
            props.history.push("/profiles"); // 여기 다시 프로필 페이지로 이동
          });
        });
      });
    });
  };

  return (
    <>
      <form onSubmit={UploadPost} encType="multipart/form-data">
        <div className="profile_change_div_1 auth-inner">
          <p className="new_edit">프로필 사진 변경</p>
          <img
            alt=""
            className="profile_change_fileupload"
            src="./img/fileupload.png"
          ></img>

          <div className="profile_change_div2">
            <input
              name="profile"
              className="profile_change_imgUpload"
              type="file"
              onChange={saveFileImage}
              disabled={fileImage.length > 0}
            />

            <div className="main_edit_fileimage_button">
              <button
                type="reset"
                className="btn btn-primary"
                onClick={() => deleteFileImage()}
              >
                삭제
              </button>
              <button
                type="submit"
                className="btn btn-primary edit_file_submit"
                disabled={fileImage.length === 0}
              >
                변경
              </button>
            </div>
          </div>
          <div className="profile_change_div">
            {fileImage[0] && (
              <img
                className="d-block w-100 edit_img_size"
                src={fileImage[0]}
                alt="First slide"
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default withRouter(Profile_Change);

// 파일 업로드 엑시오스 작성 한 뒤
// 비밀번호 찾기 인증 페이지 처럼 삼항연산자를 통해 제출에 성공하면 card div가 생성 되도록 작성??
