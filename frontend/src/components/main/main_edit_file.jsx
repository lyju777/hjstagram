import axios from "axios";
import React, { useState } from "react";
import { Link,withRouter } from "react-router-dom";
import { Carousel } from 'react-bootstrap';

function Main_Edit_File(props) { 

  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState([]);
  const [FileUpload, setFileUpload] = useState([]);
  const [Text, setText] = useState("");


  // 파일 업로드 및 미리보기 이미지
  const saveFileImage = (e) => {

    const nowSelectImageList = e.target.files;

    console.log(nowSelectImageList);

    const nowImageURLList = [...fileImage];

    for(let i=0; i<nowSelectImageList.length; i+=1){
        const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);

        nowImageURLList.push(nowImageUrl);
        console.log(nowImageUrl);

    }
    setFileImage(nowImageURLList);
    setFileUpload(e.target.files);
  };

  console.log("FileUpload")
  console.log(FileUpload);
  console.log(fileImage);

  // 파일 삭제
  const deleteFileImage = () => {
     URL.revokeObjectURL(fileImage); setFileImage([]);
     setFileUpload([]); 
  };

  // 텍스트 전송
  const onTextHandler = (event) => {
      setText(event.currentTarget.value)
  }

  let body = {
    contents:Text
  }
    
  


  const UploadPost = (event) => {
    event.preventDefault(); // 페이지 새로고침 방지

    const formData = new FormData();

    for (let i = 0; i < FileUpload.length; i++) {
      formData.append("attachment", FileUpload[i], FileUpload[i].name);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let id = ""
    const fileurls = [];
    axios.post('/api/posts',body)
    .then(response => {
      console.log(response);
      id = response.data._id

      axios.post(`/api/files/${id}`,formData,config)
      .then(response => {
        console.log("file의 response↓")
        console.log(formData);

      
        axios.get(`api/files?id=${id}`) // post id id배열에 담길때마다 GET 액시오스 호출 
          .then(response => {
            console.log("id : " + id)
            console.log("포스트 하나당 파일 정보");
            console.log(response);

            for(let i=0; i<response.data.length; i++){
              fileurls[i] = response.data[i].path.substr(18);
            }
            console.log(fileurls); // file path 다 담아줌!


            let body = {
              fileurl: fileurls,
            }
            //patch api 메소드 
            axios.patch(`api/posts/${id}`, body)
            .then(response => {
              console.log(response);
              props.history.push("/main")
            })
           
          })
      })
      axios.patch(`/api/auth/addPost`)
      .then(response => {
        console.log("게시글추가");
      })

    })
  }
  
  return (
     <>
      <form onSubmit={UploadPost} encType="multipart/form-data">
        <div className="main_edit_file_div auth-inner">
            <p className="new_edit">새 게시물 만들기</p>
              <img className="fileupload" src="./img/fileupload.png"></img>
              <div className="main_edit_fileimage_div2">
                <input type="text" className="form-control main_edit_file_textarea" placeholder="게시글작성"
                value={Text} onChange={onTextHandler}/>

                <input name="attachment" className="imgUpload" type="file" multiple accept="image/*"
                onChange={saveFileImage}/>


                <div className="main_edit_fileimage_button">
                  <button type="reset" className="btn btn-primary" onClick={() => deleteFileImage()} >삭제</button>
                  <button type="submit" className="btn btn-primary edit_file_submit">제출</button>
                </div>


            </div>
            <div className="main_edit_fileimage_div">
            <Carousel> 
             
             {/* map함수로  fileImage state를 [] 순서대로 src에 넣기*/}
              { 
              fileImage.map(function(a){
              return(
                  <Carousel.Item>
                  {(a) && (<img
                  className="d-block w-100 edit_img_size"
                  src={a}
                  alt="First slide"
                  />)}
                  </Carousel.Item>
                  )}
              )
              }
          </Carousel>
          </div>
        </div>
      </form>
    </> 
  ); 
}

export default withRouter(Main_Edit_File);

// 파일 업로드 엑시오스 작성 한 뒤
// 비밀번호 찾기 인증 페이지 처럼 삼항연산자를 통해 제출에 성공하면 card div가 생성 되도록 작성??


