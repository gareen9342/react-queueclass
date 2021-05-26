import React from "react";
import Dropzone from "react-dropzone";
import postService from "../service/postservice";

function FileUpload({ image, setImage }) {
  const handleDrop = async (files) => {
    try {
      const { data } = await postService.uploadImage(files[0]);
      if (data.success) {
        setImage(data.filePath);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const onClickImage = (src) => {
    if (image === src) {
      setImage("");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "200px",
        margin: "30px 0",
      }}
    >
      <div
        style={{
          width: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {image.length > 0 && (
          <img
            style={{ minWidth: "100%", minHeight: "100%" }}
            src={`http://localhost:5000/${image}`}
            alt="card image"
            onClick={() => onClickImage(image)}
          />
        )}
      </div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              width: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              border: "1px solid #eee",
            }}
          >
            <input {...getInputProps()} />
            drop Image
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUpload;
