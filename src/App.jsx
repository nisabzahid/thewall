import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./componenets/NavBar";
import HomePage from "./page/HomePage";
import AddPost from "./page/AddPost";
import ProfilePage from "./page/ProfilePage";
import { useStateValue } from "./state/stateProvider";
import Axios from "axios";
import { domain, headerGet } from "./env";
import LoginPage from "./page/LoginPage";
import AddFriendPage from "./page/AddFriendPage";
import MyFriendsPosts from "./componenets/friendcomp/MyFriendsPosts";
import EditProfile from "./page/EditProfile";
import PostDetails from "./page/PostDetails";
import FriendProfilePage from "./page/FriendProfilePage";
import FriendRequest from "./page/FriendRequest";
import PostEdit from "./page/PostEdit";

const App = () => {
  const [{ profile, reload }, dispatch] = useStateValue();
  useEffect(() => {
    const getProfile = async () => {
      await Axios({
        url: `${domain}/api/profile/`,
        headers: headerGet,
      })
        .then((response) => {
          // console.log(response.data[0]);
          dispatch({
            type: "PROFILE",
            value: response.data[0],
          });
        })
        .catch((e) => {
          dispatch({
            type: "PROFILE",
            value: null,
          });
          console.log(e, "$$$ERROR$$$$$$$$$$$$$$$$$$$$$$$");
        });
    };
    getProfile();
  }, [reload]);

  return (
    <>
      {profile !== null ? (
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/addpost" component={AddPost} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/editprofile" component={EditProfile} />
            <Route exact path="/addfriend" component={AddFriendPage} />
            <Route exact path="/myfriendsposts" component={MyFriendsPosts} />
            <Route exact path="/friendrequest" component={FriendRequest} />
            <Route exact path="/post/:id" component={PostDetails} />
            <Route exact path="/friend/:id" component={FriendProfilePage} />
            <Route exact path="/editpost/:id" component={PostEdit} />
          </Switch>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Route exact path="/" component={LoginPage} />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
