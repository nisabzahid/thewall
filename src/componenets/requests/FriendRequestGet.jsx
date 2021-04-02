import { Paper, Typography } from "@material-ui/core";
import React from "react";
import SingleGetedRequest from "./SingleGetedRequest";

const FriendRequestGet = ({ received }) => {
  return (
    <Paper>
      <Typography align="center" variant="h4">
        Friend Request I Get
      </Typography>
      {received !== null ? (
        received?.map((item, i) => <SingleGetedRequest key={i} item={item} />)
      ) : (
        <Typography>No Friend Request</Typography>
      )}
    </Paper>
  );
};

export default FriendRequestGet;
