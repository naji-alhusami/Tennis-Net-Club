import React from "react";

import Starting from "@/components/home-page/starting";
import Services from "@/components/home-page/services";
import Courses from "@/components/home-page/courses";
import Numbers from "@/components/home-page/numbers";
// import Events from "@/components/home-page/events";

function HomePage() {
  return (
    <main>
      <Starting />
      <Services />
      <Courses />
      <Numbers />
      {/* <Events /> */}
    </main>
  );
}

export default HomePage;
