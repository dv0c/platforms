import Providers from "@/components/Providers";
import "@/styles/globals.css";

import { GeistSans, GeistMono } from "geist/font";

export const metadata = {
  title: "Platforms | Paranoia",
  description: "Create your personal minimal blog using Pranoia",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.className} bg-background`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
