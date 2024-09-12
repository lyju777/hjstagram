import React, {useState, useEffect} from "react";
import requestAxios from '../../api/requestAxios';
import { withRouter } from "react-router-dom";
import { MoonLoader  } from "react-spinners";



function Other_Profile_Post(match){

    const [loading, setLoading] = useState(true);
    let [modal , modal_change] = useState(false);
    const [Posts, setPosts] = useState([]);

    const PostsArr = [];
    const [ID, setID] = useState("");

    const saveIDandModal = (id) => {
      setID(id);
      modal_change(true);
    };

    const{id} = match;

    useEffect(() => {
        const fetchData = async ()=> {
            try{
            const response = await  requestAxios.get(`/api/auth/${id}`)
                    const logusername = response.data.username;
                    await  requestAxios.get(`/api/posts?username=${logusername}`)
                    .then(response => {
                        for(let i=0; i<response.data.length; i++){
                            PostsArr[i] = response.data[i];
                            setPosts([...PostsArr]);
                        }
                    })
            }catch(e){
                console.error(e);
            }finally{
                setLoading(false);
            }
        }

        fetchData();
    },[]);

    if (loading) {
        return (
          <div className="loading_spinner" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
            <MoonLoader size={40}  color="#308fff" animation="border" role="status">
            </MoonLoader >
          </div>
        );
      }

    return(
        <>
        <hr className="profile_hr"></hr>

    
        <div className="profile_div_box">


{
    Posts && Posts.map((a,index) => {
        return(
            <div className="profile_div_imgbox" key={index}>
            <img className="profile_div_img" alt="" src={a.fileurls[0]} onClick={()=>{saveIDandModal(a._id)}}/>
            </div>
        )
    })
}
        </div>
      </>
    )
}

export default withRouter(Other_Profile_Post);