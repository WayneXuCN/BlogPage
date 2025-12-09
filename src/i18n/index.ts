// 导出翻译相关功能
export { translations } from "./ui";
export type { TranslationKey, Locale } from "./ui";

// 导出工具函数
export {
  getLocale,
  t,
  getLocales,
  getLocaleName,
  getLocalePath,
  getLocalizedUrl,
  isCurrentLocalePath,
  getRelativeLocaleUrl,
  getLangFromUrl,
} from "./utils";
