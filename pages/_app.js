// import Layout from "@/components/layout/layout";
// // import "@/styles/globals.css";
// import Head from "next/head";
// import { SessionProvider } from "next-auth/react";
// import MyProvider from "@/store/my-provider";

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   // const { data: sessionData, status: loading } = useSession();

//   // if (loading && !sessionData) {
//   //   return <p>Loading...</p>;
//   // }

//   return (
//     <MyProvider>
//       <SessionProvider session={session}>
//         <Layout>
//           <Head>
//             <meta
//               name="viewport"
//               content="width=device-width, initial-scale=1"
//             />
//           </Head>
//           <Component {...pageProps} />
//         </Layout>
//       </SessionProvider>
//     </MyProvider>
//   );
// }
