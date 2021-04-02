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

const SingleSendedRequest = ({ item }) => {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const canclefriReq = async () => {
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
  const friendProfile = () => {
    history.push(`/friend/${item?.receiver?.id}`);
  };
  return (
    <Card>
      <CardHeader
        avatar={<Avatar style={{}} src={item?.receiver?.image} />}
        title={`${item?.receiver?.user?.first_name} ${item?.receiver?.user?.last_name}`}
        subheader={`${item?.receiver?.user?.username}`}
      />
      <CardContent>
        <Typography variant="span">{item?.time}</Typography>
        <Grid container direction="row" justify="space-around">
          <Button onClick={canclefriReq} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={friendProfile} color="primary" variant="contained">
            View Profile
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SingleSendedRequest;
