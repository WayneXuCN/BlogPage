import Giscus, { type GiscusProps, type Theme } from "@giscus/react";
import { useEffect, useMemo, useState } from "react";
import { COMMENTS } from "@/config";

const REQUIRED_FIELDS = ["repo", "repoId", "category", "categoryId"] as const;

type RequiredField = (typeof REQUIRED_FIELDS)[number];

type GiscusConfig = {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
  mapping?: GiscusProps["mapping"];
  reactionsEnabled?: GiscusProps["reactionsEnabled"];
  emitMetadata?: GiscusProps["emitMetadata"];
  inputPosition?: GiscusProps["inputPosition"];
  lang?: GiscusProps["lang"];
  theme?: GiscusProps["theme"];
  lightTheme?: Theme;
  darkTheme?: Theme;
  [key: string]: unknown;
};

function hasRequired(config: GiscusConfig) {
  return REQUIRED_FIELDS.every(field => {
    const value = config[field as RequiredField];
    return typeof value === "string" && value.trim().length > 0;
  });
}

function getInitialTheme() {
  if (typeof window === "undefined") return "light" as Theme;
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored as Theme;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function Comments() {
  if (!COMMENTS.enabled || COMMENTS.provider !== "giscus") return null;

  const giscus = COMMENTS.giscus as unknown as GiscusConfig;
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  const hasConfig = useMemo(
    () => hasRequired(giscus as GiscusConfig),
    [giscus]
  );
  const lightTheme = giscus.lightTheme || "light";
  const darkTheme = giscus.darkTheme || "dark";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemTheme = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemTheme);

    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme((prev: Theme) => (prev === "dark" ? "light" : "dark"));
    };
    themeButton?.addEventListener("click", handleClick);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemTheme);
      themeButton?.removeEventListener("click", handleClick);
    };
  }, []);

  if (!hasConfig) return null;

  const { lightTheme: _l, darkTheme: _d, ...rest } = giscus;
  const resolvedTheme =
    theme === "dark" ? (darkTheme as Theme) : (lightTheme as Theme);

  return (
    <div className="mt-10 rounded-lg border border-border/70 bg-background/70 px-4 py-5 shadow-sm dark:border-border/60">
      <Giscus {...(rest as GiscusProps)} theme={resolvedTheme} />
    </div>
  );
}
