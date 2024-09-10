import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import requestAxios from "../../api/requestAxios";
import Modalmainprofile from "../main/modal_main_profile";
import Modalmainheart from "../main/modal_main_herat";

function Header() {
  // 각 modal마다 다르게 state를 설정해줘야 한다
  let [modal, modal_change] = useState(false);
  let [modal_heart, modal_change_herat] = useState(false);

  let [Profile, setProfile] = useState("img/default_profile.png");

  const closeModal = () => {
    modal_change(false);
  };

  const closeModal_herat = () => {
    modal_change_herat(false);
  };

  useEffect(() => {
    requestAxios.get("/api/auth/check").then((response) => {
      setProfile(response.data.profileurl);
    });
  }, []);

  const main_profileImage = (
    <div className="main_profileImage_box">
      <img className="main_profileImage" src={Profile} alt="" />
    </div>
  );

  return (
    <>
      <header className="navber">
        <Container>
          <div className="navber_Container">
            <div className="NavbarBrand">
              <Link to="/main">
                <img
                  className="main-instagram-logo"
                  src="img/instagramlogo.png"
                  alt=""
                />
              </Link>
            </div>
            <div aria-controls="navbarScroll" />
            <div id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "80" }} // instagram 로고 크기
                navbarScroll
              >
                <div className="navlink_div">
                  <Nav.Link as={Link} to="/main">
                    <img className="header_home" src="img/header_home.png" alt=""/>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/main_edit_file">
                    <img className="header_edit" src="img/header_edit.png" alt=""/>
                  </Nav.Link>

                  <div
                    className="navbarScrollingDropdown"
                    onClick={() => {
                      modal_change(true);
                    }}
                  >
                    {main_profileImage}
                  </div>
                </div>
              </Nav>
            </div>
          </div>
        </Container>
      </header>

      {modal === true ? <Modalmainprofile closeModal={closeModal} /> : null}

      {modal_heart === true ? (
        <Modalmainheart closeModal_herat={closeModal_herat} />
      ) : null}
    </>
  );
}

export default Header;