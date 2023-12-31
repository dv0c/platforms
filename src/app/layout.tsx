import Providers from "@/components/Providers";
import "@/styles/globals.scss";

import { GeistSans } from "geist/font";
import { Toaster } from "sonner";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.className} bg-background`}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
