import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import { Button, TextareaAutosize } from "@material-ui/core";
import PostService from "../service/postservice";
import { useHistory } from "react-router";

function Write() {
  const history = useHistory();
  
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  const onClickUpload = async () => {
    const { data : res } = await PostService.uploadPost(
      localStorage.getItem("token"),
      { image, content }
    );

    if(res.success){
      alert("게시물 업로드에 성공하였습니다. 메인으로 돌아갑니다. ");
      history.push("/");
    }
  };
  return (
    <div>
      <FileUpload image={image} setImage={setImage} />
      
      <TextareaAutosize
        style={{ width: "100%" }}
        rowsMin={10}
        rowsMax={30}
        value={content}
        onChange={onChangeContent}
      />
      <Button onClick={onClickUpload}>submit</Button>
    </div>
  );
}

export default Write;
