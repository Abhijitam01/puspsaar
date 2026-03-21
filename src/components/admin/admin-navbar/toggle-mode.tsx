"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ModeToggle: React.FC = () => {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid hydration issues

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full border border-border bg-muted hover:bg-accent hover:cursor-pointer transition-all"
          aria-label="Toggle theme"
        >
          <Sun
            className={`absolute h-[1.2rem] w-[1.2rem] text-foreground transition-all ${
              resolvedTheme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"
            }`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] text-foreground transition-all ${
              resolvedTheme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border-border">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2 cursor-pointer ${theme === 'light' ? 'bg-accent' : ''}`}
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 cursor-pointer ${theme === 'dark' ? 'bg-accent' : ''}`}
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`flex items-center gap-2 cursor-pointer ${theme === 'system' ? 'bg-accent' : ''}`}
        >
          <Monitor className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
