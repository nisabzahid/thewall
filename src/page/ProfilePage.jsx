import { Button, Card, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FriendsFriend from "../componenets/friendcomp/FriendsFriend";
import FriendsPosts from "../componenets/friendcomp/FriendsPosts";
import { useStateValue } from "../state/stateProvider";

const ProfilePage = () => {
  const [{ profile }, {}] = useStateValue();
  const [btn, setBtn] = useState(0);
  const history = useHistory();
  const goEditPage = () => {
    history.push("/editprofile");
  };
  return (
    <>
      {profile !== null && (
        <Grid style={{ marginTop: "30px" }}>
          <Grid container direction="column" alignItems="center">
            <img
              style={{ width: "20%", borderRadius: "20px" }}
              src={profile?.image}
              alt={profile?.user?.username}
            />
            <Typography variant="h5">{profile?.user?.username}</Typography>
            <Typography variant="h3">
              {profile?.user?.first_name} {profile?.user?.last_name}
            </Typography>

            <Typography variant="h5">{profile?.user?.email}</Typography>
            <Typography>{profile?.bio}</Typography>
            <Button
              onClick={goEditPage}
              style={{ margin: "10px" }}
              variant="contained"
              color="secondary"
            >
              Edit
            </Button>
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
                Posts
              </Button>
              <Button
                onClick={() => setBtn(1)}
                color="primary"
                variant="contained"
              >
                Friends
              </Button>
            </Grid>
          </Card>
          {btn === 0 ? (
            <FriendsPosts posts={profile?.posts} />
          ) : (
            <FriendsFriend asFriend={true} friends={profile?.friends} />
          )}
        </Grid>
      )}
    </>
  );
};

export default ProfilePage;
