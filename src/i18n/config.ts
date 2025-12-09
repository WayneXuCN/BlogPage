export type LocaleConfig = {
  /** Translation key / code used throughout the site */
  code: string;
  /** URL segment for this locale. Can differ from code (e.g. fr-CA -> fr) */
  path: string;
  /** Human readable name for switcher */
  name: string;
  /** HTML lang attribute value */
  htmlLang: string;
  /** Text direction */
  dir?: "ltr" | "rtl" | "auto";
  /** Day.js locale id for date formatting */
  dayjsLocale?: string;
  /** Intl locale tag used by Intl.DateTimeFormat fallback */
  intlLocale?: string;
  /** Preferred date format when using dayjs */
  dateFormat?: string;
  /** Additional browser language codes that should map to this locale */
  aliases?: string[];
};

export const SUPPORTED_LOCALES: ReadonlyArray<LocaleConfig> = [
  {
    code: "en",
    path: "en",
    name: "English",
    htmlLang: "en",
    dir: "ltr",
    dayjsLocale: "en",
    intlLocale: "en-US",
    dateFormat: "D MMM, YYYY",
    aliases: ["en-US", "en-GB", "en-CA", "en-AU", "en"],
  },
  {
    code: "zh",
    path: "zh",
    name: "中文",
    htmlLang: "zh-CN",
    dir: "ltr",
    dayjsLocale: "zh-cn",
    intlLocale: "zh-CN",
    dateFormat: "YYYY年M月D日",
    aliases: [
      "zh",
      "zh-CN",
      "zh-Hans",
      "zh-CN",
      "zh-hans",
      "zh-cn",
      "zh-tw",
      "zh-hant",
      "zh-TW",
    ],
  },
];

export type LocaleCode = (typeof SUPPORTED_LOCALES)[number]["code"];

export const DEFAULT_LOCALE: LocaleConfig = SUPPORTED_LOCALES[1];

export const LOCALE_CODES = SUPPORTED_LOCALES.map(
  locale => locale.code
) as LocaleCode[];

const localeByCode = new Map<string, LocaleConfig>(
  SUPPORTED_LOCALES.map(locale => [locale.code, locale])
);

const localeByPath = new Map<string, LocaleConfig>(
  SUPPORTED_LOCALES.map(locale => [locale.path, locale])
);

const localeByAlias = new Map<string, LocaleConfig>();
SUPPORTED_LOCALES.forEach(locale => {
  locale.aliases?.forEach(alias => {
    localeByAlias.set(alias.toLowerCase(), locale);
  });
  localeByAlias.set(locale.code.toLowerCase(), locale);
  localeByAlias.set(locale.path.toLowerCase(), locale);
});

export function getLocaleConfig(
  locale: string | undefined | null
): LocaleConfig {
  if (!locale) return DEFAULT_LOCALE;
  return (
    localeByCode.get(locale) ??
    localeByPath.get(locale) ??
    localeByAlias.get(locale.toLowerCase()) ??
    DEFAULT_LOCALE
  );
}

export function getLocaleByPathSegment(
  segment: string | undefined | null
): LocaleConfig {
  if (!segment) return DEFAULT_LOCALE;
  return localeByPath.get(segment) ?? DEFAULT_LOCALE;
}

export function normalizeLocaleCode(input?: string | null): LocaleCode {
  return getLocaleConfig(input).code as LocaleCode;
}

export function detectLocaleFromBrowserLanguages(
  languages: readonly string[] | string[] = []
): LocaleCode {
  for (const lang of languages) {
    const locale = localeByAlias.get(lang.toLowerCase());
    if (locale) return locale.code as LocaleCode;
    const base = lang.split("-")[0];
    const baseMatch = localeByAlias.get(base.toLowerCase());
    if (baseMatch) return baseMatch.code as LocaleCode;
  }
  return DEFAULT_LOCALE.code as LocaleCode;
}

export function stripLocaleFromPath(pathname: string): {
  locale: LocaleCode;
  pathWithoutLocale: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const matched = getLocaleByPathSegment(first);
  if (first && matched) {
    const rest = segments.slice(1).join("/");
    return {
      locale: matched.code as LocaleCode,
      pathWithoutLocale: rest ? `/${rest}` : "/",
    };
  }
  return {
    locale: DEFAULT_LOCALE.code as LocaleCode,
    pathWithoutLocale: pathname || "/",
  };
}

export function buildPathWithLocale(path: string, locale: LocaleCode): string {
  const localeConfig = getLocaleConfig(locale);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const normalized = cleanPath === "/" ? "" : cleanPath;
  const prefix = localeConfig.path ? `/${localeConfig.path}` : "";
  return `${prefix}${normalized}` || "/";
}
