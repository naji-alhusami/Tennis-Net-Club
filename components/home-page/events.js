import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import classes from "./events.module.css";
import Image from "next/image";

import newCoaches from "@/public/images/newCoaches.jpg";
import newCourt from "@/public/images/newCourt.jpg";
import newPlayers from "@/public/images/newPlayers.jpg";

function Events() {
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <h3>Courses & Lessons</h3>
        <h1>EVENTS</h1>
        <h2>Discover Our Events</h2>
        <p>
          Experience a variety of engaging events that bring our tennis
          community together.
        </p>
        <div className={classes.tableContainer}>
          <table>
            <thead className={classes.firstLine}>
              <tr>
                <th>Events</th>
                <th>Description</th>
                <th>
                  <AiOutlineCalendar />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={classes.events}>
                  <Image src={newCoaches} alt="new-coaches" />
                  New Couches Presentation
                </td>
                <td>
                  Come and discover our experienced coaches, and explore our
                  planned courses tailored for all skill levels. From beginner
                  fundamentals to advanced techniques.
                </td>
                <td>25/Sep/2023</td>
              </tr>
              <tr>
                <td className={classes.events}>
                  <Image src={newCourt} alt="new-court" />
                  New Court Presentation
                </td>
                <td>
                  Come and discover our experienced coaches, and explore our
                  planned courses tailored for all skill levels. From beginner
                  fundamentals to advanced techniques.
                </td>
                <td>01/Oct/2023</td>
              </tr>
              <tr>
                <td className={classes.events}>
                  <Image src={newPlayers} alt="new-players" />
                  New Players Presentation
                </td>
                <td>
                  Come and discover our experienced coaches, and explore our
                  planned courses tailored for all skill levels. From beginner
                  fundamentals to advanced techniques.
                </td>
                <td>05/Oct/2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // <div>
    //   <div>
    //     <h1>Discover Our Events</h1>
    //     <p>
    //       Experience a variety of engaging events that bring our tennis
    //       community together. From grand openings to special celebrations, there
    //       is something for everyone to enjoy.
    //     </p>
    //   </div>
    //   <div>
    //     <div>

    //     </div>
    //   </div>
    // </div>
  );
}

export default Events;
