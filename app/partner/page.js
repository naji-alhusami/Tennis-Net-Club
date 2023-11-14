import React, { Suspense } from "react";
import FindPartner from "@/components/find-partner/find-partner";
import Headers from "@/components/ui/headers";
import Image from "next/image";
import partner from "@/public/images/partner.jpg";
import classes from "@/components/find-partner/find-partner.module.css";

function PartnerPage() {
  return (
    <div className={classes.partnerContainer}>
      <div className={classes.imageContainer}>
        <Image
          src={partner}
          alt="find-partner"
          priority="true"
          property="true"
        />
      </div>
      <div className={classes.text}>
        <Headers
          H3Header=""
          H1Header=""
          H2Header="Find Partner"
          PHeader="You Can Choose Player To Play With, By Contacting Using WhatsApp"
        />
      </div>
      <Suspense fallback={<h1>Loading Players...</h1>}>
        <FindPartner />
      </Suspense>
    </div>
  );
}

export default PartnerPage;
