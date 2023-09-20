import React, { Fragment } from "react";

import Head from "next/head";

import Starting from "@/components/home-page/starting";
import FeaturedPosts from "@/components/home-page/featured-posts";
import Services from "@/components/home-page/services";
import Courses from "@/components/home-page/courses";
import Events from "@/components/home-page/events";
import Booking from "@/components/home-page/booking";
import { coursesData } from "@/lib/coursesData";
import { servicesData } from "@/lib/servicesData";
import { getBestPosts } from "@/lib/posts-util";

function HomePage(props) {

  return (
    <Fragment>
      <Head>
        <title>Tennis</title>
        <meta name="description" content="I post about Tennis." />
      </Head>
      <Starting />
      <Services services={props.servicesData} />
      <Courses courses={props.coursesData} />
      <Booking />
      <Events />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const bestPosts = getBestPosts();

  return {
    props: {
      servicesData: servicesData,
      coursesData: coursesData,
      posts: bestPosts,
    },
  };
}

export default HomePage;
