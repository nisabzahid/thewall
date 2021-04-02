import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { domain, headerPost } from "../env";
import Axios from "axios";
import { useStateValue } from "../state/stateProvider";
import { useHistory } from "react-router-dom";

const AddPost = () => {
  const [{}, dispatch] = useStateValue();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const history = useHistory();
  const addPost = async () => {
    let formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    if (image != null) {
      formdata.append("image", image);
    }
    await Axios({
      url: `${domain}/api/posts/`,
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
            onClick={addPost}
            variant="contained"
            size="large"
            color="primary"
            disabled={title === null || title?.length === 0 ? true : false}
          >
            Add Post
          </Button>
        </Grid>
      </Grid>
      {/* <Grid>
        <Typography>{title}</Typography>
        <Typography>{content}</Typography>
        <Typography>{image}</Typography> 
       </Grid> */}
    </Container>
  );
};

export default AddPost;
