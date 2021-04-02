import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import DelateIcon from "@material-ui/icons/Delete";

const SingleReply = ({ reply }) => {
  return (
    <Card style={{ width: "70%" }}>
      <CardHeader
        avatar={<Avatar src={reply?.profile?.image} />}
        title={reply?.profile?.user?.username}
        subheader={reply?.time}
      />
      <CardContent>
        <Typography variant="h5">{reply?.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default SingleReply;
