import React from "react";
import Image from "next/image";

import { EquipmentsData } from "./equipment-data";
import classes from "./equipments.module.css";

function Equipments() {
  return (
    <div className={classes.equipmentsContainer}>
      {EquipmentsData.map((equipment) => (
        <div key={equipment.id} className={classes.equipmentContainer}>
          <div>
            <Image src={equipment.image} alt="eq1" />
          </div>
          <div>
            <h1>{equipment.title}</h1>
            <p>{equipment.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Equipments;
