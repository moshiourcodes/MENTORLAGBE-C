"use client";

import * as React from "react";

import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextThemes,
} from "next-themes";

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

/**
 * Public hook used across the app. Kept intentionally identical to the
 * previous custom API so existing callers keep working unchanged.
 */
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

function isTheme(value: string | undefined): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

/**
 * Bridges `next-themes` into the app-wide context and keeps the
 * legacy "D" keyboard shortcut for toggling the theme.
 */
function ThemeBridge({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme, setTheme: setNextTheme } = useNextThemes();

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      setNextTheme(nextTheme);
    },
    [setNextTheme]
  );

  const resolved: "light" | "dark" = resolvedTheme === "dark" ? "dark" : "light";

  const contextValue = React.useMemo<ThemeContextType>(
    () => ({
      theme: isTheme(theme) ? theme : "system",
      resolvedTheme: resolved,
      setTheme,
    }),
    [theme, resolved, setTheme]
  );

  // Keyboard shortcut: D (ignored while typing)
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (
        typeof event.key !== "string" ||
        event.key.toLowerCase() !== "d"
      ) {
        return;
      }

      if (isTypingTarget(event.target)) {
        return;
      }

      setTheme(resolved === "dark" ? "light" : "dark");
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [resolved, setTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  storageKey = "mentorlagbe-theme",
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey={storageKey}
      enableColorScheme
    >
      <ThemeBridge>{children}</ThemeBridge>
    </NextThemesProvider>
  );
}
