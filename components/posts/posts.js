import React from "react";
import PostItem from "./post-item.js";

import classes from "./posts.module.css";

function Posts(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default Posts;
