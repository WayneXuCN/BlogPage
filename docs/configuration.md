# 配置指南

本指南将详细介绍如何配置这个 Astro 博客系统。

## 主要配置文件

博客系统的主要配置文件位于 `src/config.ts`，其中包含了站点的基本信息和功能配置。

### 站点配置 (SITE)

```typescript
export const SITE = {
  website: "https://blog.wenjiexu.site/", // 站点 URL
  author: "Wenjie Xu", // 作者名称
  profile: "https://wenjiexu.site/", // 作者个人资料链接
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.", // 站点描述
  title: "Blog", // 站点标题
  ogImage: "astropaper-og.jpg", // 默认 Open Graph 图片
  lightAndDarkMode: true, // 是否启用亮色/暗色模式
  postPerIndex: 4, // 首页显示的文章数量
  postPerPage: 5, // 每页显示的文章数量
  scheduledPostMargin: 15 * 60 * 1000, // 计划发布文章的时间边距（15分钟）
  showArchives: true, // 是否显示归档页面
  showBackButton: true, // 文章详情页是否显示返回按钮
  editPost: {
    enabled: false, // 是否启用编辑文章功能
    text: "Edit page", // 编辑按钮文本
    url: "https://github.com/satnaing/astro-paper/edit/main/", // 编辑链接前缀
  },
  dynamicOgImage: true, // 是否启用动态 OG 图片生成
  dir: "ltr", // 文本方向 ("ltr" | "rtl" | "auto")
  lang: "", // HTML 语言代码，留空则从多语言配置中解析
  timezone: "Asia/Shanghai", // 默认时区 (IANA 格式)
} as const;
```

### LaTeX 支持配置 (LATEX)

```typescript
export const LATEX = {
  enabled: true, // 是否启用 LaTeX 数学公式支持
  katexCdn: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css", // KaTeX CDN 链接
} as const;
```

### 评论系统配置 (COMMENTS)

```typescript
export const COMMENTS = {
  enabled: true, // 是否启用评论功能
  provider: "giscus" as const, // 评论提供商，当前支持 giscus
  giscus: {
    repo: "WayneXuCN/BlogComments", // GitHub 仓库名称
    repoId: "R_kgDOMFTH3A", // 仓库 ID
    category: "Announcements", // 评论分类
    categoryId: "DIC_kwDOMFTH3M4Cf4dF", // 分类 ID
    mapping: "pathname", // 评论映射方式
    strict: "0", // 严格模式
    reactionsEnabled: "1", // 是否启用反应表情
    emitMetadata: "0", // 是否发送元数据
    inputPosition: "top", // 输入框位置
    lang: "zh-CN", // 评论系统语言
    theme: "preferred_color_scheme", // 主题模式
    lightTheme: "light", // 亮色主题
    darkTheme: "dark", // 暗色主题
  },
} as const;
```

## Astro 配置 (astro.config.ts)

Astro 的主要配置文件位于项目根目录的 `astro.config.ts`，其中包含以下主要配置：

### 集成配置

- `@astrojs/react`: React 组件支持
- `@astrojs/sitemap`: 站点地图生成
- `tailwindcss`: Tailwind CSS 支持

### Markdown 配置

- `remark-toc`: 自动生成目录
- `remark-collapse`: 可折叠内容块
- `remark-math` 和 `rehype-katex`: LaTeX 数学公式支持
- `shikiConfig`: 代码高亮配置

### 环境变量配置

项目支持以下环境变量：

```bash
# Google 站点验证 (可选)
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value

# Google Analytics ID (可选)
PUBLIC_GOOGLE_ANALYTICS_ID=your-google-analytics-id
```

## 多语言配置

多语言配置位于 `src/i18n/config.ts`，支持以下语言：

- 英语 (en)
- 中文 (zh)

每种语言的配置包括：
- 代码 (code)
- URL 路径 (path)
- 显示名称 (name)
- HTML 语言标签 (htmlLang)
- 文本方向 (dir)
- 日期格式 (dateFormat)
- 别名 (aliases)

## 内容配置

博客文章的配置位于 `src/content.config.ts`，定义了文章的元数据结构，包括：

- 作者 (author)
- 发布日期 (pubDatetime)
- 修改日期 (modDatetime)
- 标题 (title)
- slug (slug)
- 是否特色文章 (featured)
- 是否草稿 (draft)
- 分类 (category)
- 标签 (tags)
- OG 图片 (ogImage)
- 描述 (description)
- 规范 URL (canonicalURL)
- 语言 (lang)

## 构建和部署配置

在 `package.json` 中定义了以下主要脚本：

- `dev`: 启动开发服务器
- `build`: 构建生产版本
- `preview`: 预览构建结果
- `format`: 代码格式化
- `lint`: 代码检查

构建过程会自动生成站点地图、RSS 订阅，并集成 Pagefind 搜索功能。