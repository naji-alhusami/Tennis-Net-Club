"use client";

import { SessionProvider } from "next-auth/react";
import MyProvider from "@/store/my-provider";

export const AuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      <MyProvider>{children}</MyProvider>
    </SessionProvider>
  );
};
