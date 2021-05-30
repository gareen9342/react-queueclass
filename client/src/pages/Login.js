import { useContext, useState } from "react";
import UserContext from "../components/UserContext";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router";
import UserService from "../service/userservice";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © garin ${new Date().getFullYear()}`}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function Login() {
  const classes = useStyles();
  
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { signUserIn } = useContext(UserContext);
  
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const { data } = await UserService.signIn({ email, password });

      if (data.success) {
        signUserIn(data.user, data.token);
        history.push("/");
      } else {
        setErrorMessage(data.errorMessage);
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <form className={classes.form} onSubmit={onSubmitLogin}>
          <TextField
            required
            fullWidth
            name="email"
            label="email"
            autoComplete="email"
            autoFocus
            onChange={onChangeEmail}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChangePassword}
          />
          <Button type="submit" fullWidth className={classes.submit}>
            로그인 하기
          </Button>
          <Link href="/signup" variant="body2">
            계정이 없으신가요? 회원가입 하러 가기
          </Link>
        </form>
      </div>
      <Copyright />
    </Container>
  );
}

export default Login;
