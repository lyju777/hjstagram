import React, {useState, useEffect} from "react";
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Modal_main_point from "./modal_main_point";
import Heart_off from "../common/heart_off";
import Heart_on from "../common/heart_on";
import Zzim_off from "../common/zzim.off";
import Zzim_on from "../common/zzim.on";
import Modal_Main_Comments from "./modal_main_comments";
import axios from "axios";
import { Carousel } from 'react-bootstrap';
import { withRouter } from "react-router-dom";


function MainCard(props) {

    let [modal , modal_change] = useState(false);
    let [heart, heart_change] = useState(false);
    let [zzim, zzim_change] = useState(false);
    let [comment , comment_change] = useState(false);

    // 서버에 보내고자 하는 값들을 state에서 가지고 있는것
    const[comments, setcomments] = useState("")

    // DB에서 가져올 댓글, 사용자아이디
    const[DBComments, setDBComments] = useState([])
    const[DBuserName, setDBuserName] = useState([])

    const [ID, setID] = useState("");

    const saveID = (id) => {
      setID(id);
      console.log(id);
    };


    const onCommentsHandler = (event) => {
      setcomments(event.currentTarget.value);
    }

    const closeModal = () => {
      modal_change(false);
    }
    
    const closeheart = () => {
      heart_change(!heart);
    }

    const closezzim = () => {
      zzim_change(!zzim);
    }

    const closecomment = () => {
      comment_change(!comment);
    }

    const [Contents, setContents] = useState([])
    const [FileImg, setFileImg] = useState([[]])
    const [commentArray, setCommentArray] = useState([]);
    
    // 빈 배열 따로 만들어서 response.data[i] 담아줘야 배열에 하나씩 담겨짐
    const post =[]; // contents
    const file = []; // file
    const commentArr = [];

      let id = [];

      useEffect(() => {
        axios.get('/api/posts')
        .then(response => {
          for(let i = 0; i < response.data.length; i += 1){  
            post[i] = response.data[i];
            file[i] = response.data[i].fileurls;
            commentArr[i] = response.data[i].commentArr;
            id[i] = response.data[i]._id;
            console.log("id"+id);
            console.log(file);
            console.log(post);

            setContents(post);
            setFileImg([...file]); // file을 setFileImg하면 게시물이 하나만 나옴
            setCommentArray([...commentArr]);
            console.log([...file]);

            // axios.get(`/api/comments/commentslist?id=${id[i]}`)
            // .then(response => {
            //     console.log("ID 정보")
            //     console.log(response);
            //     setDBuserName(response.data.user.username);
            // })
          }
      }); 
    }, []);

    console.log(Contents);

    // const[DBComments, setDBComments] = useState([])
    // const[DBuserName,

    const CommentsArr = [];
    const UserNameArr = [];
    //let commentArray = props.commentArray;
    
    // 댓글 게시했을 때!  
    const onSubmitHandler = (e) => {
       e.preventDefault(); // 페이지 새로고침 방지
          axios.post(`/api/comments/${ID}`,{content:comments})
          .then(response => {
              console.log("ID : " + ID);
              // setDBuserName(response.data.user.username);
              console.log(commentArray);

              console.log(response);

              axios.patch(`api/posts/${ID}/givecomment`, {content:comments})
              .then(response =>{
                console.log("됬니?");
                console.log(response);
                setcomments("");
                props.history.push('/main')
              })

          })     
    }
    
      const main_profileImage = <div className="main_profileImage_box main_cardprofileImage_box">
      <img className="main_profileImage" src="img/pizza.jpg" /></div>

      return(
      <>    

  { // Contents 배열에 담긴 갯수 기준으로 반복문 돌려서 card retrun해주고 i로 매개변수 따로 만들어줘서
    // 데이터 바인딩 할 곳에 배열 [i]로 뿌려줘야함
    Contents && Contents.map(function(a,i){
        return(

        <div style={{ height: '50rem', width: '40rem' }} className="main_card" key={a._id}>

          <div className="main_profile_div">
            <div className="main_profile">
              <div className="profile_div">{main_profileImage}
                    <div className="main_username">{a.user.username}</div>
              </div>
              <div className="main_Point_div" onClick={() => { modal_change(true) } }>
                <img className="main_Point" src="img/main_Point.png"/>
              </div>
            </div>
          </div>

          <Carousel> 
          {

            // [[],[],[]] 으로 뽑으려면 && 연산자 활용
            FileImg[i] && FileImg[i].map((j) => {
                  return(
                    <Carousel.Item>
                    <Card.Img variant="top" src={j} className="edit_img_size_card"/>
                    </Carousel.Item>
                  )
                })
          }
          </Carousel>
          <ListGroup className="list-group-flush">
         
            <ListGroupItem>
              <div>

              {
              heart === false
              ?<Heart_off closeheart={closeheart}/>
              :<Heart_on  closeheart={closeheart}/>
              } 

              <img className="main_chat" src="img/main_chat.png" onClick={() => {comment_change(true)}}/>

              {/* 찜을 클릭하면 찜이사라지고 채워진 찜이 생성 */}
              {
              zzim === false
              ?<Zzim_off closezzim={closezzim}/>
              :<Zzim_on  closezzim={closezzim}/>
              } 
              </div>

                      <div className="like_div">좋아요1</div>
                      <div className="contents_div">{a.contents}</div>

                      {commentArray[i] && commentArray[i].map((value)=>(
                      <div className="contents_div_username">
                        {DBuserName}<span className="contents_div_username_span">{value}</span>
                      </div>
                      ))}
    
    
            </ListGroupItem>

            <ListGroupItem style={{ paddingBottom: '13px' }}>

            <form className="main_card_textarea" onSubmit={onSubmitHandler} onChange={()=> saveID(a._id)}>
            <img className="main_smile" src="img/smile.png"/>
                                                                                                                                            
            <input type="text" className="main_card_textarea" name="w3review" autoComplete="off" rows="1" cols="80" placeholder="댓글달기..."  onChange={onCommentsHandler}>
            </input>

            <button className="main_card_textarea_button">게시</button>
            </form>

          </ListGroupItem> 
        </ListGroup>
      </div>
              )
            })
          }
        

        {
        modal === true
        ? <Modal_main_point closeModal={closeModal}/>
        : null
        }

        {
        comment === true
        ? <Modal_Main_Comments closecomment={closecomment}/>
        : null
        }


    </>
      
      )
}

export default withRouter(MainCard);