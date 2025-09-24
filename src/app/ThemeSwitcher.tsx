"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 rounded-full transition-all border-2 bg-gray-700 border-gray-500 w-10 h-10" />
    );
  }

  return (
    <button
      className={`p-2 rounded-full transition-all border-2 focus:outline-none 
        ${theme === "dark" ? "bg-gray-700 text-white hover:bg-gray-600 border-gray-500" : "bg-yellow-100 text-gray-900 hover:bg-yellow-200 border-yellow-400"}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-blue-700" />
      )}
    </button>
  );
}
