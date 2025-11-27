import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import remarkGithubAdmonitions from 'remark-github-beta-blockquote-admonitions';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  // 站点基础配置
  site: 'https://blog.wenjiexu.site', // 在部署时更新为实际域名
  base: '/', // 根路径，用于多语言站点

  trailingSlash: 'ignore', // 尾部斜杠策略 - 使用 ignore 以支持 RSS 等特殊文件

  // 静态站点生成
  output: 'static',

  // 图片优化配置
  image: {
    // 允许优化的远程图片域名
    domains: ['images.unsplash.com', 'unsplash.com'],
    // 远程图片模式匹配
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },

  // i18n 国际化配置
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  // 自定义重定向配置
  redirects: {
    // 移除根路径重定向，由index.astro直接处理
    '/zh/': '/zh/blog/',
    '/blog/': '/zh/blog/',
  },

  // Prefetch 预获取配置
  prefetch: {
    defaultStrategy: 'hover',
    prefetchAll: false,
  },

  // 集成配置
  integrations: [
    react(),
    tailwind({
      configFile: './tailwind.config.mjs',
    }),
    mdx({
      // MDX 继承 markdown 配置
      extendMarkdownConfig: true,
    }),
    sitemap({
      // 多语言站点地图
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-CN',
          en: 'en-US',
        },
      },
      // 过滤草稿和私有页面
      filter: page => !page.includes('/draft/'),
    }),
  ],

  // Markdown 配置
  markdown: {
    // remark 插件（Markdown AST 处理）
    remarkPlugins: [
      remarkMath,
      remarkGithubAdmonitions,
    ],
    // rehype 插件（HTML AST 处理）
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            class: 'heading-anchor',
          },
        },
      ],
      [
        rehypeKatex,
        {
          // KaTeX 配置
          strict: false,
          throwOnError: false,
          trust: true,
          macros: {
            // 自定义 LaTeX 宏
            '\\R': '\\mathbb{R}',
            '\\N': '\\mathbb{N}',
            '\\Z': '\\mathbb{Z}',
            '\\Q': '\\mathbb{Q}',
            '\\C': '\\mathbb{C}',
            '\\E': '\\mathbb{E}',
            '\\P': '\\mathbb{P}',
            '\\argmax': '\\operatorname*{argmax}',
            '\\argmin': '\\operatorname*{argmin}',
          },
        },
      ],
    ],

    // Shiki 代码高亮配置（GitHub 风格双主题）
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // 支持的语言
      langs: [
        'javascript',
        'typescript',
        'python',
        'rust',
        'go',
        'java',
        'c',
        'cpp',
        'csharp',
        'ruby',
        'php',
        'latex',
        'tex',
        'bash',
        'shell',
        'zsh',
        'json',
        'yaml',
        'toml',
        'xml',
        'html',
        'css',
        'scss',
        'jsx',
        'tsx',
        'vue',
        'svelte',
        'astro',
        'sql',
        'graphql',
        'markdown',
        'mdx',
        'docker',
        'nginx',
        'makefile',
        'r',
        'matlab',
        'julia',
      ],
      // 自动换行
      wrap: true,
    },
  },

  // Vite 配置
  vite: {
    optimizeDeps: {
      include: ['react', 'react-dom', 'mermaid', 'chart.js'],
    },
    // 解决 mermaid ESM 问题
    ssr: {
      noExternal: ['mermaid'],
    },
  },
});
