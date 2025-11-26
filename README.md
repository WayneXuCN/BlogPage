<p align="center">
  <img src="public/assets/img/website.png" alt="Blog Preview" width="800" />
</p>

<h1 align="center">Academic Blog</h1>

<p align="center">
  <strong>A modern, responsive academic blog built with Astro 5</strong>
</p>

<p align="center">
  <a href="https://github.com/WayneXuCN/BlogPage/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
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
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#content-management">Content Management</a> •
  <a href="#deployment">Deployment</a>
</p>

<p align="center">
  <a href="README.md">English</a> | <a href="README_zh.md">中文</a>
</p>

---

## Features

| Feature | Description |
|---------|-------------|
| **Multiple Layouts** | Three homepage layouts: Classic, Grid, and Magazine |
| **Internationalization** | Built-in support for Chinese and English |
| **Responsive Design** | Mobile-first design that looks great on all devices |
| **Dark Mode** | Automatic theme switching with system preference detection |
| **Blog Features** | Categories, tags, archives, series, and featured posts |
| **Comments** | Giscus integration for comments |
| **RSS Feeds** | Auto-generated RSS feeds for each language |
| **Search** | Built-in search functionality |
| **Math Support** | KaTeX integration for mathematical formulas |
| **Diagrams** | Mermaid diagram support |
| **Reading Progress** | Reading progress bar for articles |
| **Social Sharing** | Social media sharing buttons |

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/) 1.0+

### Create Your Blog

```bash
# Clone the repository
git clone https://github.com/WayneXuCN/BlogPage.git my-blog
cd my-blog

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) to see your blog.

### Build for Production

```bash
npm run build
# or
bun run build
```

Output is generated in the `dist/` directory, ready for deployment to any static hosting platform.

## Project Structure

```text
BlogPage/
├── src/
│   ├── components/          # Reusable components
│   │   ├── blog/           # Blog-specific components
│   │   └── layouts/        # Layout components
│   ├── content/            # Content collections
│   │   ├── blog/           # Blog posts
│   │   ├── config/         # Site configuration
│   │   ├── authors/        # Author information
│   │   ├── series/         # Series metadata
│   │   └── i18n/           # Translation files
│   ├── layouts/            # Page layouts
│   ├── pages/              # Page routes
│   ├── utils/              # Utility functions
│   └── content.config.ts   # Content collections configuration
├── public/                 # Static assets
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind configuration
└── package.json            # Project dependencies
```

## Configuration

### Site Configuration

All configuration is managed through `src/content/config/site.json`. You can edit this file to customize your blog.

#### Layout Switching

To change the homepage layout, modify the `home.layout` property:

```json
{
  "home": {
    "layout": "magazine", // Options: 'classic', 'grid', 'magazine'
    "postsPerPage": 10,
    "showFeatured": true,
    "featuredCount": 5,
    "carouselAutoPlay": true,
    "carouselInterval": 5000
  }
}
```

#### Available Layouts

1. **Classic** - Traditional list layout with featured section
2. **Grid** - Card-based grid layout
3. **Magazine** - Magazine-style layout with carousel (default)

#### Other Configuration Options

- `url`: Site URL
- `title`: Site title (multilingual)
- `description`: Site description (multilingual)
- `author`: Author information
- `features`: Enable/disable features like comments, search, RSS, etc.
- `giscus`: Giscus comment configuration
- `nav`: Navigation menu items
- `social`: Social media links
- `categories`: Blog categories

## Content Management

### Blog Posts

Blog posts are stored in `src/content/blog/` with the following structure:

```text
src/content/blog/
├── zh/                    # Chinese posts
│   ├── 2024/              # Year
│   │   └── post-slug.md    # Blog post
│   └── ...
└── en/                    # English posts
    ├── 2024/              # Year
    │   └── post-slug.md    # Blog post
    └── ...
```

Each post has frontmatter with metadata:

```yaml
title: "Post Title"
description: "Post description"
pubDate: 2024-01-01
category: tutorial
tags: [astro, blog]
image: /assets/img/post-image.jpg
featured: true
lang: zh
```

### Categories and Tags

Categories are configured in `src/content/config/site.json`. Tags are automatically generated from blog posts.

### Series

To create a series of posts, add the `series` and `seriesOrder` fields to your post frontmatter:

```yaml
series: "astro-tutorial"
seriesOrder: 1
```

## Deployment

The blog generates static HTML files that can be deployed anywhere.

### Vercel

```bash
npx vercel
```

### Netlify

```bash
npx netlify deploy --prod --dir=dist
```

### GitHub Pages

Use the included GitHub Actions workflow or deploy manually:

```bash
npm run build
# Upload dist/ to gh-pages branch
```

### Cloudflare Pages

Connect your repository and set:

- **Build command**: `npm run build`
- **Output directory**: `dist`

## Localization

The blog supports Chinese and English. To add a new language:

1. Update `src/content.config.ts` to add the new language
2. Create translation files in `src/content/i18n/`
3. Add language-specific pages in `src/pages/`
4. Update the language switcher component

## Customization

### Styling

- **Colors & Theme**: Edit `tailwind.config.mjs`
- **Global Styles**: Edit `src/styles/global.css`
- **Dark Mode**: Use Tailwind's `dark:` prefix

### Components

Customize components in `src/components/`:

- `Header.astro`: Navigation header
- `Footer.astro`: Site footer
- `PostCard.astro`: Blog post card
- `FeaturedCarousel.astro`: Featured posts carousel
- `Comments.tsx`: Giscus comments

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run format` | Format code with Prettier |

## Tech Stack

- **Framework**: [Astro](https://astro.build/) 5.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.x
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Comments**: [Giscus](https://giscus.app/)
- **Math Support**: [KaTeX](https://katex.org/)
- **Diagrams**: [Mermaid](https://mermaid.js.org/)
- **Search**: [Pagefind](https://pagefind.app/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/WayneXuCN">Wenjie Xu</a>
</p>