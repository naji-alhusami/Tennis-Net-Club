import MainNavigation from "@/components/layout/main-navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/footer";
import MyProvider from "@/store/my-provider";
import { AuthProvider } from "./Providers";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tennis Net App",
  description: "Created by Naji Alhusami",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <MyProvider>
          <AuthProvider>
            <MainNavigation />
            {children}
            {/* <Footer /> */}
          </AuthProvider>
        </MyProvider>
      </body>
    </html>
  );
}
