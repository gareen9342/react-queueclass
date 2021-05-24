import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import { Button, TextareaAutosize } from "@material-ui/core";
import PostService from "../service/postservice";

function Write() {
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log();
  }, []);
  const onClickUpload = async () => {
    // console.log(localStorage.getItem("token"))
    const { data } = await PostService.uploadPost(
      localStorage.getItem("token"),
       { image: "image", content: "content", token:   localStorage.getItem("token")}
     );
  };
  return (
    <div>
      <FileUpload image={image} setImage={setImage} />
      {console.log(image)}
      <TextareaAutosize
        style={{ width: "100%" }}
        rowsMin={10}
        rowsMax={30}
        value={content}
      />
      <Button onClick={onClickUpload}>submit</Button>
    </div>
  );
}

export default Write;
