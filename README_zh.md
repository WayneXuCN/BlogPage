<p align="center">
  <img src="public/assets/img/website.png" alt="博客预览" width="800" />
</p>

<h1 align="center">博客</h1>

<p align="center">
  <strong>使用 Astro 5 构建的现代化响应式博客</strong>
</p>

<p align="center">
  <a href="https://github.com/WayneXuCN/BlogPage/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="许可证" />
  </a>
  <a href="https://astro.build/">
    <img src="https://img.shields.io/badge/Astro-5.x-ff5d01.svg?logo=astro" alt="Astro" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind-3.x-38bdf8.svg?logo=tailwindcss" alt="Tailwind CSS" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript" alt="TypeScript" />
  </a>
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#配置说明">配置说明</a> •
  <a href="#内容管理">内容管理</a> •
  <a href="#部署方式">部署方式</a>
</p>

<p align="center">
  <a href="README.md">English</a> | <a href="README_zh.md">中文</a>
</p>

---

## 功能特性

| 功能 | 描述 |
|------|------|
| **多种布局** | 三种首页布局：经典列表、网格卡片和杂志风格 |
| **国际化支持** | 内置中英文支持 |
| **响应式设计** | 移动端优先设计，适配所有设备 |
| **深色模式** | 自动跟随系统偏好切换主题 |
| **博客功能** | 分类、标签、归档、系列文章和精选文章 |
| **评论系统** | 集成 Giscus 评论系统 |
| **RSS 订阅** | 自动生成多语言 RSS 订阅源 |
| **搜索功能** | 内置搜索功能 |
| **数学公式支持** | 集成 KaTeX 数学公式渲染 |
| **图表支持** | 集成 Mermaid 图表渲染 |
| **阅读进度条** | 文章阅读进度指示 |
| **社交分享** | 社交媒体分享按钮 |

## 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) 18+ 或 [Bun](https://bun.sh/) 1.0+

### 创建博客

```bash
# 克隆仓库
git clone https://github.com/WayneXuCN/BlogPage.git my-blog
cd my-blog

# 安装依赖
npm install
# 或
bun install

# 启动开发服务器
npm run dev
# 或
bun run dev
```

打开 [http://localhost:4321](http://localhost:4321) 查看你的博客。

### 构建生产版本

```bash
npm run build
# 或
bun run build
```

构建输出将生成在 `dist/` 目录中，可以部署到任何静态托管平台。

## 项目结构

```text
BlogPage/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── blog/           # 博客专用组件
│   │   └── layouts/        # 布局组件
│   ├── content/            # 内容集合
│   │   ├── blog/           # 博客文章
│   │   ├── config/         # 站点配置
│   │   ├── authors/        # 作者信息
│   │   ├── series/         # 系列文章元数据
│   │   └── i18n/           # 翻译文件
│   ├── layouts/            # 页面布局
│   ├── pages/              # 页面路由
│   ├── utils/              # 工具函数
│   └── content.config.ts   # 内容集合配置
├── public/                 # 静态资源
├── astro.config.mjs        # Astro 配置
├── tailwind.config.mjs     # Tailwind 配置
└── package.json            # 项目依赖
```

## 配置说明

### 站点配置

所有配置都通过 `src/content/config/site.json` 文件管理。你可以编辑这个文件来自定义你的博客。

#### 布局切换

要更改首页布局，修改 `home.layout` 属性：

```json
{
  "home": {
    "layout": "magazine", // 可选值: 'classic', 'grid', 'magazine'
    "postsPerPage": 10,
    "showFeatured": true,
    "featuredCount": 5,
    "carouselAutoPlay": true,
    "carouselInterval": 5000
  }
}
```

#### 可用布局

1. **Classic** - 传统列表布局，带有精选区域
2. **Grid** - 卡片式网格布局
3. **Magazine** - 杂志风格布局，带有轮播图（默认）

#### 其他配置选项

- `url`: 站点 URL
- `title`: 站点标题（多语言）
- `description`: 站点描述（多语言）
- `author`: 作者信息
- `features`: 启用/禁用评论、搜索、RSS 等功能
- `giscus`: Giscus 评论配置
- `nav`: 导航菜单项
- `social`: 社交媒体链接
- `categories`: 博客分类

## 内容管理

### 博客文章

博客文章存储在 `src/content/blog/` 目录中，结构如下：

```text
src/content/blog/
├── zh/                    # 中文文章
│   ├── 2024/              # 年份
│   │   └── post-slug.md    # 博客文章
│   └── ...
└── en/                    # 英文文章
    ├── 2024/              # 年份
    │   └── post-slug.md    # 博客文章
    └── ...
```

每篇文章都有包含元数据的前置内容：

```yaml
title: "文章标题"
description: "文章描述"
pubDate: 2024-01-01
category: tutorial
tags: [astro, blog]
image: /assets/img/post-image.jpg
featured: true
lang: zh
```

### 分类和标签

分类在 `src/content/config/site.json` 中配置。标签会从博客文章中自动生成。

### 系列文章

要创建系列文章，在文章前置内容中添加 `series` 和 `seriesOrder` 字段：

```yaml
series: "astro-tutorial"
seriesOrder: 1
```

## 部署方式

博客生成静态 HTML 文件，可以部署到任何地方。

### Vercel

```bash
npx vercel
```

### Netlify

```bash
npx netlify deploy --prod --dir=dist
```

### GitHub Pages

使用包含的 GitHub Actions 工作流或手动部署：

```bash
npm run build
# 将 dist/ 目录上传到 gh-pages 分支
```

### Cloudflare Pages

连接你的仓库并设置：

- **构建命令**: `npm run build`
- **输出目录**: `dist`

## 本地化

博客支持中文和英文。要添加新语言：

1. 更新 `src/content.config.ts` 添加新语言
2. 在 `src/content/i18n/` 中创建翻译文件
3. 在 `src/pages/` 中添加语言特定页面
4. 更新语言切换器组件

## 自定义

### 样式

- **颜色和主题**: 编辑 `tailwind.config.mjs`
- **全局样式**: 编辑 `src/styles/global.css`
- **深色模式**: 使用 Tailwind 的 `dark:` 前缀

### 组件

在 `src/components/` 中自定义组件：

- `Header.astro`: 导航头部
- `Footer.astro`: 站点页脚
- `PostCard.astro`: 博客文章卡片
- `FeaturedCarousel.astro`: 精选文章轮播
- `Comments.tsx`: Giscus 评论

## 脚本命令

| 命令 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产版本 |
| `npm run format` | 使用 Prettier 格式化代码 |

## 技术栈

- **框架**: [Astro](https://astro.build/) 5.x
- **样式**: [Tailwind CSS](https://tailwindcss.com/) 3.x
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **评论**: [Giscus](https://giscus.app/)
- **数学公式**: [KaTeX](https://katex.org/)
- **图表**: [Mermaid](https://mermaid.js.org/)
- **搜索**: [Pagefind](https://pagefind.app/)

## 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

---

<p align="center">
  由 <a href="https://github.com/WayneXuCN">徐文杰</a> 制作 ❤️
</p>