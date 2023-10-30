"use client";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children, ...props }) => {
  return (
    <NextUIProvider>
      <NextThemesProvider {...props} attribute={"class"} defaultTheme="dark">
        <SessionProvider>{children}</SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default Providers;
