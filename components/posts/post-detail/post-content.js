import React from "react";
import ReactMarckDown from "react-markdown";
import PostHeader from "./post-header";

import factsAboutTennis from "@/public/images/factsAboutTennis.jpg";
import classes from "./post-content.module.css";

function PostContent() {
  const data = {
    title: "FACTS ABOUT TENNIS",
    image: factsAboutTennis,
    // excerpt: "a",
    date: "2023-08-01",
    slug: "facts-about-tennis",
    content: "# first post",
  };

  return (
    <article className={classes.content}>
      <PostHeader title={data.title} image={data.image} />
      <ReactMarckDown>{data.content}</ReactMarckDown>
    </article>
  );
}

export default PostContent;
