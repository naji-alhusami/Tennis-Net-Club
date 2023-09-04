import React, { Fragment } from "react";

import Starting from "@/components/home-page/starting";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { getBestPosts } from "@/lib/posts-util";
import Head from "next/head";
import Services from "@/components/home-page/services";
import Numbers from "@/components/numbers/numbers";

function HomePage(props) {
  // const data = [
  //   {
  //     title: "FACTS ABOUT TENNIS",
  //     image: factsAboutTennis,
  //     // excerpt: "a",
  //     date: "2023-08-01",
  //     slug: "facts-about-tennis",
  //   },
  //   {
  //     title: "FACTS ABOUT TENNIS2",
  //     image: factsAboutTennis,
  //     // excerpt: "a",
  //     date: "2023-08-01",
  //     slug: "facts-about-tennis2",
  //   },
  //   {
  //     title: "FACTS ABOUT TENNIS3",
  //     image: factsAboutTennis,
  //     // excerpt: "a",
  //     date: "2023-08-01",
  //     slug: "facts-about-tennis3",
  //   },
  // ];

  return (
    <Fragment>
      <Head>
        <title>Tennis</title>
        <meta name="description" content="I post about Tennis." />
      </Head>
      <Starting />
      <Services />
      <Numbers />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const bestPosts = getBestPosts();

  return {
    props: {
      posts: bestPosts,
    },
  };
}

export default HomePage;
