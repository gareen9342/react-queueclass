import axios from "axios";

const backUrl = "http://localhost:5000/api";
const PostService = () => {};
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

PostService.uploadImage = async (file) => {
  let resData = {};
  let formData = new FormData();
  const config = {
    header: { "content-type": "multipart/formdata" },
  };
  formData.append("file", file);
  try {
    resData = axios.post(`/image`, formData, config);

    console.log(resData);
  } catch (error) {
    console.error(error);
  }
  return resData;
};
export default PostService;
