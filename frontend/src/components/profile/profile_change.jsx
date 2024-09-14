import requestAxios from "../../api/requestAxios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function Profile_Change(props) {
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState([]); // 단일이어도 배열 처리 해줘야함
  const [FileUpload, setFileUpload] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setFileImage(profilePic);
    setFileUpload(e.target.files);
  };

  //파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage([]);
    setFileUpload([]);
  };

  const UploadPost = async (event) => {
    event.preventDefault(); // 페이지 새로고침 방지

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("profile", FileUpload[0], FileUpload[0].name);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      let id = "";

      const response = await requestAxios.get("/api/auth/check");
      id = response.data._id;

      await requestAxios
        .post(`/api/profilePic/${id}`, formData, config)
        .then((response) => {
          const profilepicurl = response.data.path;
          let body = {
            profilepicurl: profilepicurl,
          };

          //patch api 메소드
          requestAxios
            .patch(`/api/auth/profileChange`, body)
            .then((response) => {
              requestAxios
                .patch(`api/posts/editprofileurl`, body)
                .then((response) => {
                  props.history.push("/profiles"); // 여기 다시 프로필 페이지로 이동
                });
            });
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form encType="multipart/form-data">
        <div className="profile_change_div_1 auth-inner">
          <p className="new_edit">프로필 사진 변경</p>
          <img
            alt=""
            className="profile_change_fileupload"
            src="./img/fileupload.png"
          ></img>

          <div className="profile_change_div2">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                className="imgUpload"
                name="profile"
                onChange={saveFileImage}
                style={{ width: "75%" }}
                disabled={fileImage.length > 0}
              />
            </Form.Group>

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
                onClick={UploadPost}
                disabled={fileImage.length === 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "등록"
                )}
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
