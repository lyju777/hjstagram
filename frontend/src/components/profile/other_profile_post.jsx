import React, {useState, useEffect} from "react";
import Modal_Delete_Posts from "./modal_delete_posts";
import requestAxios from '../../api/requestAxios';
import { withRouter, useHistory } from "react-router-dom";




function Other_Profile_Post(match){

    const [Posts, setPosts] = useState([]);

    const PostsArr = [];
    const [ID, setID] = useState("");

    const saveIDandModal = (id) => {
      setID(id);
      modal_change(true);
      console.log(ID);
    };

    const{id} = match;

    useEffect(() => {
        requestAxios.get(`/api/auth/${id}`)
        .then(response => {
            console.log("로그인한 사람 username : "+response.data.username);
            const logusername = response.data.username;
            requestAxios.get(`/api/posts?username=${logusername}`)
            .then(response => {
                console.log(response);
              
                for(let i=0; i<response.data.length; i++){
                    console.log(response.data[i].fileurls[0]);

                    PostsArr[i] = response.data[i];
                    setPosts([...PostsArr]);
                }
            })
        })
    },[]);



    const deletePost = (ID) => {
        requestAxios.delete(`/api/posts/${ID}`)
        .then(response => {
            console.log("삭제됨!");

            requestAxios.patch('/api/auth/removePost')
            .then(res => {
                console.log("게시물 -1");
                window.location.reload();
            })
        })
    }
    


    let [modal , modal_change] = useState(false);

    const closeModal = () => {
        modal_change(false);
      }

    return(
        <>
        <hr className="profile_hr"></hr>

    
        <div className="profile_div_box">


{
    Posts && Posts.map((a) => {
        return(
            <div className="profile_div_imgbox">
            <img className="profile_div_img" src={a.fileurls[0]} onClick={()=>{saveIDandModal(a._id)}}/>
            </div>
        )
    })
}

        </div>
      </>
    )
}

export default withRouter(Other_Profile_Post);