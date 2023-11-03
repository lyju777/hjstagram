import React from "react";
import { Link } from "react-router-dom";

function Modal_main_point(props) {

    return(

 <div className="modal_background">
<div className="modal_main_point">
  <div className="modal_main_point_text">

  <div>
  <Link to={{pathname: `/namprofiles/${props.NamID}`}} className="modal_text_blue"><p>게시물로 이동</p></Link>
  </div>


  <div>
    <p onClick={props.closeModal}>취소</p>
  </div>
  </div>
</div>
</div>
    )
}

//  <Link to="/profile" className="modal_text_blue"><p>게시물로 이동</p></Link> 
export default Modal_main_point;
