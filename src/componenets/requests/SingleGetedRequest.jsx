import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import Axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import { domain, headerPost } from "../../env";
import { useStateValue } from "../../state/stateProvider";

const SingleGetedRequest = ({ item }) => {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const rejectFriReq = async () => {
    await Axios({
      url: `${domain}/api/deletesendfriendrequest/`,
      headers: headerPost,
      method: "POST",
      data: {
        sender: item?.sender?.id,
        receiver: item?.receiver?.id,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data["error"] === false) {
          dispatch({
            type: "RELOAE",
            value: response.data,
          });
        } else {
          alert("Something is Wrong! Try Again!!");
        }
      })
      .catch((_) => {
        alert("Something is Wrong! Try Again!!");
      });
  };
  const acceptFriReq = async () => {
    await Axios({
      url: `${domain}/api/acceptfriendrequest/`,
      headers: headerPost,
      method: "POST",
      data: {
        senderid: item?.sender?.id,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data["error"] === false) {
          dispatch({
            type: "RELOAE",
            value: response.data,
          });
        } else {
          alert("Something is Wrong! Try Again!!");
        }
      })
      .catch((_) => {
        alert("Something is Wrong! Try Again!!");
      });
  };
  const friendProfile = () => {
    history.push(`/friend/${item?.sender?.id}`);
  };
  return (
    <Card>
      <CardHeader
        avatar={<Avatar style={{}} src={item?.sender?.image} />}
        title={`${item?.sender?.user?.first_name} ${item?.sender?.user?.last_name}`}
        subheader={`${item?.sender?.user?.username}`}
      />
      <CardContent>
        <Typography variant="span">{item?.time}</Typography>
        <Grid container direction="row" justify="space-around">
          <Button onClick={acceptFriReq} color="secondary" variant="contained">
            accept
          </Button>
          <Button onClick={rejectFriReq} color="inherit" variant="contained">
            reject
          </Button>
          <Button onClick={friendProfile} color="primary" variant="contained">
            View Profile
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SingleGetedRequest;
