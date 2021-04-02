import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { domain, headerGet, headerPost } from "../env";
import Axios from "axios";
import { useStateValue } from "../state/stateProvider";
import { useHistory, useParams } from "react-router-dom";

const PostEdit = () => {
  const [{ reload }, dispatch] = useStateValue();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const getposts = () => {
      Axios.get(`${domain}/api/posts/${id}/`, {
        method: "GET",
        headers: headerGet,
      })
        .then((response) => {
          let data = response.data[0];
          setTitle(data["title"]);
          setContent(data["content"]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getposts();
  }, [reload]);

  const editPost = async () => {
    let formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    if (image != null) {
      formdata.append("image", image);
    }
    await Axios({
      url: `${domain}/api/posts/${id}/`,
      method: "POST",
      headers: headerPost,
      data: formdata,
    }).then((response) => {
      let responseData = response.data;
      if (responseData["error"] === false) {
        dispatch({
          type: "RELOAE",
          value: responseData,
        });
        history.push("/");
      } else {
        alert("Somthing is Wrong! Try Agane.");
      }
    });
  };
  return (
    <Container>
      <Typography
        component="div"
        style={{ padding: "20px" }}
        align="center"
        variant="h3"
      >
        Add A New Post
      </Typography>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item sm={12} xs={12} md={6}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            id="standard-full-width"
            label="Title"
            style={{ margin: 8 }}
            placeholder="Wright Title Under 100 characters"
            helperText="Wright Title Under 100 characters"
            fullWidth
            margin="normal"
            value={title}
          />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
          <TextField
            onChange={(e) => setContent(e.target.value)}
            id="standard-full-width"
            label="Contents"
            style={{ margin: 8 }}
            placeholder="Write your Contents.."
            helperText="Write your Contents.."
            fullWidth
            margin="normal"
            value={content}
          />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
          <TextField
            onChange={(e) => setImage(e.target.files[0])}
            id="standard-full-width"
            label="Image"
            style={{ margin: 8 }}
            placeholder="Uplode A Image"
            helperText="Uplode A Image"
            fullWidth
            margin="normal"
            type="file"
          />
        </Grid>
        <Grid item align="center" item xm={12} xs={12} md={12}>
          <Button
            onClick={editPost}
            variant="contained"
            size="large"
            color="primary"
            disabled={title === null || title?.length === 0 ? true : false}
          >
            Edit Post
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostEdit;
