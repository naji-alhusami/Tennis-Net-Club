import React from "react";

import Thanks from "@/components/thanks/thanks";
import Equipments from "@/components/equipments/equipments";

function ThanksPage({ searchParams }) {
  const thanksMessage = searchParams.thanks;
  return (
    <>
      <Thanks thanksMessage={thanksMessage} /> <Equipments />
    </>
  );
}

export default ThanksPage;
