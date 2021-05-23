import React, { useEffect, useState, useContext } from "react";
import UserContext from "../components/UserContext";
import { Link } from "react-router-dom";
import {
  AppBar,
  ClickAwayListener,
  Toolbar,
  Popper,
  Paper,
  Button,
  MenuItem,
  MenuList,
  makeStyles,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
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

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef();
  const prevOpen = React.useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const onClickLogout = () => {
    signUserOut();
  };
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Link to="/" className={classes.homeLink}>
          <HomeIcon />
        </Link>
        {console.log(isLoggedIn)}
        {isLoggedIn ? (
          <div>
            <Button
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              style={{ color: "#fff" }}
            >
              Menu
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              transition
              disablePortal
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    className={classes.menuList}
                  >
                    <MenuItem>write</MenuItem>
                    <MenuItem onClick={onClickLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Popper>
          </div>
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
