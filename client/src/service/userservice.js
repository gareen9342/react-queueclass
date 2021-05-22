import axios from "axios";

const UserService = () => {};

//=========== 여기서 부터 하나씩 모듈 함수를 만들어 넣어줄 것 =========//

// 회원가입
UserService.signUp = async (data) => {
  let resData = {};
  try {
    const res = await axios.post("http://localhost:5000/api/user", data, {
      withCredentials: true,
    });
    console.log(res);
    resData = res;
  } catch (error) {
    console.error(error);
    resData = { result: false };
  }
  return resData;
};

export default UserService;
