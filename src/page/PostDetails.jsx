import { Container } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "../componenets/postscomp/SinglePost";
import { domain, headerGet } from "../env";
import { useStateValue } from "../state/stateProvider";

const PostDetails = () => {
  const { id } = useParams();
  const [{ reload }, {}] = useStateValue();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getposts = () => {
      Axios.get(`${domain}/api/posts/${id}/`, {
        method: "GET",
        headers: headerGet,
      })
        .then((response) => {
          setPost(response.data[0]);
          console.log(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getposts();
  }, [reload]);
  return (
    <Container>
      {post !== null && <SinglePost item={post} fulldata={true} />}
    </Container>
  );
};

export default PostDetails;
