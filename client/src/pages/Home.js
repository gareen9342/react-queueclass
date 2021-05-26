import React, { useEffect, useState, useContext } from "react";
import Container from "@material-ui/core/Container";
import PostService from "../service/postservice";
import UserContext from '../components/UserContext';

function Home() {
  const {user} = useContext(UserContext);
  const [posts, setPosts]= useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const { data : res } = await PostService.getPosts(localStorage.getItem("token"));
        if(res.success){
          setPosts(res.data);
        }
      }catch(err){
        console.log(err);
      }
    }

    if(loading){
      fetchData();
    }
    return () => { if(loading) {setLoading(false)}}
  }, [loading]);
  
  const onClickDelete = async (id) => {
    try {
      const res = await PostService.deletePost(localStorage.getItem("token"), id);
      
      if(res.data.success){
        alert("게시물 삭제에 성공했습니다. ");
        setPosts(posts.filter(x=>x._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  }
  return <Container component="main">
    {posts && posts.length > 0 && posts.map(x => 
      <div key={x._id}>{console.log(user._id)}
        <div><img src={`http://localhost:5000/${x.image}`}/> </div>
        <div><p>{x.content}</p></div>
        <div>writer name : <b>{x.writer.name}</b>&nbsp; 
        {user._id === x.writer._id &&
          <button onClick={() => onClickDelete(x._id)}>delete This Post</button>
        }
        </div>
        <br/><br/>
      </div>)}
    </Container>;
}

export default Home;
