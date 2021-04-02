import React from "react";
import SinglePost from "../postscomp/SinglePost";

const FriendsPosts = ({ posts }) => {
  // console.log(posts, "friends posts #################");
  return (
    <>
      {posts?.map((item, i) => (
        <SinglePost key={i} item={item} />
      ))}
    </>
  );
};

export default FriendsPosts;
