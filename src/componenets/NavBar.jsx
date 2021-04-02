import {
  AppBar,
  IconButton,
  Container,
  Toolbar,
  Typography,
  Grid,
  Button,
  MenuItem,
  Menu,
} from "@material-ui/core";
import React, { useState } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { useHistory } from "react-router-dom";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PeopleIcon from "@material-ui/icons/People";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";

const NavBar = () => {
  const history = useHistory();
  const [path, setPath] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const goHome = () => {
    history.push("/");
    setPath("/");
  };
  const addPost = () => {
    history.push("/addpost");
    setPath("/addpost");
  };
  const addfriend = () => {
    history.push("/addfriend");
    setPath("/addfriend");
  };
  const goProfile = () => {
    history.push("/profile");
    setPath("/profile");
    setAnchorEl(null);
  };
  const myfriendsposts = () => {
    history.push("/myfriendsposts");
    setPath("/myfriendsposts");
  };
  const friendrequest = () => {
    history.push("/friendrequest");
    setPath("/friendrequest");
  };
  const logOutNow = async () => {
    window.localStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <Container style={{ marginTop: "65px" }}>
        <AppBar>
          <Toolbar>
            <Grid container style={{ flexGrow: 1 }}>
              <Grid style={{ cursor: "pointer" }} onClick={goHome} item>
                <Typography variant="h4">THEWALL</Typography>
              </Grid>

              <Grid item>
                <IconButton
                  onClick={myfriendsposts}
                  style={{
                    color: "white",
                    backgroundColor: path === "/myfriendsposts" && "red",
                  }}
                >
                  <DynamicFeedIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={addfriend}
                  style={{
                    color: "white",
                    backgroundColor: path === "/addfriend" && "red",
                  }}
                >
                  <PeopleIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={friendrequest}
                  style={{
                    color: "white",
                    backgroundColor: path === "/friendrequest" && "red",
                  }}
                >
                  <GroupAddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <IconButton
              style={{
                color: "white",
                backgroundColor: path === "/addpost" && "red",
              }}
              onClick={() => addPost()}
            >
              <PostAddIcon />
            </IconButton>
            <IconButton
              onClick={openMenu}
              style={{
                color: "white",
                backgroundColor: path === "/profile" && "red",
              }}
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Container>
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => goProfile()}>Profile</MenuItem>
        <MenuItem onClick={logOutNow}> LogOut </MenuItem>
      </Menu>
    </>
  );
};

export default NavBar;
