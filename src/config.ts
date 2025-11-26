/**
 * 站点配置文件
 * Site Configuration
 */

// ============================================================================
// 类型定义
// ============================================================================

/** 首页布局类型 */
export type HomeLayout = 'classic' | 'grid' | 'magazine';

/** 支持的语言 */
export type Locale = 'zh' | 'en';

/** 文章分类 */
export type CategoryKey = 
  | 'research'    // 学术研究
  | 'tutorial'    // 教程
  | 'thoughts'    // 随想
  | 'tools'       // 工具
  | 'life';       // 生活

/** 站点配置 */
export interface SiteConfig {
  url: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  author: { zh: string; en: string };
  authorInfo: {
    name: string;
    email: string;
    avatar: string;
    bio: { zh: string; en: string };
  };
  home: {
    layout: HomeLayout;
    postsPerPage: number;
    showFeatured: boolean;
    featuredCount: number;
    carouselAutoPlay: boolean;
    carouselInterval: number;
  };
  layouts: {
    classic: { showExcerpt: boolean; excerptLength: number };
    grid: { columns: number; showTags: boolean };
    magazine: { heroPost: boolean; sidebarPosts: number; categorySections: boolean; postsPerCategory: number };
  };
  features: {
    comments: boolean;
    search: boolean;
    rss: boolean;
    toc: boolean;
    relatedPosts: boolean;
    readingTime: boolean;
    seriesNav: boolean;
    darkMode: boolean;
    readingProgress: boolean;
    socialShare: boolean;
  };
  giscus: {
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
    mapping: string;
    lang: string;
  };
  nav: Array<{
    key: string;
    href: string;
    icon?: string;
  }>;
  social: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  categories: {
    [key in CategoryKey]: {
      name: { zh: string; en: string };
      description: { zh: string; en: string };
      icon: string;
      color: string;
    };
  };
}

// ============================================================================
// 默认配置
// ============================================================================

export const siteConfig: SiteConfig = {
  url: 'https://blog.wenjiexu.site',
  
  title: {
    zh: '徐文杰的博客',
    en: "Wenjie Xu's Blog",
  },
  
  description: {
    zh: '分享学术研究、技术教程与生活感悟',
    en: 'Sharing academic research, tutorials, and life reflections',
  },
  
  author: {
    zh: '徐文杰',
    en: 'Wenjie Xu',
  },
  
  authorInfo: {
    name: '徐文杰',
    email: 'wenjie.xu.cn@outlook.com',
    avatar: '/assets/img/prof_pic.png',
    bio: {
      zh: '中国科学院博士研究生，研究方向为复杂系统风险管理与韧性评估',
      en: 'PhD candidate at Chinese Academy of Sciences, focusing on complex system risk management and resilience assessment',
    },
  },
  
  home: {
    layout: 'magazine',
    postsPerPage: 10,
    showFeatured: true,
    featuredCount: 5,
    carouselAutoPlay: true,
    carouselInterval: 5000, // 5秒
  },
  
  layouts: {
    classic: { showExcerpt: true, excerptLength: 200 },
    grid: { columns: 3, showTags: true },
    magazine: { heroPost: true, sidebarPosts: 4, categorySections: false, postsPerCategory: 4 },
  },
  
  features: {
    comments: true,
    search: true,
    rss: true,
    toc: true,
    relatedPosts: true,
    readingTime: true,
    seriesNav: true,
    darkMode: true,
    readingProgress: true,
    socialShare: true,
  },
  
  // giscus 配置 - 需要替换为实际值
  giscus: {
    repo: 'WayneXuCN/blog-comments',
    repoId: 'R_kgDOxxxxxx',
    category: 'Announcements',
    categoryId: 'DIC_kwDOxxxxxx',
    mapping: 'pathname',
    lang: 'zh-CN',
  },
  
  nav: [
    { key: 'home', href: '/blog/', icon: 'home' },
    { key: 'categories', href: '/blog/categories/', icon: 'folder' },
    { key: 'archive', href: '/blog/archive/', icon: 'archive' },
    { key: 'about', href: '/about/', icon: 'user' },
  ],
  
  social: [
    { platform: 'GitHub', url: 'https://github.com/WayneXuCN', icon: 'fab fa-github' },
    { platform: 'Google Scholar', url: 'https://scholar.google.com/citations?user=eWTidmsAAAAJ', icon: 'fas fa-graduation-cap' },
    { platform: 'Email', url: 'mailto:wenjie.xu.cn@outlook.com', icon: 'fas fa-envelope' },
  ],
  
  categories: {
    research: {
      name: { zh: '学术研究', en: 'Research' },
      description: { zh: '学术论文、研究进展与科研心得', en: 'Academic papers, research progress and insights' },
      icon: '🔬',
      color: 'blue',
    },
    tutorial: {
      name: { zh: '技术教程', en: 'Tutorial' },
      description: { zh: '编程技巧、工具使用与实践指南', en: 'Programming tips, tools and practical guides' },
      icon: '📚',
      color: 'green',
    },
    thoughts: {
      name: { zh: '随想杂谈', en: 'Thoughts' },
      description: { zh: '思考感悟与观点分享', en: 'Reflections and perspectives' },
      icon: '💭',
      color: 'purple',
    },
    tools: {
      name: { zh: '工具推荐', en: 'Tools' },
      description: { zh: '好用的软件、服务与资源推荐', en: 'Useful software, services and resources' },
      icon: '🛠️',
      color: 'orange',
    },
    life: {
      name: { zh: '生活记录', en: 'Life' },
      description: { zh: '日常生活、旅行与随笔', en: 'Daily life, travel and essays' },
      icon: '🌱',
      color: 'pink',
    },
  },
};

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 获取分类配置
 */
export function getCategoryConfig(category: CategoryKey) {
  return siteConfig.categories[category] || siteConfig.categories.thoughts;
}

/**
 * 获取所有分类
 */
export function getAllCategories() {
  return Object.entries(siteConfig.categories).map(([key, value]) => ({
    key: key as CategoryKey,
    ...value,
  }));
}

/**
 * 获取导航项（根据语言）- 确保所有链接都有尾部斜杠
 */
export function getNavItems(locale: Locale = 'zh') {
  const labels: Record<string, { zh: string; en: string }> = {
    home: { zh: '首页', en: 'Home' },
    categories: { zh: '分类', en: 'Categories' },
    archive: { zh: '归档', en: 'Archive' },
    about: { zh: '关于', en: 'About' },
  };
  
  return siteConfig.nav.map(item => ({
    ...item,
    label: labels[item.key]?.[locale] || item.key,
    href: `/${locale}${item.href}`,
  }));
}

/**
 * 获取当前布局配置
 */
export function getLayoutConfig() {
  return siteConfig.home;
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
export function formatDate(date: Date, locale: Locale = 'zh', includeTime: boolean = false): string {
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
export function formatDateTime(date: Date, locale: Locale = 'zh'): { iso: string; display: string } {
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
export function getPostUrl(slug: string, locale: Locale = 'zh', year?: number): string {
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
export function getCategoryUrl(category: CategoryKey, locale: Locale = 'zh'): string {
  return `/${locale}/blog/category/${category}/`;
}

/**
 * 生成标签页 URL
 */
export function getTagUrl(tag: string, locale: Locale = 'zh'): string {
  return `/${locale}/blog/tag/${encodeURIComponent(tag)}/`;
}

/**
 * 生成归档页 URL
 */
export function getArchiveUrl(locale: Locale = 'zh', year?: number): string {
  if (year) {
    return `/${locale}/blog/archive/${year}/`;
  }
  return `/${locale}/blog/archive/`;
}

/**
 * 生成 RSS URL（不带尾部斜杠，因为是 .xml 文件）
 */
export function getRssUrl(locale: Locale = 'zh'): string {
  return `/${locale}/rss.xml`;
}

export default siteConfig;
