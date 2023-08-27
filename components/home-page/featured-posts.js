import React from "react";

import classes from "./featured-posts.module.css";
import Posts from "../posts/posts";

function FeaturedPosts(props) {
  return (
    <section className={classes.latest}>
      <h2>Best Blogs</h2>
      <Posts posts={props.posts}  />
    </section>
  );
}

export default FeaturedPosts;
