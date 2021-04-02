import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../state/stateProvider";
import { domain, headerPost } from "../env";
import { useHistory } from "react-router-dom";

const EditProfile = () => {
  const [{ profile }, dispatch] = useStateValue();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setFirstname(profile?.user?.first_name);
    setLastname(profile?.user?.last_name);
    setEmail(profile?.user?.email);
    setBio(profile?.bio);
  }, []);
  const updateProfile = async () => {
    let formData = new FormData();
    formData.append("bio", bio);
    if (image !== null) {
      formData.append("image", image);
    }
    await Axios({
      url: `${domain}/api/updateprofile/`,
      method: "POST",
      headers: headerPost,
      data: formData,
    })
      .then((response) => {
        if (response.data["error"] == false) {
          dispatch({
            type: "RELOAE",
            value: response.data,
          });
          history.push("/profile");
        } else {
          alert("Something is Wrong, Try Again!");
        }
      })
      .catch((_) => {
        alert("Something is Wrong, Try Again!");
      });
  };
  const updateUser = async () => {
    await Axios({
      url: `${domain}/api/updateuser/`,
      method: "POST",
      headers: headerPost,
      data: {
        firstname: firstname,
        lasttname: lastname,
        email: email,
      },
    })
      .then((response) => {
        if (response.data["error"] == false) {
          // console.log(response.data);
          dispatch({
            type: "RELOAE",
            value: response.data,
          });
          history.push("/profile");
        } else {
          // console.log(response.data);
          alert("Something is Wrong, Try Again!");
        }
      })
      .catch((_) => {
        // console.log(e);
        alert("Something is Wrong, Try Again!");
      });
  };
  return (
    <Container>
      <Typography
        component="div"
        style={{ padding: "20px" }}
        align="center"
        variant="h3"
      >
        Edti Profile
      </Typography>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item sm={6} xs={12} md={6}>
          <TextField
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            id="standard-full-width"
            label="Write About Your Self"
            style={{ margin: 8 }}
            placeholder="Bio"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item sm={6} xs={12} md={6}>
          <TextField
            onChange={(e) => setImage(e.target.files[0])}
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="Profile Image"
            fullWidth
            margin="normal"
            helperText="Uplode Profile Picture"
            type="file"
          />
        </Grid>
        <Button onClick={updateProfile} color="primary" variant="contained">
          Update
        </Button>
      </Grid>

      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item sm={6} xs={12} md={6}>
          <TextField
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            id="standard-full-width"
            label="First Name"
            style={{ margin: 8 }}
            placeholder="First Name"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item sm={6} xs={12} md={6}>
          <TextField
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            id="standard-full-width"
            label="Last Name"
            style={{ margin: 8 }}
            placeholder="Last name"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item sm={12} xs={12} md={12}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="standard-full-width"
            label="Email"
            style={{ margin: 8 }}
            placeholder="Email"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Button onClick={updateUser} color="primary" variant="contained">
          Update
        </Button>
      </Grid>
    </Container>
  );
};

export default EditProfile;
