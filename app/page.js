"use client";
import React from "react";

import Starting from "@/components/home-page/starting";
import Services from "@/components/home-page/services";
import Courses from "@/components/home-page/courses";
import Numbers from "@/components/home-page/numbers";
import Booking from "@/components/home-page/booking";
import Events from "@/components/home-page/events";
import FeaturedBlogs from "@/components/home-page/featured-blogs";

function HomePage() {
  return (
    <main>
      <Starting />
      <Services />
      <Courses />
      <Numbers />
      <Booking />
      <Events />
      <FeaturedBlogs />
    </main>
  );
}

export default HomePage;
