import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

import SendIcon from "@material-ui/icons/Send";
import SingleReply from "./SingleReply";
import Axios from "axios";
import { domain, headerPost } from "../../env";
import { useStateValue } from "../../state/stateProvider";

const SingleComment = ({ comment }) => {
  const [{}, dispatch] = useStateValue();
  const [reply, setReply] = useState(false);
  const [replytext, setReplytext] = useState("");
  const addReply = async () => {
    await Axios({
      url: `${domain}/api/addreply/`,
      method: "POST",
      headers: headerPost,
      data: {
        commentid: comment?.id,
        text: replytext,
      },
    })
      .then((response) => {
        let data = response.data;
        console.log(data);
        if (data["error"] === false) {
          setReplytext("");
          dispatch({
            type: "RELOAE",
            value: data,
          });
        } else {
          alert("Somthing is Wrong! Try Agane.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={comment?.profile?.image} />}
        title={comment?.profile?.user?.username}
        subheader={comment?.time}
      />
      <CardContent>
        <Typography variant="h5">{comment?.title}</Typography>
        <Button onClick={() => setReply(!reply)} style={{ fontWeight: "bold" }}>
          Reply({comment?.reply?.length})
        </Button>
      </CardContent>
      {reply === true && (
        <Grid style={{ marginLeft: "30px" }} container>
          <TextField
            style={{ width: "70%" }}
            id="filled-basic"
            label="Filled"
            variant="filled"
            value={replytext}
            onChange={(e) => setReplytext(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  disabled={replytext?.length === 0 ? true : false}
                  onClick={addReply}
                  color="primary"
                  component="span"
                >
                  <SendIcon />
                </IconButton>
              ),
            }}
          />
          <Grid container direction="column">
            {comment?.reply?.map((item, i) => (
              <SingleReply key={i} reply={item} />
            ))}
          </Grid>
        </Grid>
      )}
    </Card>
  );
};

export default SingleComment;
