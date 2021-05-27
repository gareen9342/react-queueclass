import React, { useContext, useState } from "react";
import FaceIcon from "@material-ui/icons/Face";
import {
  Avatar,
  Button,
  Link,
  Container,
  Typography,
  makeStyles,
  Input,
} from "@material-ui/core";
import userService from "../service/userservice";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#94ecc5",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    border: "1px solid #ddd",

    margin: theme.spacing(1, 0, 1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#7fe8ba",
    color: "#fff",
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © garin ${new Date().getFullYear()}`}
    </Typography>
  );
}

const Signup = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  /*
    리액트는 가상으로 만들어진 돔이라서 id선택자 같은걸로 돔을 선택하려면 추가적으로 useRef라는 개념을 설명해야해서..ㅠ ㅠ
    결국 훅개념을 가지고 왔어요...
  */

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitSignup = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await userService.signUp({ email, password, name });

      if (res.success === true) {
        alert("회원가입에 성공했습니다. 로그인 페이지로 이동합니다. ");
        props.history.push("/login");
      }

      if (res.success === false) {
        setErrorMessage(res.errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Container component="main" onSubmit={onSubmitSignup}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FaceIcon />
          </Avatar>
          <br />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <br />
          <p style={{ color: "red" }}>{errorMessage}</p>
          <br />
          <form>
            <Input
              className={classes.input}
              value={name}
              onChange={onChangeName}
              placeholder="  name"
              fullWidth
              required
              autoFocus
              disableUnderline
            />
            <Input
              className={classes.input}
              value={email}
              onChange={onChangeEmail}
              placeholder="  email"
              fullWidth
              required
              disableUnderline
            />
            <Input
              className={classes.input}
              value={password}
              onChange={onChangePassword}
              placeholder="  password"
              fullWidth
              required
              disableUnderline
            />
            <Button fullWidth type="submit" className={classes.submit}>
              회원가입하기 (유료)
            </Button>
          </form>
        </div>
        <Copyright />
      </Container>
    </>
  );
};

export default Signup;
