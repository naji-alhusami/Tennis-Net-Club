import React from "react";
import Thanks from "@/components/thanks/thanks";

function ThanksPage({ searchParams }) {
  const thanksMessage = searchParams.thanks;
  return <Thanks thanksMessage={thanksMessage} />;
}

export default ThanksPage;
