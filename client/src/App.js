import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Reset } from "styled-reset";
import Container from "@material-ui/core/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserContext from "./components/UserContext";
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
          {/* <Footer /> */}
        </Container>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
