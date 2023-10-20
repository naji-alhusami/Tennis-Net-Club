import React from "react";

import classes from "./featured-blogs.module.css";
import Posts from "../posts/blogs";
import Headers from "../ui/headers";
// import { getBestPosts } from "@/lib/posts-util";

function FeaturedBlogs() {
  // const posts = getBestPosts();

  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <Headers
          H3Header="Featured Blogs"
          H1Header="BLOGS"
          H2Header="Check Our Blogs"
          PHeader="Experience a variety of engaging events that bring our tennis
        community together."
        />
      </div>
      {/* <Posts posts={posts} /> */}
    </div>
  );
}

export default FeaturedBlogs;
