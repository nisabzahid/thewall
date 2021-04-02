import { Button, Card, Grid, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useState } from "react";
import { domain, headerPost } from "../../env";
import { useStateValue } from "../../state/stateProvider";
import FriendsFriend from "./FriendsFriend";
import FriendsPosts from "./FriendsPosts";

const FriendProfile = ({ friend }) => {
  // console.log(friend, "$$$$$$$$$$$$$$$$$$---friend");
  const [{}, dispatch] = useStateValue();

  const [btn, setBtn] = useState(0);
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
  const unFriendRequest = async () => {
    await Axios({
      url: `${domain}/api/unfriend/`,
      method: "POST",
      headers: headerPost,
      data: {
        id: friend?.id,
      },
    })
      .then((response) => {
        if (response.data["error"] === false) {
          dispatch({
            type: "RELOAE",
            value: response.data,
          });
        } else {
          alert("Somthing is Wrong! Try Agane.");
        }
      })
      .catch((_) => {
        alert("Somthing is Wrong! Try Agane.");
      });
  };

  return (
    <Grid style={{ marginTop: "30px" }}>
      {friend !== null && (
        <>
          <Grid container direction="column" alignItems="center">
            <img
              style={{ width: "20%", borderRadius: "20px" }}
              src={friend?.image}
              alt={friend?.user?.username}
            />
            <Typography variant="h5">{friend?.user?.username}</Typography>
            <Typography variant="h3">
              {friend?.user?.first_name} {friend?.user?.last_name}
            </Typography>
            <Typography>{friend?.bio}</Typography>
          </Grid>
          <Card style={{ backgroundColor: "#2e73ab" }}>
            <Grid
              style={{ padding: "10px" }}
              container
              direction="row"
              justify="space-around"
            >
              <Button
                onClick={() => setBtn(0)}
                color="primary"
                variant="contained"
              >
                Friends
              </Button>
              <Button
                onClick={() => setBtn(1)}
                color="primary"
                variant="contained"
              >
                Posts
              </Button>
              {friend?.myfriend ? (
                <Button
                  onClick={unFriendRequest}
                  color="secondary"
                  variant="contained"
                >
                  Unfriend
                </Button>
              ) : (
                <Button
                  onClick={addFriendRequest}
                  color="secondary"
                  variant="contained"
                >
                  Add Friend
                </Button>
              )}
            </Grid>
          </Card>
          {btn === 0 ? (
            <FriendsFriend friends={friend?.friends} />
          ) : (
            <FriendsPosts posts={friend?.posts} />
          )}
        </>
      )}
    </Grid>
  );
};

export default FriendProfile;
