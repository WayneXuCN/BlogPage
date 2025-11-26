/**
 * Content Collections 配置
 * 博客内容集合定义
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ============================================================================
// Schema 定义
// ============================================================================

/**
 * 博客文章 Schema
 */
const blogSchema = z.object({
  // 基础元数据
  title: z.string().max(200),
  description: z.string().max(500),
  
  // 时间
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  
  // 分类与标签
  category: z.enum([
    'research',   // 学术研究
    'tutorial',   // 教程
    'thoughts',   // 随想
    'tools',      // 工具
    'life',       // 生活
  ]),
  tags: z.array(z.string()).default([]),
  
  // 媒体
  image: z.string().optional(),
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
  
  // 作者
  author: z.string().optional(),
  
  // 自定义字段
  math: z.boolean().default(false),          // 是否包含数学公式
  toc: z.boolean().default(true),            // 是否显示目录
  comments: z.boolean().default(true),       // 是否启用评论
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
  social: z.object({
    github: z.string().optional(),
    twitter: z.string().optional(),
    orcid: z.string().optional(),
    linkedin: z.string().optional(),
    googleScholar: z.string().optional(),
  }).optional(),
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
 * i18n 翻译 Schema（简化版，允许任意结构）
 */
const i18nSchema = z.record(z.any());

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
    base: './src/content/blog' 
  }),
  schema: blogSchema,
});

/**
 * 作者集合
 * 文件结构：src/content/authors/[id].json
 */
const authors = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/authors' 
  }),
  schema: authorSchema,
});

/**
 * 系列文章元数据集合
 * 文件结构：src/content/series/[id].json
 */
const series = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/series' 
  }),
  schema: seriesSchema,
});

/**
 * i18n 翻译集合
 * 文件结构：src/content/i18n/[lang].json
 */
const i18n = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/i18n' 
  }),
  schema: i18nSchema,
});

// ============================================================================
// 导出集合
// ============================================================================

export const collections = { 
  blog, 
  authors, 
  series, 
  i18n,
};

// ============================================================================
// 类型导出
// ============================================================================

export type BlogSchema = z.infer<typeof blogSchema>;
export type AuthorSchema = z.infer<typeof authorSchema>;
export type SeriesSchema = z.infer<typeof seriesSchema>;
export type I18nSchema = z.infer<typeof i18nSchema>;
