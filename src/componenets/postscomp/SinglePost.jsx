import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  ClickAwayListener,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SendIcon from "@material-ui/icons/Send";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SingleComment from "../postscomp/SingleComment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentIcon from "@material-ui/icons/Comment";
import Axios from "axios";
import { domain, headerPost } from "../../env";
import { useStateValue } from "../../state/stateProvider";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
  button: {
    // position: "relative",
  },
  dropdown: {
    // position: "absolute",
    position: "fixed",
    width: 200,
    top: "40%",
    left: "40%",
    transform: "translate(-40%, -40%)",
    border: "1px solid",

    zIndex: 19999999999999,
    padding: "10px",
    // backgroundColor: "#595555",
    display: "flex",
    flexDirection: "column",
  },
  sbutton: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#595555",
    "&:hover": {
      backgroundColor: "#717171",
    },
  },
});

const SinglePost = ({ item, fulldata = false }) => {
  const classes = useStyle();
  const [{ profile }, dispatch] = useStateValue();
  const [showComment, setShowComment] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  const [commenttext, setCommenttext] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const showmenu = () => {
    setOpen(!open);
  };
  const postDetails = () => {
    history.push(`/post/${item.id}`);
  };
  const friendProfile = () => {
    history.push(`/friend/${item?.profile?.id}`);
  };

  const delatePost = async () => {
    await Axios({
      url: `${domain}/api/delatepost/`,
      method: "POST",
      headers: headerPost,
      data: {
        postid: item?.id,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data["error"] == false) {
          dispatch({
            type: "RELOAE",
            value: response.data,
          });
          alert("Your Post is Delated!!");
          setOpen(false);
          history.push("/");
        } else {
          alert("Something is Wrong, Try Again!");
        }
      })
      .catch((_) => {
        alert("Something is Wrong, Try Again!");
      });
  };

  const addLike = async () => {
    // alert(item?.id);
    await Axios({
      url: `${domain}/api/addlike/`,
      method: "POST",
      headers: headerPost,
      data: {
        id: item?.id,
      },
    })
      .then((response) => {
        let data = response.data;
        console.log(data);
        if (data["error"] === false) {
          dispatch({
            type: "RELOAE",
            value: data,
          });
        } else {
          alert("Something is Wrong, Try Again!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addComment = async () => {
    await Axios({
      url: `${domain}/api/addcomment/`,
      method: "POST",
      headers: headerPost,
      data: {
        postid: item?.id,
        title: commenttext,
      },
    })
      .then((response) => {
        let data = response.data;
        console.log(data);
        if (data["error"] === false) {
          setCommenttext("");
          dispatch({
            type: "RELOAE",
            value: data,
          });
        } else {
          alert("Something is Wrong, Try Again!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editPost = async () => {
    // alert("Edit Post");
    history.push(`/editpost/${item.id}`);
  };
  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <CardHeader
          avatar={<Avatar src={item?.profile?.image} />}
          title={item?.profile?.user?.username}
          subheader={item?.time}
          action={
            <>
              <IconButton className={classes.button} onClick={showmenu}>
                <MoreVertIcon />
              </IconButton>
              {open ? (
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <Card
                    className={classes.dropdown}
                    id="simple-menu"
                    keepMounted
                  >
                    <MenuItem className={classes.sbutton} onClick={postDetails}>
                      View Post
                    </MenuItem>
                    {profile?.id === item?.profile?.id ? (
                      <>
                        <MenuItem
                          className={classes.sbutton}
                          onClick={delatePost}
                        >
                          Delate
                        </MenuItem>
                        <MenuItem
                          className={classes.sbutton}
                          onClick={editPost}
                        >
                          Edit Post
                        </MenuItem>
                      </>
                    ) : (
                      <MenuItem
                        className={classes.sbutton}
                        onClick={friendProfile}
                      >
                        Profile
                      </MenuItem>
                    )}
                  </Card>
                </ClickAwayListener>
              ) : null}
            </>
          }
        />

        <CardActionArea onClick={postDetails}>
          <Typography style={{ padding: "10px" }} variant="h5" component="h2">
            {item?.title}
          </Typography>
        </CardActionArea>
        {item?.image !== null && (
          <CardActionArea onClick={postDetails}>
            <CardMedia
              style={{ height: 0, paddingTop: "56%" }}
              image={item?.image}
            />
          </CardActionArea>
        )}
        {(item?.content !== null ?? item?.content?.length !== 0) && (
          <CardActionArea onClick={postDetails}>
            <CardContent>
              {fulldata ? (
                <Typography>{item?.content}</Typography>
              ) : (
                <Typography>
                  {item?.content?.length > 100
                    ? item?.content?.substring(0, 100)
                    : item?.content}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        )}

        <Grid
          container
          direction="row"
          justify="space-around"
          style={{ padding: "10px" }}
        >
          <Button
            onClick={addLike}
            variant="contained"
            color="primary"
            startIcon={
              item?.like ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <FavoriteBorderIcon color="secondary" />
              )
            }
          >
            Like({item?.totallike})
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CommentIcon />}
            onClick={() => setShowComment(!showComment)}
          >
            Comment({item?.comment?.length})
          </Button>
        </Grid>
        {showComment === true && (
          <Grid style={{ padding: "10px" }} container>
            <TextField
              value={commenttext}
              onChange={(e) => setCommenttext(e.target.value)}
              style={{ width: "100%" }}
              id="filled-basic"
              label="Filled"
              variant="filled"
              InputProps={{
                endAdornment: (
                  <IconButton
                    disabled={commenttext?.length === 0 ? true : false}
                    onClick={addComment}
                    color="primary"
                    component="span"
                  >
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
            <Grid container direction="column">
              {item?.comment?.map((item, i) => (
                <SingleComment key={i} comment={item} />
              ))}
            </Grid>
          </Grid>
        )}
      </Card>
      {/* <Menu
        id="post-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>View</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}> Delate </MenuItem>
      </Menu> */}
    </>
  );
};

export default SinglePost;
