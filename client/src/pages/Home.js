import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import PostService from "../service/postservice";
function Home() {
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
  }, []);
  return <Container component="main">
    {posts && posts.length > 0 && posts.map(x => 
      <div key={x._id}>
        <div><img src={`http://localhost:5000/${x.image}`}/> </div>
        <div><p>{x.content}</p></div>
        <div>writer name : <b>{x.writer.name}</b></div>
        <br/><br/>
      </div>)}
    </Container>;
}

export default Home;
