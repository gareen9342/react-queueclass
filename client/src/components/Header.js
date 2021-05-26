import React, { useContext } from "react";
import UserContext from "../components/UserContext";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import Dropdown from './Dropdown';
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#aaf0d1",
  },
  homeLink: {
    flexGrow: 1,
    color: "#fff",
    marginRight: theme.spacing(2),
  },
  menuList: {
    color: "#666",
  },
}));

function Header() {
  const classes = useStyles();
  const { isLoggedIn, signUserOut } = useContext(UserContext);
  const history = useHistory();


  const onClickLogout = () => {
    signUserOut();
  };

  const menuList = [
    {
      id : 1,
      menuName : "글쓰기",
      onClickMenu : () => history.push("/write")
    },
    {
      id : 2,
      menuName : "로그아웃",
      onClickMenu : onClickLogout
    }
  ];

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Link to="/" className={classes.homeLink}>
          <HomeIcon />
        </Link>
        {isLoggedIn ? (
          <Dropdown
          buttonText={"메뉴"}
          menus={menuList}
          />
        ) : (
          <div>
            <MenuItem>
              <Link to="/login" style={{ color: "#fff" }}>
                login
              </Link>
            </MenuItem>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
