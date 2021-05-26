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

PostService.uploadPost = async (token, data) => {
  let resData = {};
  const config = {
    headers: {'Authorization': `Bearer ${token}`},
  };
  try {
    resData = axios.post(`/post`, data, config);

    console.log(resData);
  } catch (error) {
    console.error(error);
  }
  return resData;
};

PostService.getPosts = async (token) => {
  let resData = {};
  const config = {
    headers: {'Authorization': `Bearer ${token}`},
  };
  try {
    resData = await axios.get(`/posts`,config);
  } catch (error) {
    console.error(error);
  }
  return resData;
}

PostService.deletePost = async (token, id) => {
  let resData = {};
  const config = {
    headers: {'Authorization': `Bearer ${token}`},
  };
  try {
    resData = await axios.delete(`/post?id=${id}`,config);
  } catch (error) {
    console.error(error);
  }
  return resData;
}
export default PostService;
