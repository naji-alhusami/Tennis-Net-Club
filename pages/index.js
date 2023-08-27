import React, { Fragment } from "react";

import Starting from "@/components/home-page/starting";
import FeaturedPosts from "@/components/home-page/featured-posts";

import factsAboutTennis from "@/public/images/factsAboutTennis.jpg"

function HomePage() {
  const data = [
    {
      title: "FACTS ABOUT TENNIS",
      image: factsAboutTennis,
      // excerpt: "a",
      date: "2023-08-01",
      slug: "facts-about-tennis",
    },
    {
      title: "FACTS ABOUT TENNIS2",
      image: factsAboutTennis,
      // excerpt: "a",
      date: "2023-08-01",
      slug: "facts-about-tennis2",
    },
    {
      title: "FACTS ABOUT TENNIS3",
      image: factsAboutTennis,
      // excerpt: "a",
      date: "2023-08-01",
      slug: "facts-about-tennis3",
    },
  ];

  return (
    <Fragment>
      <Starting />
      <FeaturedPosts posts={data} />
    </Fragment>
  );
}

export default HomePage;
