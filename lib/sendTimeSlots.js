export async function sendDataToMongo(timeSlots) {
  console.log(timeSlots);
  const response = await fetch("/api/timeSlots/insertTimeSlots", {
    method: "POST",
    body: JSON.stringify(timeSlots),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong!");
  } else {
    const data = await response.json();
    console.log(data);
    return data;
  }
}
// --------------
// export async function sendDataToMongo(timeSlots) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch("/api/timeSlots/insertTimeSlots", {
//         method: "POST",
//         body: JSON.stringify(timeSlots),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Something went wrong!");
//       } else {
//         // console.log(data);
//         resolve("Data sent to MongoDB successfully"); // Resolve the promise when data is successfully sent
//       }
//     } catch (error) {
//       reject(error); // Reject the promise if there's an error
//     }
//   });
// }
