import { Container, Grid } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { domain, headerGet } from "../../env";
import { useStateValue } from "../../state/stateProvider";
import SinglePost from "../postscomp/SinglePost";
import SideBar from "../SideBar";

const MyFriendsPosts = () => {
  const [{ reload }, {}] = useStateValue();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getposts = () => {
      Axios.get(`${domain}/api/friendposts/`, {
        method: "GET",
        headers: headerGet,
      })
        .then((response) => {
          setPosts(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getposts();
  }, [reload]);
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item md={8} sm={12}>
          <>
            {posts !== null
              ? posts?.map((item, i) => <SinglePost key={i} item={item} />)
              : "Loading..."}
          </>
        </Grid>
        <Grid item md={4} sm={12}>
          <SideBar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyFriendsPosts;
