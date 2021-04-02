import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useState } from "react";
import { domain, headerCsrf } from "../env";

const LoginPage = () => {
  const [registernow, setRegisternow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const loginNow = async () => {
    await Axios({
      url: `${domain}/api/login/`,
      method: "POST",
      headers: headerCsrf,
      data: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        let data = response.data;
        if (data["token"]) {
          console.log(data["token"]);
          window.localStorage.setItem("token", data["token"]);
          window.location.href = "/";
        } else {
          alert("Something is Wrong!Try Again!!");
        }
      })
      .catch((_) => {
        alert("Something is Wrong!Try Again!!");
      });
  };

  const registerNow = async () => {
    if (password !== confirmpass) {
      alert("Confirm Password!!");
      return;
    }
    await Axios({
      url: `${domain}/api/register/`,
      method: "POST",
      headers: headerCsrf,

      data: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        let data = response.data;
        if (data["error"] === false) {
          alert(data["message"]);
          setRegisternow(false);
        } else {
          alert(data["message"]);
        }
      })
      .catch((_) => {
        alert("Something is Wrong!Try Again!!");
      });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "80vh" }}
    >
      <Typography variant="h4">
        {registernow ? "Register Now" : "Login Now"}
      </Typography>
      <Grid item xs={12} md={6} sm={6}>
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", margin: "10px 0" }}
          variant="outlined"
          label="Username"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", margin: "10px 0" }}
          variant="outlined"
          label="Password"
          type="password"
        />
        {registernow && (
          <TextField
            onChange={(e) => setConfirmpass(e.target.value)}
            style={{ width: "100%", margin: "10px 0" }}
            variant="outlined"
            label="Confirm Password"
            type="password"
          />
        )}
      </Grid>
      {registernow ? (
        <>
          <Button onClick={registerNow} color="primary" variant="contained">
            Register
          </Button>
          <Button onClick={() => setRegisternow(false)} color="inherit">
            Have an account, Login Now!
          </Button>
        </>
      ) : (
        <>
          <Button onClick={loginNow} color="primary" variant="contained">
            Login
          </Button>
          <Button onClick={() => setRegisternow(true)} color="inherit">
            No Account, Register Now!
          </Button>
        </>
      )}
    </Grid>
  );
};

export default LoginPage;
