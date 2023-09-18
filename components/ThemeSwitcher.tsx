"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Tabs, TabsList } from "./ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme}>
      <TabsList className=" px-2 gap-2 border dark:border-neutral-800 dark:bg-[#303030]">
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          <SunIcon
            className="h-[1.2rem] w-[1.2rem] 
             dark:bg-[#dfdbdb] bg-[#ffff00] transition-all ease-in  duration-500 rounded-full"
          />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <MoonIcon
            className="h-[1.2rem] w-[1.2rem] bg-[#dfdbdb]  
              dark:rotate-0  dark:bg-[#ffff00] rotate-90
            } transition-all ease-in  duration-700 rounded-full"
          />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
