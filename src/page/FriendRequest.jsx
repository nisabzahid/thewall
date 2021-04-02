import { Container, Grid, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import FriendRequestGet from "../componenets/requests/FriendRequestGet";
import FriendRequestSent from "../componenets/requests/FriendRequestSent";
import { domain, headerGet } from "../env";
import { useStateValue } from "../state/stateProvider";

const FriendRequest = () => {
  const [{ reload }, {}] = useStateValue();
  const [send, setSend] = useState(null);
  const [received, setReceived] = useState(null);
  useEffect(() => {
    const getsent = async () => {
      await Axios({
        url: `${domain}/api/sendfriendrequest/`,
        method: "GET",
        headers: headerGet,
      })
        .then((response) => {
          // console.log(response.data);
          setSend(response.data);
        })
        .catch((error) => {
          console.log(error, "error");
        });
    };
    getsent();
  }, [reload]);
  useEffect(() => {
    const received = async () => {
      await Axios({
        url: `${domain}/api/receivedfriendrequest/`,
        method: "GET",
        headers: headerGet,
      })
        .then((response) => {
          // console.log(response.data);
          setReceived(response.data);
        })
        .catch((error) => {
          console.log(error, "error");
        });
    };
    received();
  }, [reload]);
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid xs={12} md={6} sm={6}>
          <FriendRequestSent send={send} />
        </Grid>
        <Grid xs={12} md={6} sm={6}>
          <FriendRequestGet received={received} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FriendRequest;
