import { Grid, Typography } from "@material-ui/core";
import React from "react";
import SingleFriend from "./SingleFriend";

const FriendsFriend = ({ friends, asFriend = false }) => {
  console.log(friends, "$$$$$$friend");
  return (
    <>
      <Typography align="center" variant="h3">
        Friends
      </Typography>
      <Grid container lg={12} spacing={2}>
        {friends?.map((item, i) => (
          <Grid sm={4} item>
            <SingleFriend key={i} asFriend={asFriend} friend={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FriendsFriend;
