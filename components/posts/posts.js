import React from "react";
import PostItem from "./post-item.js";

import classes from "./posts.module.css";

function posts(props) {
  const { posts } = props;

  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} />
      ))}
    </ul>
  );
}

export default posts;
