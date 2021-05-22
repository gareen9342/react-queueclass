import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Reset } from "styled-reset";
import Container from "@material-ui/core/Container";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserContext from "./components/UserContext";

/**
 * 1. 서버에서 html + data 매번 호출힐 때 완전한 페이지 ( HTML문서 )를 서버로 전달받는 게 스프링
 * 근데 리액트는 빈 html을 자바스크립트로 유저와 상호작용을 통해 그 떄마다 필요한 로직을 통해 바꿔주는 식인데
 * 먼저 컴포넌트를 호출하게 되면 컴포넌트가 html로 올라감
 */
function App(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  //====== 로그인, 로그아웃 함수 =======//
  const signUserIn = (userData, token) => {
    console.log("signUserIn 함수 호출됨");
    let user = JSON.stringify(userData);
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
    //원래 쿠키에도 세팅을 해줘서 기간도 세팅해주는 게 베스트이긴해요
    setUser(userData);
    props.history.push("/");
  };

  const signUserOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const checkUserStatus = () => {
    if (!localStorage.getItem("user")) {
    }
  };
  return (
    <UserContext.Provider
      value={{ user, signUserIn, signUserOut, checkUserStatus }}
    >
      <BrowserRouter>
        <Reset />
        <Container maxWidth="sm">
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
          </Switch>
        </Container>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
