import { Container, Grid } from "@material-ui/core";
import React from "react";
import Home from "../componenets/Home";
import SideBar from "../componenets/SideBar";

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item md={8} sm={12}>
          <Home />
        </Grid>
        <Grid item md={4} sm={12}>
          <SideBar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
