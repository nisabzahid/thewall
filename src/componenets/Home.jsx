import Axios from "axios";
import { useEffect, useState } from "react";
import { domain, headerGet } from "../env";
import { useStateValue } from "../state/stateProvider";
import SinglePost from "./postscomp/SinglePost";

const Home = () => {
  const [{ reload }, {}] = useStateValue();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getposts = () => {
      Axios.get(`${domain}/api/posts/`, {
        method: "GET",
        headers: headerGet,
      })
        .then((response) => {
          setPosts(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getposts();
  }, [reload]);
  return (
    <>
      {posts !== null
        ? posts?.map((item, i) => <SinglePost key={i} item={item} />)
        : "Loading..."}
    </>
  );
};

export default Home;
