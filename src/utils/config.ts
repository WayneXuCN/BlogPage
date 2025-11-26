import { getEntry } from 'astro:content';

/**
 * 获取站点配置
 */
export async function getSiteConfig() {
  try {
    const configEntry = await getEntry('config', 'site');
    return configEntry?.data;
  } catch (error) {
    console.error('Failed to load site config:', error);
    return null;
  }
}

/**
 * 获取分类配置
 */
export async function getCategoryConfig(category: string) {
  const config = await getSiteConfig();
  return config?.categories[category] || config?.categories.thoughts;
}

/**
 * 获取所有分类
 */
export async function getAllCategories() {
  const config = await getSiteConfig();
  if (!config?.categories) return [];

  return Object.entries(config.categories).map(([key, value]) => ({
    key,
    ...value,
  }));
}

/**
 * 获取导航项（根据语言）- 确保所有链接都有尾部斜杠
 */
export async function getNavItems(locale: 'zh' | 'en' = 'zh') {
  const config = await getSiteConfig();
  if (!config?.nav) return [];

  const labels: Record<string, { zh: string; en: string }> = {
    home: { zh: '首页', en: 'Home' },
    categories: { zh: '分类', en: 'Categories' },
    archive: { zh: '归档', en: 'Archive' },
    about: { zh: '关于', en: 'About' },
  };

  return config.nav.map(item => ({
    ...item,
    label: labels[item.key]?.[locale] || item.key,
    href: `/${locale}${item.href}`,
  }));
}

/**
 * 获取当前布局配置
 */
export async function getLayoutConfig() {
  const config = await getSiteConfig();
  return config?.home;
}

/**
 * 计算阅读时间（分钟）
 */
export function calculateReadingTime(content: string): number {
  const text = content
    .replace(/<[^>]*>/g, '')
    .replace(/[#*`~\[\]()]/g, '')
    .trim();

  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;

  const minutes = chineseChars / 400 + englishWords / 200;

  return Math.max(1, Math.ceil(minutes));
}

/**
 * 格式化日期 - 支持精确到秒
 */
export function formatDate(
  date: Date,
  locale: 'zh' | 'en' = 'zh',
  includeTime: boolean = false
): string {
  const localeMap = {
    zh: 'zh-CN',
    en: 'en-US',
  };

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }

  return date.toLocaleDateString(localeMap[locale], options);
}

/**
 * 格式化精确时间（ISO格式 + 友好显示）
 */
export function formatDateTime(
  date: Date,
  locale: 'zh' | 'en' = 'zh'
): { iso: string; display: string } {
  const localeMap = { zh: 'zh-CN', en: 'en-US' };

  return {
    iso: date.toISOString(),
    display: date.toLocaleString(localeMap[locale], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

/**
 * 生成文章 URL - 确保包含尾部斜杠
 */
export function getPostUrl(slug: string, locale: 'zh' | 'en' = 'zh', year?: number): string {
  // slug 格式可能是 "zh/post-name" 或 "post-name"
  const slugParts = slug.split('/');
  const cleanSlug = slugParts.length > 1 ? slugParts.slice(1).join('/') : slug;

  if (year) {
    return `/${locale}/blog/${year}/${cleanSlug}/`;
  }
  return `/${locale}/blog/${cleanSlug}/`;
}

/**
 * 生成分类页 URL
 */
export function getCategoryUrl(category: string, locale: 'zh' | 'en' = 'zh'): string {
  return `/${locale}/blog/category/${category}/`;
}

/**
 * 生成标签页 URL
 */
export function getTagUrl(tag: string, locale: 'zh' | 'en' = 'zh'): string {
  return `/${locale}/blog/tag/${encodeURIComponent(tag)}/`;
}

/**
 * 生成归档页 URL
 */
export function getArchiveUrl(locale: 'zh' | 'en' = 'zh', year?: number): string {
  if (year) {
    return `/${locale}/blog/archive/${year}/`;
  }
  return `/${locale}/blog/archive/`;
}

/**
 * 生成 RSS URL（不带尾部斜杠，因为是 .xml 文件）
 */
export function getRssUrl(locale: 'zh' | 'en' = 'zh'): string {
  return `/${locale}/rss.xml`;
}
