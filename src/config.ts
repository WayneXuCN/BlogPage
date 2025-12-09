export const SITE = {
  website: "https://blog.wenjiexu.site/", // 自己的网站地址
  author: "Wenjie Xu",
  profile: "https://wenjiexu.site/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Blog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4, // 最新文章在首页显示的数量
  postPerPage: 10, // 文章列表每页显示的数量
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "zh-CN", // html lang code. Set this empty and default will be resolved from locales
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;

// 功能开关与配置
export const LATEX = {
  enabled: true,
  katexCdn: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",
} as const;

export const COMMENTS = {
  enabled: true,
  provider: "giscus" as const,
  giscus: {
    repo: "WayneXuCN/BlogComments",
    repoId: "R_kgDOMFTH3A",
    category: "Announcements",
    categoryId: "DIC_kwDOMFTH3M4Cf4dF",
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    lang: "zh-CN",
    theme: "preferred_color_scheme",
    lightTheme: "light",
    darkTheme: "dark",
  },
} as const;

// 多语言配置：从 i18n/config.ts 统一导出
import { SUPPORTED_LOCALES } from "./i18n/config";

export const LANGUAGES = Object.fromEntries(
  SUPPORTED_LOCALES.map(locale => [
    locale.code,
    { name: locale.name, code: locale.code, path: locale.path },
  ])
) as Record<string, { name: string; code: string; path: string }>;

export type LanguageCode = import("./i18n/config").LocaleCode;
