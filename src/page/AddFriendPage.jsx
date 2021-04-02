import { Container, Grid, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import FriendProfile from "../componenets/friendcomp/FriendProfile";
import SingleAddFriend from "../componenets/friendcomp/SingleAddFriend";
import { domain, headerGet, headerPost } from "../env";

const AddFriendPage = () => {
  const [users, setUsers] = useState(null);
  const [friend, setFriend] = useState(null);
  const gteFriendData = async (profileId) => {
    // console.log(profileId);
    await Axios({
      url: `${domain}/api/friendprofile/`,
      headers: headerPost,
      method: "POST",
      data: {
        id: profileId,
      },
    })
      .then((response) => {
        setFriend(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const getUsers = async () => {
      await Axios({
        url: `${domain}/api/users/`,
        headers: headerGet,
      })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUsers();
  }, []);
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} xl={4} sm={4} md={4} lg={4}>
          <Typography variant="h5" align="center">
            Add Friends
          </Typography>
          {users?.map((user, i) => (
            <SingleAddFriend
              key={i}
              friend={user}
              gteFriendData={gteFriendData}
            />
          ))}
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
          <FriendProfile friend={friend} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddFriendPage;
