import axios from "axios";

const backUrl = "http://localhost:5000/api";
const UserService = () => {};
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

//=========== 여기서 부터 하나씩 모듈 함수를 만들어 넣어줄 것 =========//

// 회원가입
UserService.signUp = async (data) => {
  let resData = {};
  try {
    const res = await axios.post(`/user`, data);
    resData = res;
  } catch (error) {
    console.error(error);
  }
  return resData;
};

//로그인
UserService.signIn = async (data) => {
  let resData = {};
  try {
    resData = await axios.post(`/login`, data);
  } catch (err) {
    console.error(err);
  }
  return resData;
};
export default UserService;
