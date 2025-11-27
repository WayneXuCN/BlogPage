# 博客写作指南

## 文件格式选择

### 标准 Markdown (`.md`) - 推荐日常使用

适用于：
- 日常博客文章
- 技术教程
- 工具推荐
- 生活随笔

### MDX (`.mdx`) - 复杂内容

适用于：
- 需要 Mermaid 图表的文章
- 需要定理/定义/证明环境的学术文章
- 需要交互式组件的内容

## Frontmatter 模板

```yaml
---
title: '文章标题'
description: '文章描述（用于 SEO 和预览）'
pubDate: 2024-01-15T10:00:00
updatedDate: 2024-01-20T14:30:00  # 可选
image: 'https://images.unsplash.com/...'  # 可选，封面图
category: tutorial  # research | tutorial | thoughts | tools | life
tags:
  - 标签1
  - 标签2
featured: false  # 是否在首页展示
lang: zh  # zh | en
author: 徐文杰
toc: true  # 是否显示目录
comments: true  # 是否开启评论
math: false  # 是否启用数学公式
---
```

## Markdown 语法

### 标题

```markdown
## 二级标题
### 三级标题
#### 四级标题
```

### 强调

```markdown
**粗体** *斜体* ~~删除线~~
```

### 链接和图片

```markdown
[链接文本](https://example.com)
![图片描述](./image.jpg)
```

### 代码

行内代码：`` `code` ``

代码块：
````markdown
```python
def hello():
    print("Hello, World!")
```
````

### 引用

```markdown
> 这是一段引用文字
```

### 列表

```markdown
- 无序列表
- 项目 2

1. 有序列表
2. 项目 2
```

### 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A   | B   | C   |
```

## Callout（提示框）

使用 GitHub 风格的 Blockquote Admonitions：

```markdown
> [!NOTE]
> 这是一条普通提示信息

> [!TIP]
> 这是一条有用的提示

> [!IMPORTANT]
> 这是重要信息

> [!WARNING]
> 这是警告信息

> [!CAUTION]
> 这是危险警告
```

## 数学公式

需要在 frontmatter 中设置 `math: true`

行内公式：`$E = mc^2$`

块级公式：
```markdown
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## MDX 特有功能

### Mermaid 图表

```jsx
import Mermaid from '@components/mdx/Mermaid.astro';

<Mermaid
  chart={`
flowchart TD
    A[开始] --> B{条件判断}
    B -->|是| C[执行]
    B -->|否| D[结束]
`}
/>
```

### 学术环境组件

```jsx
import Theorem from '@components/mdx/Theorem.astro';
import Definition from '@components/mdx/Definition.astro';
import Proof from '@components/mdx/Proof.astro';

<Definition title="定义名称">
  定义内容...
</Definition>

<Theorem title="定理名称">
  定理内容 $f(x) = x^2$
</Theorem>

<Proof>
  证明过程...
</Proof>
```

## 文件命名规范

- 使用小写字母和连字符：`my-first-post.md`
- 文件名会成为 URL slug：`/zh/blog/2024/my-first-post`
- 按语言放入对应目录：`src/content/blog/zh/` 或 `src/content/blog/en/`

## 发布前检查清单

- [ ] Frontmatter 完整（title, description, pubDate, category, lang）
- [ ] 图片链接有效
- [ ] 代码块语言正确
- [ ] 数学公式渲染正常（如有）
- [ ] 运行 `bun run build` 确认无错误
