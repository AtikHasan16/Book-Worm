import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";

const fraunses = Fraunces({
  variable: "--font-fraunses",
  subsets: ["latin"],
});

const dmsans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "BookWorm",
  description: "Your personal book tracking application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${fraunses.variable} ${dmsans.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
