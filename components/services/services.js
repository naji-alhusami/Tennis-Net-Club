// "use client";
// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion, useAnimation, useInView } from "framer-motion";

// import Headers from "../ui/headers";
// import { servicesData } from "@/components/services/services-data";
// import classes from "./services.module.css";

// function Services() {
//   // Motion for header
//   const headerRef = useRef(null);
//   const isInViewHeader = useInView(headerRef, { once: true });
//   const headerControls = useAnimation();
//   useEffect(() => {
//     if (isInViewHeader) {
//       headerControls.start("visible");
//     }
//   }, [isInViewHeader, headerControls]);

//   // Motion for services
//   const servicesRef = useRef(null);
//   const isInViewServices = useInView(servicesRef, { once: true });
//   const servicesControls = useAnimation();
//   useEffect(() => {
//     if (isInViewServices) {
//       servicesControls.start("visible");
//     }
//   }, [isInViewServices, servicesControls]);

//   return (
//     <div className={classes.container}>
//       <motion.div
//         variants={{
//           hidden: { opacity: 0, y: -75 },
//           visible: { opacity: 1, y: 0 },
//         }}
//         initial="hidden"
//         animate={headerControls}
//         transition={{ duration: 0.3, delay: 0.4 }}
//         ref={headerRef}
//         className={classes.text}
//       >
//         <Headers
//           H3Header="TENNIS NET"
//           H1Header="SERVICES"
//           H2Header="Discover Our Services"
//           PHeader="Experience a variety of engaging services that bring our tennis
//           community together."
//         />
//       </motion.div>
//       <motion.div
//         variants={{
//           hidden: { opacity: 0, y: -75 },
//           visible: { opacity: 1, y: 0 },
//         }}
//         initial="hidden"
//         animate={servicesControls}
//         transition={{ duration: 0.3, delay: 0.4 }}
//         ref={servicesRef}
//         className={classes.services}
//       >
//         {servicesData.map((service) => (
//           <div
//             // variants={{
//             //   hidden: { opacity: 0, y: -75 },
//             //   visible: { opacity: 1, y: 0 },
//             // }}
//             // initial="hidden"
//             // animate={servicesControls}
//             // transition={{ duration: 0.3, delay: 0.4 }}
//             // ref={servicesControls}
//             key={service.id}
//             className={classes.service}
//           >
//             <div>
//               <Image src={service.image} alt="hi" />
//             </div>
//             <div>
//               <h1>{service.title}</h1>
//             </div>
//             <div>
//               <p>{service.description}</p>
//             </div>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// export default Services;
