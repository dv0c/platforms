"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { Icons } from "./Icons";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      defaultSelected={theme === "light" ? false : true}
      size="sm"
      color="default"
      onValueChange={() => setTheme(theme === "light" ? "dark" : "light")}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Icons.MoonIcon className={className} />
        ) : (
          <Icons.SunIcon className={className} />
        )
      }
    />
  );
}
