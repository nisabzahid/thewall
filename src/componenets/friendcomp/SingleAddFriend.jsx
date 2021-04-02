import { Avatar, Button, Card, Grid, Typography } from "@material-ui/core";
import React from "react";
import Axios from "axios";
import { domain, headerPost } from "../../env";

const SingleAddFriend = ({ friend, gteFriendData }) => {
  const addFriendRequest = async () => {
    await Axios({
      url: `${domain}/api/sendfriendrequest/`,
      method: "POST",
      headers: headerPost,
      data: {
        id: friend?.id,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  return (
    <Card>
      <Grid style={{ padding: "10px" }} direction="row" container>
        <Avatar style={{}} src={friend?.image} />
        <Grid container direction="column">
          <Typography>{friend?.user?.username}</Typography>
          <Typography>
            {friend?.user?.first_name} {friend?.user?.last_name}
          </Typography>
          <Grid container direction="row" justify="space-evenly">
            <Button
              onClick={addFriendRequest}
              color="primary"
              variant="contained"
            >
              Add Friend
            </Button>
            <Button
              onClick={() => gteFriendData(friend?.id)}
              color="secondary"
              variant="contained"
            >
              View Profile
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SingleAddFriend;
