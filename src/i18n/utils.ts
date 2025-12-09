import {
  DEFAULT_LOCALE,
  LOCALE_CODES,
  SUPPORTED_LOCALES,
  type LocaleCode,
  getLocaleConfig,
  stripLocaleFromPath,
  buildPathWithLocale,
  detectLocaleFromBrowserLanguages,
  normalizeLocaleCode,
} from "./config";
import { translations } from "./ui";
import type { TranslationKey } from "./ui";

/**
 * 获取当前语言环境
 */
export type Locale = LocaleCode;

const localePathRegExp = new RegExp(
  `^/(?:${SUPPORTED_LOCALES.map(locale => locale.path).join("|")})(?=/|$)`,
  "i"
);

/**
 * 获取当前语言环境
 */
export function getLocale(): Locale {
  if (typeof window !== "undefined") {
    const { locale } = stripLocaleFromPath(window.location.pathname || "/");
    if (locale) return locale;
    const preferred = detectLocaleFromBrowserLanguages(
      navigator.languages ?? []
    );
    return preferred;
  }
  return DEFAULT_LOCALE.code as Locale;
}

/**
 * 从URL路径获取语言
 */
export function getLangFromUrl(url: URL): Locale {
  const { locale } = stripLocaleFromPath(url.pathname || "/");
  return locale;
}

/**
 * 获取翻译文本
 */
export function t(key: TranslationKey, locale?: Locale): string {
  const currentLocale = normalizeLocaleCode(locale ?? getLocale());
  const fallbackLocale = DEFAULT_LOCALE.code as Locale;
  return (
    translations[currentLocale]?.[key] ??
    translations[fallbackLocale]?.[key] ??
    key
  );
}

/**
 * 获取所有支持的语言
 */
export function getLocales(): Locale[] {
  return LOCALE_CODES as Locale[];
}

/**
 * 获取语言显示名称
 */
export function getLocaleName(locale: Locale): string {
  return getLocaleConfig(locale).name;
}

/**
 * 获取语言路径前缀
 */
export function getLocalePath(locale: Locale): string {
  const localeConfig = getLocaleConfig(locale);
  return localeConfig.path ? `/${localeConfig.path}` : "";
}

/**
 * 获取本地化的URL
 */
export function getLocalizedUrl(path: string, locale?: Locale): string {
  const targetLocale = normalizeLocaleCode(locale ?? getLocale());
  const cleanPath = removeLocalePrefix(path || "/");
  return buildPathWithLocale(cleanPath || "/", targetLocale);
}

/**
 * 判断路径是否为当前语言
 */
export function isCurrentLocalePath(path: string, locale?: Locale): boolean {
  const currentLocale = normalizeLocaleCode(locale ?? getLocale());
  const prefix = getLocalePath(currentLocale);
  return prefix === "" ? !localePathRegExp.test(path) : path.startsWith(prefix);
}

/**
 * 获取相对本地化URL（用于Astro的getRelativeLocaleUrl）
 */
export function getRelativeLocaleUrl(path: string, locale: Locale): string {
  const targetLocale = normalizeLocaleCode(locale);
  const cleanPath = removeLocalePrefix(path || "/") || "/";
  return buildPathWithLocale(cleanPath, targetLocale);
}

/**
 * 获取静态路径生成函数
 */
export function getStaticPaths() {
  return SUPPORTED_LOCALES.map(locale => ({ params: { lang: locale.path } }));
}

function removeLocalePrefix(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath.replace(localePathRegExp, "") || "/";
}
