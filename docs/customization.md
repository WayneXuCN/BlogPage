# 主题定制

本指南将详细介绍如何定制博客主题和样式。

## 样式文件

### 全局样式
全局样式定义在 `src/styles/global.css` 中，包含：

- 基础样式重置
- CSS 变量定义
- 主题颜色配置
- 响应式断点

### 排版样式
排版样式定义在 `src/styles/typography.css` 中，包含：

- 字体设置
- 标题样式
- 段落样式
- 引用样式
- 代码样式

## 颜色主题

### 预定义主题
系统提供多种预定义颜色主题，可在 `src/config.ts` 中配置：

```typescript
export const SITE = {
  // ...
  lightAndDarkMode: true, // 启用亮色/暗色模式
  // ...
} as const;
```

### 自定义颜色
通过修改 CSS 变量来自定义颜色主题：

```css
:root {
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  --color-gray-200: #e2e8f0;
  --color-gray-300: #cbd5e1;
  --color-gray-400: #94a3b8;
  --color-gray-500: #64748b;
  --color-gray-600: #475569;
  --color-gray-700: #334155;
  --color-gray-800: #1e293b;
  --color-gray-900: #0f172a;
  
  /* 主色调 */
  --color-primary: #your-primary-color;
  --color-primary-50: #your-primary-50;
  --color-primary-100: #your-primary-100;
  --color-primary-200: #your-primary-200;
  --color-primary-300: #your-primary-300;
  --color-primary-400: #your-primary-400;
  --color-primary-500: #your-primary-500;
  --color-primary-600: #your-primary-600;
  --color-primary-700: #your-primary-700;
  --color-primary-800: #your-primary-800;
  --color-primary-900: #your-primary-900;
}
```

### 暗色主题
暗色主题的变量定义在 `@media (prefers-color-scheme: dark)` 媒体查询中：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-gray-50: #your-dark-gray-50;
    --color-gray-100: #your-dark-gray-100;
    /* ... */
  }
}
```

## Tailwind CSS 配置

### 配置文件
Tailwind CSS 配置在 `tailwind.config.mjs` 中（虽然项目中未显示，但由 `@tailwindcss/vite` 插件处理）。

### 自定义配置
如需自定义 Tailwind 配置，可以创建 `tailwind.config.js` 文件：

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          // ...
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## 组件定制

### 布局组件
布局组件位于 `src/components/` 目录：

- `Header.astro` - 页面头部
- `Footer.astro` - 页面底部
- `Layout.astro` - 主布局
- `PostDetails.astro` - 文章详情布局

### 功能组件
功能组件包括：

- `BackToTopButton.astro` - 返回顶部按钮
- `Breadcrumb.astro` - 面包屑导航
- `Card.astro` - 卡片组件
- `Pagination.astro` - 分页组件
- `Socials.astro` - 社交链接
- `ShareLinks.astro` - 分享链接

### 自定义组件
可以在 `src/components/` 目录中创建自定义组件：

```astro
---
// src/components/CustomComponent.astro
---

<div class="custom-class">
  <slot />
</div>
```

## 字体定制

### 字体配置
在 `src/config.ts` 中配置字体：

```typescript
// 虽然没有直接的字体配置，但可以在 CSS 中定义
```

### Google Fonts
如需使用 Google Fonts，可以在 `src/layouts/Layout.astro` 中添加：

```astro
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
```

## 图标定制

### 图标文件
图标位于 `src/assets/icons/` 目录，使用 SVG 格式。

### 添加新图标
1. 将 SVG 文件放入 `src/assets/icons/` 目录
2. 在组件中导入并使用：

```astro
---
import IconName from '~/assets/icons/IconName.svg';
---

<IconName />
```

## 响应式设计

### 断点配置
响应式断点在 CSS 中定义：

```css
/* 在 global.css 中 */
@media (min-width: 640px) {
  /* 小屏幕断点 */
}

@media (min-width: 768px) {
  /* 中等屏幕断点 */
}

@media (min-width: 1024px) {
  /* 大屏幕断点 */
}

@media (min-width: 1280px) {
  /* 超大屏幕断点 */
}
```

## 动画和过渡

### CSS 过渡
在 CSS 中定义过渡效果：

```css
.transition {
  transition: all 0.3s ease;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
```

## 自定义页面

### 创建新页面
在 `src/pages/` 目录中创建新页面：

```astro
---
// src/pages/custom-page.astro
import Layout from '~/layouts/Layout.astro';
---

<Layout title="自定义页面">
  <h1>自定义页面内容</h1>
</Layout>
```

### 自定义布局
创建自定义布局组件：

```astro
---
// src/layouts/CustomLayout.astro
import { SITE } from '~/config';
import Header from '~/components/Header.astro';
import Footer from '~/components/Footer.astro';

export interface Props {
  title?: string;
  description?: string;
  image?: string;
  layout?: string;
  fullWidth?: boolean;
  lang?: string;
}

const props = Astro.props;
---

<html lang={props.lang ?? SITE.lang}>
  <head>
    <title>{props.title ? `${props.title} | ${SITE.title}` : SITE.title}</title>
    <meta name="description" content={props.description ?? SITE.desc} />
    {props.image && <meta property="og:image" content={props.image} />}
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

## 性能优化

### 图片优化
系统使用 Astro 的图片优化功能：

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/my-image.jpg';
---

<Image src={myImage} alt="描述" />
```

### 代码分割
Astro 自动处理代码分割，但可以使用动态导入优化：

```astro
---
const { default: Component } = await import('../components/HeavyComponent.astro');
---

<Component />
```

## 自定义元数据

### SEO 优化
在页面中自定义元数据：

```astro
---
// 在页面 frontmatter 或组件中
const title = "页面标题";
const description = "页面描述";
const image = "/path/to/og-image.jpg";
---

<head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta name="twitter:card" content="summary_large_image" />
</head>
```

## 主题切换

### 手动切换
系统提供主题切换功能，用户可以手动切换亮色/暗色模式。

### 自动检测
系统会自动检测用户的系统偏好设置。

## 自定义构建配置

### Astro 配置
在 `astro.config.ts` 中可以自定义构建配置：

```typescript
export default defineConfig({
  // ...
  vite: {
    // Vite 配置
    plugins: [
      // 添加额外的 Vite 插件
    ],
  },
  // ...
});
```

## 调试和开发

### 开发模式
使用以下命令启动开发服务器：

```bash
bun run dev
```

### 构建检查
使用以下命令检查构建问题：

```bash
bun run build
```

### 代码格式化
使用以下命令格式化代码：

```bash
bun run format
```

## 最佳实践

### 样式组织
- 使用 CSS 变量保持一致性
- 遵循 BEM 命名规范
- 保持样式模块化

### 组件设计
- 保持组件单一职责
- 使用插槽 (slots) 提供灵活性
- 提供清晰的组件 API

### 性能考虑
- 优化图片资源
- 使用适当的缓存策略
- 减少不必要的依赖