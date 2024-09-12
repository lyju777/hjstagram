import React, { useState, useEffect } from "react";
import requestAxios from "../../api/requestAxios";
import { withRouter } from "react-router-dom";
import { MoonLoader } from "react-spinners";

function Profile_Post(props) {
  const [loading, setLoading] = useState(true);

  const [Posts, setPosts] = useState([]);

  const PostsArr = [];
  const [ID, setID] = useState("");

  const saveIDandModal = (id) => {
    setID(id);
    modal_change(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestAxios.get("/api/auth/check");
        const logusername = response.data.username;
        await requestAxios
          .get(`/api/posts?username=${logusername}`)
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              PostsArr[i] = response.data[i];
              setPosts([...PostsArr]);
            }
          });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deletePost = (ID) => {
    requestAxios.delete(`/api/posts/${ID}`).then((response) => {
      console.log("삭제됨!");

      requestAxios.patch("/api/auth/removePost").then((res) => {
        console.log("게시물 -1");

        // 게시물 삭제 후에 게시물 목록을 다시 불러옵니다.
        requestAxios.get("/api/auth/check").then((response) => {
          const logusername = response.data.username;
          requestAxios
            .get(`/api/posts?username=${logusername}`)
            .then((response) => {
              const updatedPosts = response.data;
              setPosts(updatedPosts);
            });
        });
      });
    });
  };

  let [modal, modal_change] = useState(false);

  const closeModal = () => {
    modal_change(false);
  };

  if (loading) {
    return (
      <div
        className="loading_spinner"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <MoonLoader
          size={40}
          color="#308fff"
          animation="border"
          role="status"
        ></MoonLoader>
      </div>
    );
  }

  return (
    <>
      <hr className="profile_hr"></hr>

      <div className="profile_div_box">
        {Posts &&
          Posts.map((a, index) => {
            return (
              <div className="profile_div_imgbox" key={index}>
                <img
                  alt=""
                  className="profile_div_img"
                  src={a.fileurls[0]}
                  onClick={() => {
                    saveIDandModal(a._id);
                  }}
                />
              </div>
            );
          })}
      </div>

      {modal === true ? (
        <div className="modal_background" onClick={closeModal}>
          <div className="modal_main_point modal_editprofile_point">
            <div className="modal_main_point_text modal_editprofile_text">
              <div>
                <p>게시물을 삭제 하시겠습니까?</p>
              </div>

              <button
                type="submit"
                onClick={() => deletePost(ID)}
                className="btn btn-primary modal_editprofile_btn"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default withRouter(Profile_Post);
