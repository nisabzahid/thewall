import {
  Card,
  ClickAwayListener,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import InfoIcon from "@material-ui/icons/Info";
import { useHistory } from "react-router-dom";
import { domain, headerPost } from "../../env";
import Axios from "axios";
import { useStateValue } from "../../state/stateProvider";

const styles = makeStyles({
  button: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#8CABF6",
    right: "50px",
    bottom: "30px",
  },
});

const SingleFriend = ({ friend, asFriend = false }) => {
  const [{}, dispatch] = useStateValue();
  const classes = styles();
  const [showmenu, setShowmenu] = useState(false);
  const history = useHistory();
  const friendProfile = () => {
    history.push(`/friend/${friend?.id}`);
  };
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
    <GridListTile>
      <img
        style={{ width: "100%" }}
        src={friend?.image}
        alt={friend?.user?.username}
      />
      <GridListTileBar
        title={friend?.user?.username}
        subtitle={`${friend?.user?.first_name} ${friend?.user?.last_name} `}
        actionIcon={
          <>
            <IconButton
              className={classes.button}
              onClick={() => setShowmenu(!showmenu)}
            >
              <InfoIcon />
            </IconButton>
            {showmenu ? (
              <ClickAwayListener onClickAway={() => setShowmenu(false)}>
                <Card className={classes.dropdown}>
                  <MenuItem onClick={friendProfile}>Profile</MenuItem>
                  {asFriend ? (
                    <MenuItem onClick={unFriendRequest}>Unfriend</MenuItem>
                  ) : (
                    <MenuItem onClick={addFriendRequest}>Add Friend</MenuItem>
                  )}
                </Card>
              </ClickAwayListener>
            ) : null}
          </>
        }
      />
    </GridListTile>
  );
};

export default SingleFriend;
