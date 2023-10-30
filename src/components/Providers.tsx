"use client";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children, ...props }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextThemesProvider {...props} attribute={"class"} defaultTheme="dark">
          <SessionProvider>{children}</SessionProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
