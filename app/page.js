import React from "react";

import Starting from "@/components/home-page/starting";
import Services from "@/components/home-page/services";
import Courses from "@/components/home-page/courses";
import Events from "@/components/home-page/events";

function HomePage() {
  return (
    <main>
      <Starting />
      <Services />
      {/* <Courses /> */}
      <Events />
    </main>
  );
}

export default HomePage;
