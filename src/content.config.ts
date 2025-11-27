/**
 * Content Collections 配置
 * 博客内容集合定义
 */
import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

// ============================================================================
// Schema 定义
// ============================================================================

/**
 * 博客文章 Schema
 * 支持本地图片（相对路径）和远程图片（URL）
 */
const blogSchema = ({ image }: { image: () => z.ZodType<unknown> }) =>
  z.object({
    // 基础元数据
    title: z.string().max(200),
    description: z.string().max(500),

    // 时间
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    // 分类与标签
    category: z.enum([
      'research', // 学术研究
      'tutorial', // 教程
      'thoughts', // 随想
      'tools', // 工具
      'life', // 生活
    ]),
    tags: z.array(z.string()).default([]),

    // 媒体 - 支持本地图片(image())或远程URL(string)
    image: z.union([image(), z.string().url()]).optional(),
    imageAlt: z.string().optional(),

    // 状态控制
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // 多语言
    lang: z.enum(['zh', 'en']).default('zh'),

    // 系列文章
    series: z.string().optional(),
    seriesOrder: z.number().optional(),

    // 学术特有字段
    doi: z.string().optional(),
    citation: z.string().optional(),
    venue: z.string().optional(),

    // SEO
    canonicalUrl: z.string().url().optional(),
    keywords: z.array(z.string()).optional(),

    // 作者 - 支持字符串或引用
    author: z.string().optional(),

    // 显示控制
    math: z.boolean().default(false), // 是否包含数学公式
    toc: z.boolean().default(true), // 是否显示目录
    comments: z.boolean().default(true), // 是否启用评论

    // 文章样式（可覆盖全局配置）
    style: z.enum(['academic', 'minimal', 'magazine', 'distill']).optional(),
    tocPosition: z.enum(['left', 'right', 'none']).optional(),
  });

/**
 * 作者 Schema
 */
const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  nameEn: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  bioEn: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  social: z
    .object({
      github: z.string().optional(),
      twitter: z.string().optional(),
      orcid: z.string().optional(),
      linkedin: z.string().optional(),
      googleScholar: z.string().optional(),
    })
    .optional(),
});

/**
 * 系列文章元数据 Schema
 */
const seriesSchema = z.object({
  id: z.string(),
  title: z.string(),
  titleEn: z.string().optional(),
  description: z.string(),
  descriptionEn: z.string().optional(),
  image: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  status: z.enum(['ongoing', 'completed', 'paused']).default('ongoing'),
});

/**
 * 页面内容 Schema
 * 用于关于页、联系页等静态页面的多语言内容
 */
const pageSchema = z.object({
  lang: z.enum(['zh', 'en']),
  title: z.string(),
  description: z.string(),
  subtitle: z.string().optional(),
});

/**
 * i18n 翻译 Schema
 */
const i18nSchema = z.object({
  site: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
  }),
  nav: z.object({
    home: z.string(),
    blog: z.string(),
    archive: z.string(),
    tags: z.string(),
    about: z.string(),
    search: z.string(),
  }),
  blog: z.object({
    title: z.string(),
    allPosts: z.string(),
    featuredPosts: z.string(),
    recentPosts: z.string(),
    readMore: z.string(),
    readingTime: z.string(),
    publishedOn: z.string(),
    updatedOn: z.string(),
    author: z.string(),
    category: z.string(),
    tags: z.string(),
    noPosts: z.string(),
    searchPlaceholder: z.string(),
    searchNoResults: z.string(),
    backToBlog: z.string(),
  }),
  archive: z.object({
    title: z.string(),
    description: z.string(),
    postsCount: z.string(),
  }),
  tags: z.object({
    title: z.string(),
    description: z.string(),
    tagsCount: z.string(),
    noTags: z.string(),
  }),
  category: z.object({
    title: z.string(),
    research: z.string(),
    tutorial: z.string(),
    thoughts: z.string(),
    tools: z.string(),
    life: z.string(),
  }),
  series: z.object({
    title: z.string(),
    progress: z.string(),
    previous: z.string(),
    next: z.string(),
    viewAll: z.string(),
  }),
  toc: z.object({
    title: z.string(),
    backToTop: z.string(),
  }),
  comments: z.object({
    title: z.string(),
    loading: z.string(),
  }),
  share: z.object({
    title: z.string(),
    twitter: z.string(),
    linkedin: z.string(),
    copyLink: z.string(),
    copied: z.string(),
  }),
  relatedPosts: z.object({
    title: z.string(),
    noRelated: z.string(),
  }),
  pagination: z.object({
    previous: z.string(),
    next: z.string(),
    page: z.string(),
  }),
  footer: z.object({
    copyright: z.string(),
    rss: z.string(),
    sitemap: z.string(),
    icp: z.object({
      text: z.string(),
      url: z.string(),
    }).optional(),
    quickLinks: z.string(),
    social: z.string(),
  }),
  theme: z.object({
    light: z.string(),
    dark: z.string(),
    system: z.string(),
  }),
  language: z.object({
    zh: z.string(),
    en: z.string(),
    switchTo: z.string(),
  }),
  common: z.object({
    loading: z.string(),
    error: z.string(),
    retry: z.string(),
    close: z.string(),
    open: z.string(),
    more: z.string(),
    less: z.string(),
  }),
});

/**
 * 站点配置 Schema
 */
const configSchema = z.object({
  // 站点基础信息
  url: z.string().url(),
  title: z.object({
    zh: z.string(),
    en: z.string(),
  }),
  description: z.object({
    zh: z.string(),
    en: z.string(),
  }),
  author: z.object({
    zh: z.string(),
    en: z.string(),
  }),

  // 作者信息
  authorInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
    bio: z.object({
      zh: z.string(),
      en: z.string(),
    }),
  }),

  // 文章样式配置
  post: z.object({
    style: z.enum(['academic', 'minimal', 'magazine', 'distill']).default('academic'),
    tocPosition: z.enum(['left', 'right', 'none']).default('right'),
    showCoverImage: z.boolean().default(true),
    showAuthor: z.boolean().default(true),
    showUpdatedDate: z.boolean().default(true),
    codeTheme: z.enum(['github', 'oneDark', 'dracula', 'nord']).default('github'),
  }),

  // 首页配置
  home: z.object({
    layout: z.enum(['classic', 'grid', 'magazine']),
    postsPerPage: z.number().int().positive(),
    showFeatured: z.boolean(),
    featuredCount: z.number().int().min(0),
    carouselAutoPlay: z.boolean(),
    carouselInterval: z.number().int().min(1000),
  }),

  // 布局配置
  layouts: z.object({
    classic: z.object({
      showExcerpt: z.boolean(),
      excerptLength: z.number().int().positive(),
    }),
    grid: z.object({
      columns: z.number().int().min(2).max(4),
      showTags: z.boolean(),
    }),
    magazine: z.object({
      heroPost: z.boolean(),
      sidebarPosts: z.number().int().min(0),
      categorySections: z.boolean(),
      postsPerCategory: z.number().int().min(1),
    }),
  }),

  // 功能开关
  features: z.object({
    comments: z.boolean(),
    search: z.boolean(),
    rss: z.boolean(),
    toc: z.boolean(),
    relatedPosts: z.boolean(),
    readingTime: z.boolean(),
    seriesNav: z.boolean(),
    darkMode: z.boolean(),
    readingProgress: z.boolean(),
    socialShare: z.boolean(),
  }),

  // Giscus 评论配置
  giscus: z.object({
    repo: z.string(),
    repoId: z.string(),
    category: z.string(),
    categoryId: z.string(),
    mapping: z.string(),
    lang: z.string(),
    strict: z.boolean().optional().default(false),
    reactionsEnabled: z.boolean().optional().default(true),
    emitMetadata: z.boolean().optional().default(false),
    inputPosition: z.enum(['top', 'bottom']).optional().default('bottom'),
  }),

  // 导航配置
  nav: z.array(
    z.object({
      key: z.string(),
      href: z.string(),
      icon: z.string().optional(),
    })
  ),

  // 社交链接
  social: z.array(
    z.object({
      platform: z.string(),
      url: z.string().url(),
      icon: z.string(),
    })
  ),

  // 分类配置
  categories: z.object({
    research: z.object({
      name: z.object({ zh: z.string(), en: z.string() }),
      description: z.object({ zh: z.string(), en: z.string() }),
      icon: z.string(),
      color: z.string(),
    }),
    tutorial: z.object({
      name: z.object({ zh: z.string(), en: z.string() }),
      description: z.object({ zh: z.string(), en: z.string() }),
      icon: z.string(),
      color: z.string(),
    }),
    thoughts: z.object({
      name: z.object({ zh: z.string(), en: z.string() }),
      description: z.object({ zh: z.string(), en: z.string() }),
      icon: z.string(),
      color: z.string(),
    }),
    tools: z.object({
      name: z.object({ zh: z.string(), en: z.string() }),
      description: z.object({ zh: z.string(), en: z.string() }),
      icon: z.string(),
      color: z.string(),
    }),
    life: z.object({
      name: z.object({ zh: z.string(), en: z.string() }),
      description: z.object({ zh: z.string(), en: z.string() }),
      icon: z.string(),
      color: z.string(),
    }),
  }),
});

// ============================================================================
// 集合定义
// ============================================================================

/**
 * 博客文章集合
 * 文件结构：src/content/blog/[lang]/[year]/[slug].md(x)
 */
const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),
  schema: blogSchema,
});

/**
 * 作者集合
 * 文件结构：src/content/authors/[id].yaml
 */
const authors = defineCollection({
  loader: glob({
    pattern: '**/*.yaml',
    base: './src/content/authors',
  }),
  schema: authorSchema,
});

/**
 * 系列文章元数据集合
 * 文件结构：src/content/series/[id].yaml
 */
const series = defineCollection({
  loader: glob({
    pattern: '**/*.yaml',
    base: './src/content/series',
  }),
  schema: seriesSchema,
});

/**
 * i18n 翻译集合
 * 文件结构：src/content/i18n/[lang].yaml
 */
const i18n = defineCollection({
  loader: glob({
    pattern: '**/*.yaml',
    base: './src/content/i18n',
  }),
  schema: i18nSchema,
});

/**
 * 页面内容集合
 * 文件结构：src/content/pages/[page]/[lang].mdx
 */
const pages = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/pages',
  }),
  schema: pageSchema,
});

/**
 * 站点配置集合
 * 文件结构：src/content/config.toml
 */
const config = defineCollection({
  loader: glob({
    pattern: '*.toml',
    base: './src/content',
  }),
  schema: configSchema,
});

// ============================================================================
// 导出集合
// ============================================================================

export const collections = {
  blog,
  authors,
  series,
  i18n,
  pages,
  config,
};

// ============================================================================
// 类型导出
// ============================================================================

// BlogSchema 使用 ReturnType 获取函数返回的 schema 的推断类型
export type BlogSchema = z.infer<ReturnType<typeof blogSchema>>;
export type AuthorSchema = z.infer<typeof authorSchema>;
export type SeriesSchema = z.infer<typeof seriesSchema>;
export type PageSchema = z.infer<typeof pageSchema>;
export type I18nSchema = z.infer<typeof i18nSchema>;
export type ConfigSchema = z.infer<typeof configSchema>;
