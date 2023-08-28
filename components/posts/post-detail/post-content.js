import React from "react";
import ReactMarckDown from "react-markdown";
import PostHeader from "./post-header";
import Image from "next/image";

// import factsAboutTennis from "@/public/images/factsAboutTennis.jpg";
import classes from "./post-content.module.css";

function PostContent(props) {
  const { post } = props;

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
  };

  console.log(customRenderers);

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={post.image} />
      <ReactMarckDown components={customRenderers}>
        {post.content}
      </ReactMarckDown>
    </article>
  );
}

export default PostContent;
