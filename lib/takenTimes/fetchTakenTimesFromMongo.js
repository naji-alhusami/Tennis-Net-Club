"use server";
export async function fetchTakenTimesFromMongo() {
  const response = await fetch(
    process.env.NEXTAUTH_URL + "/api/takenTimes/getTakenTimes",
    {
      cache: "no-cache",
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
      // next: {
      //   revalidate: 1,
      // },
    }
  );

  if (!response.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}
