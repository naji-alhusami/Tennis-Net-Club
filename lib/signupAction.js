// "use server";

// import { revalidatePath } from "next/cache";

// export async function submitSignupHandler(userData) {
//   const name = userData.get("name");
//   const email = userData.get("email");
//   const password = userData.get("password");
//   const passwordConfirmation = userData.get("passwordConfirmation");
//   const role = userData.get("role");
//   // console.log(userData);
//   // console.log(name);
//   try {
//     const response = await fetch("/api/signup", {
//       method: "POST",
//       body: JSON.stringify({
//         name,
//         email,
//         password,
//         passwordConfirmation,
//         role,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       // console.log("Validation Error:", data);
//     } else {
//       const form = event.target;
//       form.reset();
//     }
//     revalidatePath("//auth/signup"); // that's means next time the data will be requested will be freshed and new data
//     router.replace("/auth/login");
//     return data;
//   } catch (error) {
//     console.log("Error", error.message);
//   }
// }
