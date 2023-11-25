"use server";
import { revalidatePath } from "next/cache";

import TakenTime from "@/models/takenTimeModel";

export async function deleteReservedTimesActions(timeSlot) {
  try {
    const result = await TakenTime.deleteOne({ _id: timeSlot._id });

    if (result.deletedCount === 1) {
      revalidatePath("/manage");
      return { message: "Deleted Reserved Time Successfully" };
    } else {
      throw new Error("No document with this id was found.");
    }
  } catch (error) {
    throw new Error("An error occurred while deleting the reserved time.");
  }
}
