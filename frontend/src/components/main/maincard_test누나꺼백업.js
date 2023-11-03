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

    let [heart, heart_change] = useState([false]);

    let [heartNum, setHeartNum] = useState([]);

    let [IsLike, setIsLike] = useState([]); // 이걸로 맵돌려야할듯?



    let [zzim, zzim_change] = useState(false);
    
    let [comment , comment_change] = useState(false);

    // 서버에 보내고자 하는 값들을 state에서 가지고 있는것
    const[comments, setcomments] = useState("")

    // ID값 담을  state
    const [ID, setID] = useState("");

    const saveID = (id) => {
      setID(id);
      console.log(ID);
    };

    const onCommentsHandler = (event) => {
      setcomments(event.currentTarget.value);
    }
  
    const closeModal = () => {
      modal_change(false);
    }
    
    const closezzim = () => {
      zzim_change(!zzim);
    }

    const closecomment = () => {
      comment_change(!comment);
    }

    // state에 데이터바인딩할 response값 담아서 뿌리기
    const [DataUsername, setDataUsername] = useState([])  
    const [Contents, setContents] = useState([])
    const [FileImg, setFileImg] = useState([[]])
    const [CommentArray, setCommentArray] = useState([]);
    const [UsernameArray, setUsernameArray] = useState([]);
    
    
    // 빈 배열 따로 만들어서 response.data[i] 담아줘야 배열에 하나씩 담겨짐
    const post =[]; // contents
    const user = []; // username
    const file = []; // file
    const LikeBy = [];
    const HeartNum = [];

    let likePost = [];
    
    const CommentsArr = [];
    const UserNameArr = [];
    const commentArr = [];

    // ID값 담을 빈 배열
    let id = [];
   

      useEffect(() => {
        axios.get('/api/posts')
        .then(response => {
          for(let i = 0; i < response.data.length; i += 1){  
            post[i] = response.data[i]
            user[i] = response.data[i].user.username;
            file[i] = response.data[i].fileurls;
            commentArr[i] = response.data[i].commentArr; //댓글내용
            LikeBy[i] = response.data[i].likeby; // 좋아요 누른사람

            likePost[i] = false;

            HeartNum[i] = response.data[i].like;
            setHeartNum([...HeartNum]);
            console.log([...HeartNum]);

            id[i] = response.data[i]._id;          

            setContents(post);
            setDataUsername(user);
            setCommentArray([...commentArr]);
            setUsernameArray(...UserNameArr);

            setFileImg([...file]); // file을 setFileImg하면 게시물이 하나만 나옴


        // 내가 좋아요 누른 게시물 
        axios.get('api/auth/check') 
        .then(response => {

         const name = response.data.username;

          for(let j = 0; j < LikeBy[i].length; j++){

              if(name === LikeBy[i][j]){ // 로그인한 사람이랑 좋아요 누른사람이 같다면
      
                likePost[i] = true
                
              }else{
                likePost[i] = false
                
              }
             
              console.log(heart);
          }
          heart_change(likePost);
        })
      }
  }); 

      axios.get(`/api/comments/commentslist?id=${ID}`)
      .then(response => {

        console.log(response);

        for(let i = 0; i < response.data.length; i++){

          UserNameArr[i] = response.data[i].user.username;
          CommentsArr[i] = response.data[i].content;

        }
      })  

        // //좋아요 axios
        // axios.get(`api/posts`)
        // .then(response => {
        // console.log(response);
        // })
    
    }, []);

     // 좋아요 하기
     const On_Heart = (ID) => {

      console.log("아이디값: " + ID)

      axios.patch(`/api/posts/${ID}/likeby`)
      .then(response => {
        const likebycheck = response.data.likeby;
        console.log(likebycheck); //[apple]
    
        axios.patch(`/api/posts/${ID}/addlike`)
        .then(res => {
          console.log(res);
          //window.location.reload(); //댓글 새로고침없이 페이지 갱신
        })
      })

      // 여기서 useEffect 에서 했던거 똑같이 해주어야 한다 . 전체 post get 하는 axios 안에 check get 액시오스..!
     
    }



    // 좋아요 취소
     const Off_Heart = (ID) => {

      console.log("아이디값: " + ID)

      axios.patch(`/api/posts/${ID}/cancleLikeby`)
      .then(response => {
        console.log(response);

        axios.patch(`/api/posts/${ID}/canclelike`)
        .then(response => {
          console.log(response);
          window.location.reload(); 
     
        })
      })
      heart_change(false);
    }



   




      // 댓글 포스트 핸들러 
      async function onSubmitHandler(e){
          e.preventDefault(); // 페이지 새로고침 방지

            axios.post(`/api/comments/${ID}`,{content:comments})
            .then(response => {
              setcomments(response.data.content);
              console.log(response);
              
              axios.patch(`api/posts/${ID}/givecomment`, {content:comments})
              .then(response =>{

                window.location.reload(); //댓글 새로고침없이 페이지 갱신
              })
            
            }) 
      }


      const main_profileImage = <div className="main_profileImage_box main_cardprofileImage_box">
      <img className="main_profileImage" src="img/pizza.jpg" /></div>

      return(
      <>    

  { // Contents 배열에 담긴 갯수 기준으로 반복문 돌려서 card retrun해주고 i로 매개변수 따로 만들어줘서
    // 데이터 바인딩 할 곳에 배열 [i]로 뿌려줘야함
    Contents.map(function(a,i){
        return(

        <div style={{ width: '40rem' }} className="main_card" key={a._id}>

          <div className="main_profile_div">
            <div className="main_profile">
              <div className="profile_div">{main_profileImage}
                    <div className="main_username">{DataUsername[i]}</div>
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

             {/* {
              isLike[i] && isLike[i].map((a) => {
                  return(
                    heart[i] === false
                ?  <img className="main_herat_off" src="img/main_heart_off.png"
                    onClick={() => On_Heart(a._id, () => {})}/>
  
                : <img className="main_herat_off" src="img/main_heart_on.png"
                    onClick={() => Off_Heart(a._id,() => {})}/>
                  )
              })    
            }  */}

              {                   // 개시물을 올리면 처음꺼만 정상작동되고 나머지는 false로 들어가는거보니
              heart[i] === false  // 아무래도  heart[i] 배열에 안담겨서 이리 뜨는듯 
              ?  <img className="main_herat_off" src="img/main_heart_off.png"
                  onClick={() => On_Heart(a._id, () => {})}/>

              : <img className="main_herat_off" src="img/main_heart_on.png"
                  onClick={() => Off_Heart(a._id,() => {})}/>
              } 


              <img className="main_chat" src="img/main_chat.png" onClick={() => {comment_change(true)}}/>






              {/* 찜을 클릭하면 찜이사라지고 채워진 찜이 생성 */}
              {
              zzim === false
              ?<Zzim_off closezzim={closezzim} saveID={saveID}/>
              :<Zzim_on  closezzim={closezzim} saveID={saveID}/>
              } 
              </div>



              {/* {
              heartNum && heartNum.map((Num) => {
                return(
                  <div className="like_div">좋아요{Num}</div>
                )
              })
              } */}

        
                  <div className="like_div">좋아요 {heartNum[i]}개</div>
     

            <div className="contents_div" key={i}>{a.contents}</div>
        

        
            
            {CommentArray[i] && CommentArray[i].map((value,j)=>(
            <div className="contents_div_username">{a.usernameArr[j]}<span className="contents_div_username_span">{value}</span>
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