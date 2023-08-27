import React from "react";

import Posts from "./posts";

import classes from "./all-posts.module.css";

function AllPosts(props) {
  return (
    <section className={classes.posts}>
      <h1>All Blogs</h1>
      <Posts posts={props.posts} />
    </section>
  );
}

export default AllPosts;
