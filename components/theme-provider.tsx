
"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextType = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: "class" | "data-theme";
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "mentorlagbe-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);

  const [resolvedTheme, setResolvedTheme] = React.useState<
    "light" | "dark"
  >("light");

  // Load saved theme preference
  React.useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme | null;

      if (
        savedTheme === "light" ||
        savedTheme === "dark" ||
        savedTheme === "system"
      ) {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.error("Unable to load saved theme:", error);
    }
  }, [storageKey]);

  // Apply theme and follow system preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const updateTheme = () => {
      const systemTheme = mediaQuery.matches ? "dark" : "light";

      const nextTheme =
        theme === "system" && enableSystem
          ? systemTheme
          : theme === "dark"
            ? "dark"
            : "light";

      setResolvedTheme(nextTheme);

      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(nextTheme);
    };

    updateTheme();

    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, [theme, enableSystem]);

  // Save theme preference
  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme);

      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        console.error("Unable to save theme:", error);
      }
    },
    [storageKey]
  );

  // Keyboard shortcut: D
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      // FIX: Check that event.key is a string before using toLowerCase()
      if (
        typeof event.key !== "string" ||
        event.key.toLowerCase() !== "d"
      ) {
        return;
      }

      // Don't change theme while typing
      if (isTypingTarget(event.target)) {
        return;
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [resolvedTheme, setTheme]);

  const contextValue = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
