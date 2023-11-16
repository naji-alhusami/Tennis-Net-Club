import MainNavigation from "@/components/layout/main-navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/footer";
import MyProvider from "@/store/my-provider";
import { AuthProvider } from "./Providers";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <Suspense fallback={<h1>Loading Main Page...</h1>}> */}
      <body>
        <MyProvider>
          <AuthProvider>
            <MainNavigation />
            {children}
            <Footer />
          </AuthProvider>
        </MyProvider>
      </body>
      {/* </Suspense> */}
    </html>
  );
}
