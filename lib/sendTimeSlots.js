export async function sendDataToMongo(timess) {
    console.log(timess);
    const response = await fetch("/api/timeSlots/insertTimeSlots", {
      method: "POST",
      body: JSON.stringify(timess),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      console.log(data);
    }
  }