"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: { backgroundColor: "#003146", color: "#fdfcf0" },
        }}
      ></Toaster>
      <HeroUIProvider>{children}</HeroUIProvider>
    </SessionProvider>
  );
}
