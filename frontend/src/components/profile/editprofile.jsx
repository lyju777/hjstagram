import React,{useState, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import Modal_EditProfile from "./modal_editprofile";
import requestAxios from '../../api/requestAxios';

function EditProfile(props){

    let [Profile,setProfile ] = useState("img/default_profile.png");

    const [Username, setUsername] = useState("")  // state에 데이터바인딩할 response값 담아서 뿌리기
    const [TitleUsername, setTitleUsername] = useState("")  // state에 데이터바인딩할 response값 담아서 뿌리기
    const [Name, setName] = useState("")
    const [Introment, setIntroment] = useState("")

    // 유효성 메세지 state
    const[UserNameMsg, setUserNameMsg] = useState("")

    // react는 input에 value값을 지정하면 입력이 불가능, handler만들어서 onChange로 설정해줘야함
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onUserNameHandler = (event) => {
        setUsername(event.currentTarget.value)
    }

    const onIntroductionHandler = (event) => {
        setIntroment(event.currentTarget.value)
    }
    

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 페이지 새로고침 방지
    }

       // 아이디 유효성 검사
       const checkUserName = (e) => {
        requestAxios.post('/api/auth/idCheck', {username:Username})
        .then(response => {           
            if(response.data.username){
                console.log("1=" + response.data.username);
                setUserNameMsg('이미 존재하는 사용자이름입니다.')
            }else{
                setUserNameMsg('') // 정규식이 맞다면 ''공백으로 처리
            }
        }) 
    //  2 ~ 10자 한글, 영문, 숫자 조합
    var regExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{2,10}$/;
    // 형식에 맞는 경우 true 리턴
    if(!regExp.test(e.target.value)){
        setUserNameMsg('사용자이름은 한글, 영문, 숫자만 가능하며 2-10자리 가능합니다')
    }else{
        setUserNameMsg('') // 정규식이 맞다면 ''공백으로 처리
    }
}

    let id = ""

    // DB에서 가져온값 바로 setState 해주고 바로 서버에서 전달
    // state 두개만들 필요 없음
    let body = {
        name:Name,
        username:Username,
        introment:Introment
    }
  
    // DB값은 수정됬고 /main으로 넘어가는거도 에러없이 성공했는데 바인딩이 실패했다 무엇일까??
    const onClickHandler = () => {  // 특정 값 필요할시 Handler에 엑시오스 2개 묶어서 사용해야함 
  
        requestAxios.get('/api/auth/check')
      .then(response => {

        id = response.data._id

        requestAxios.patch(`api/posts/editusername`, {username:Username})
        .then(response => {
            console.log("이름 수정 성공!")
        })

        requestAxios.patch(`/api/auth/edit/${id}`, body)
        .then(response => {
          console.log(response.data);
          props.history.push("/profile")
        
      })
      })
    }

    let [modal , modal_change] = useState(false);

    const closeModal = () => {
        modal_change(false);
      }


    useEffect(() => {
        requestAxios.get('/api/auth/check')
        // 데이터 두개 여러개 가져올때는 , 써서 연속으로 써준다
        .then(response =>  {
         setUsername(response.data.username)
         setName(response.data.name)
         setIntroment(response.data.introment)
         setTitleUsername(response.data.username)
         setProfile(response.data.profileurl)
         }

    )}, []);


    const username = <div className="profile_username editprofile_username">{TitleUsername}</div>;

    const main_profileImage = <div className="closefriends_profileImage_box editprofile_profileImage_box">
    <img className="profile_profileImage" src={Profile} /></div>

    return(
        <>
        <div className="auth-wrapper">
        <div className="auth-inner editprofile_div">
    
        <div className="profile_profile_div editprofile_profile_div"> 
        <div className="profile_profile editprofile_profile"> 
        {main_profileImage}{username}
        </div>
        </div>
    
        <form onClick={onSubmitHandler}>
       
    
            <div className="form-group editprofile_form">
                <label className="editprofile_label">이름</label>
                <input type="text" className="form-control" placeholder="이름"
                value={Name} onChange={onNameHandler} />
            </div>
    
            <div className="form-group editprofile_form">
                <label className="editprofile_label">사용자이름</label>
                <input type="text" className="form-control" placeholder="사용자이름"
                value={Username} onChange={onUserNameHandler} onBlur={checkUserName}/>
            </div>
                <p className="Msg2">{UserNameMsg}</p>
    
            <div className="form-group editprofile_form">
                <label className="editprofile_label">소개</label>
                <textarea type="text" className="form-control changepassword_textarea"
                value={Introment} onChange={onIntroductionHandler}/>
            </div>
    
        
    
            <div className="form-group">
        
            </div>
    
                <button type="submit" className="btn btn-primary editprofile_btn"
                onClick={onClickHandler}>제출</button> 
    
            <p className=" text-right editprofile_forgot_password" onClick={()=>{modal_change(true)}}>
                 <Link>회원탈퇴 하시겠습니까?</Link>
            </p>
            
        </form>
    </div>
    </div>

    {
    modal === true
    ? <Modal_EditProfile closeModal={closeModal}/>
    : null
    }
    
</>
    )
}

export default withRouter(EditProfile);