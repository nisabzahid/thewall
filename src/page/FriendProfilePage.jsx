import { Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { domain, headerPost } from "../env";
import FriendProfile from "../componenets/friendcomp/FriendProfile";
import { useStateValue } from "../state/stateProvider";

const FriendProfilePage = () => {
  const [friend, setFriend] = useState(null); // profileId
  const [{ reload }, {}] = useStateValue();

  const { id } = useParams();

  useEffect(() => {
    const getfrienddata = async () => {
      await Axios({
        url: `${domain}/api/friendprofile/`,
        headers: headerPost,
        method: "POST",
        data: {
          id: id,
        },
      })
        .then((response) => {
          setFriend(response.data[0]);
          console.log(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getfrienddata();
  }, [reload, id]);
  return (
    <>
      {friend !== null ? (
        <FriendProfile friend={friend} />
      ) : (
        <Typography variant="h3">Loding...</Typography>
      )}
    </>
  );
};

export default FriendProfilePage;
