import React, { useEffect, useState } from "react";
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
    // display: "flex",

    background: "orange",
  },
  homeLink: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));
function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Link to="/" className={classes.homeLink} edge="start">
          <HomeIcon />
        </Link>
        {isLoggedIn ? (
          <div>
            <Button
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              Toggle Menu Grow
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow">
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Popper>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose}>
              <Link to="/login">login</Link>
            </MenuItem>
          </div>
        )}
      </Toolbar>

      {/* 
        <Link to="/signup">signup</Link> */}
    </AppBar>
  );
}

export default Header;
