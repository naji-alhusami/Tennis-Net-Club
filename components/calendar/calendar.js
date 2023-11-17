"use client";
import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useAnimation, useInView } from "framer-motion";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/daygrid";
import { eventsExtra } from "@/lib/events/extraEventsData";
import Headers from "../ui/headers";
import classes from "../calendar/calendar.module.css";

function Calendar({ session, events, takenTimes }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const pathname = usePathname();

  // Filter TakenTimes for the player logged-in
  const memberTakenTimes = takenTimes.filter((takenTime) => {
    return takenTime.member === session?.user.name;
  });

  // Filter Events that match player logged-in
  const memberEvents = events.filter((event) => {
    return event.member === session?.user.name;
  });

  // TakenTimes & Events for the Player Logged-in
  const playerCalendar = [...memberEvents, ...memberTakenTimes];

  const clubCalendar = [...takenTimes, ...eventsExtra];

  return (
    <div className={classes.calendar}>
      {pathname === "/calendar" ? (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          height="600px"
          events={playerCalendar}
        />
      ) : (
        <div className={classes.eventsContainer}>
          <motion.div
            className={classes.text}
            ref={ref}
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Headers
              H3Header="Courses, Lessons & Reserved Courts"
              H1Header="TIME SLOTS"
              H2Header="Club Calendar"
              PHeader="Check the club calendar including (events, training sessions, and
            reserved courts)"
            />
          </motion.div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            height="600px"
            events={clubCalendar}
          />
        </div>
      )}
    </div>
  );
}

export default Calendar;
