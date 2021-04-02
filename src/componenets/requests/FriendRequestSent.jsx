import { Paper, Typography } from "@material-ui/core";
import React from "react";
import SingleSendedRequest from "./SingleSendedRequest";

const FriendRequestSent = ({ send }) => {
  //   console.log(send, "send send");
  return (
    <Paper>
      <Typography align="center" variant="h4">
        Friend Request I send
      </Typography>
      {send !== null ? (
        send?.map((item, i) => <SingleSendedRequest key={i} item={item} />)
      ) : (
        <Typography>No Sended Friend Request</Typography>
      )}
    </Paper>
  );
};

export default FriendRequestSent;
