import React from "react";
import PostItem from "./blog-content.js";

import classes from "./posts.module.css";

function Blogs(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default Blogs;
