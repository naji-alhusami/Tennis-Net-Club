export async function sendTakenTimesToMongo(timeInfo) {
    const response = await fetch("/api/timeSlots/insertTakenTimes", {
      method: "POST",
      body: JSON.stringify(timeInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const takenTimesData = await response.json();
  
    if (!response.ok) {
      throw new Error(takenTimesData.message || "Something went wrong!");
    }
  }
  