import React, { useState } from "react";
import Dropzone from "react-dropzone";
import postService from "../service/postservice";

function FileUpload(props) {
  const [image, setImage] = useState("");
  const handleDrop = async (files) => {
    try {
      const { data } = await postService.uploadImage(files[0]);
      if (data.success) {
        setImage(data.filePath);
        console.log(data.filePath);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {image}
      {image.length > 0 && <img src={`http://localhost:5000/${image}`} />}
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
            }}
          >
            <input {...getInputProps()} />
            dropzone
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUpload;
