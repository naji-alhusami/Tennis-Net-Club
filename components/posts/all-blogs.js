import React from "react";

import Posts from "./blogs";

import classes from "./all-blogs.module.css";

function AllBlogs(props) {
  return (
    <section className={classes.posts}>
      <h1>All Blogs</h1>
      <Posts posts={props.posts} />
    </section>
  );
}

export default AllBlogs;
