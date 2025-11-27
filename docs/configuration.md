# 博客配置完整指南

本文档详细介绍如何配置博客站点、撰写文章以及使用各种高级功能。

## 目录

- [站点配置](#站点配置)
- [文章撰写](#文章撰写)
- [主题样式](#主题样式)
- [目录配置](#目录配置)
- [特殊语法](#特殊语法)
- [分类与标签](#分类与标签)
- [系列文章](#系列文章)
- [国际化](#国际化)

---

## 站点配置

站点的核心配置文件位于 `src/content/config/site.json`。

### 基本配置

```json
{
  "title": "你的博客标题",
  "description": "博客描述",
  "author": "作者名",
  "language": "zh",
  "url": "https://yourdomain.com"
}
```

### 文章显示配置

在 `site.json` 中的 `post` 部分配置文章的默认显示样式：

```json
{
  "post": {
    "theme": "academic",
    "tocPosition": "right",
    "contentWidth": "normal",
    "showCategoryIcon": true
  }
}
```

#### 配置项说明

| 配置项 | 可选值 | 默认值 | 说明 |
|--------|--------|--------|------|
| `theme` | `academic`, `minimal`, `magazine`, `distill` | `academic` | 文章排版主题 |
| `tocPosition` | `left`, `right`, `none` | `right` | 目录位置 |
| `contentWidth` | `narrow`, `normal`, `wide`, `full` | `normal` | 内容宽度 |
| `showCategoryIcon` | `true`, `false` | `true` | 是否显示分类图标 |

### 分类配置

在 `categories` 数组中配置博客分类：

```json
{
  "categories": [
    {
      "id": "research",
      "name": { "en": "Research", "zh": "研究" },
      "icon": "flask",
      "color": "#3b82f6"
    },
    {
      "id": "tutorial",
      "name": { "en": "Tutorial", "zh": "教程" },
      "icon": "book",
      "color": "#10b981"
    }
  ]
}
```

#### 可用图标

| 图标ID | 含义 | 适用场景 |
|--------|------|----------|
| `flask` | 烧瓶 | 研究、实验 |
| `book` | 书籍 | 教程、学习 |
| `lightbulb` | 灯泡 | 想法、思考 |
| `wrench` | 扳手 | 工具、技术 |
| `leaf` | 叶子 | 生活、自然 |
| `folder` | 文件夹 | 默认/其他 |

---

## 文章撰写

### 文件位置

博客文章存放在 `src/content/blog/` 目录下，按语言分类：

```
src/content/blog/
├── en/           # 英文文章
│   └── my-post.md
└── zh/           # 中文文章
    └── my-post.md
```

### Frontmatter 结构

每篇文章开头必须包含 YAML 格式的 frontmatter：

```yaml
---
title: "文章标题"
description: "文章简短描述"
pubDate: 2024-01-15
updatedDate: 2024-01-20  # 可选
author: wenjie
category: research
tags:
  - Python
  - 数据分析
featured: false
draft: false
lang: zh
# 以下为可选的样式覆盖
layout: default
style:
  theme: academic
  tocPosition: right
  contentWidth: normal
---
```

### Frontmatter 字段详解

#### 必填字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 文章标题 |
| `description` | string | 文章描述，用于 SEO 和预览 |
| `pubDate` | date | 发布日期，格式 `YYYY-MM-DD` |
| `author` | string | 作者 ID，对应 `src/content/authors/` 中的文件 |
| `category` | string | 分类 ID |
| `lang` | string | 语言代码：`zh` 或 `en` |

#### 可选字段

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `updatedDate` | date | - | 最后更新日期 |
| `tags` | array | `[]` | 标签列表 |
| `featured` | boolean | `false` | 是否为精选文章 |
| `draft` | boolean | `false` | 是否为草稿（不会被构建） |
| `series` | string | - | 所属系列 ID |
| `seriesOrder` | number | - | 在系列中的顺序 |
| `layout` | string | `default` | 布局类型：`default` 或 `distill` |
| `style` | object | - | 样式覆盖配置 |

### 样式覆盖

可以在单篇文章中覆盖全局样式设置：

```yaml
---
title: "Distill 风格文章"
layout: distill
style:
  theme: distill
  tocPosition: left
  contentWidth: wide
---
```

---

## 主题样式

博客提供四种预设排版主题，各有特色。

### Academic（学术风格）

```yaml
style:
  theme: academic
```

- **字体**: Georgia 衬线字体
- **特点**: 传统学术排版，适合长篇研究文章
- **行高**: 1.75
- **适用**: 学术论文、研究笔记

### Minimal（简约风格）

```yaml
style:
  theme: minimal
```

- **字体**: 系统无衬线字体
- **特点**: 清爽简洁，现代感强
- **行高**: 1.625
- **适用**: 技术博客、快速阅读

### Magazine（杂志风格）

```yaml
style:
  theme: magazine
```

- **字体**: Charter 衬线字体
- **特点**: 大标题、首字下沉、编辑感
- **行高**: 1.7
- **适用**: 深度长文、专栏文章

### Distill（学术期刊风格）

```yaml
layout: distill
style:
  theme: distill
```

- **字体**: Source Serif Pro
- **特点**: 模仿 distill.pub 学术期刊风格
- **特色**: 宽边距支持旁注
- **适用**: 学术文章、机器学习研究

---

## 目录配置

### 全局配置

在 `site.json` 中设置默认目录位置：

```json
{
  "post": {
    "tocPosition": "right"
  }
}
```

### 位置选项

| 值 | 效果 |
|----|------|
| `right` | 目录显示在文章右侧（默认） |
| `left` | 目录显示在文章左侧 |
| `none` | 不显示目录 |

### 单篇文章覆盖

```yaml
---
style:
  tocPosition: left
---
```

---

## 特殊语法

### Callout 提示框

使用 GitHub 风格的提示框语法：

```markdown
> [!NOTE]
> 这是一个普通提示信息。

> [!TIP]
> 这是一个有用的技巧提示。

> [!IMPORTANT]
> 这是重要信息，请注意。

> [!WARNING]
> 这是警告信息，需要小心。

> [!CAUTION]
> 这是危险警告，请谨慎操作。
```

#### 支持的类型

| 类型 | 用途 | 颜色 |
|------|------|------|
| `NOTE` | 一般信息 | 蓝色 |
| `TIP` | 技巧提示 | 绿色 |
| `IMPORTANT` | 重要信息 | 紫色 |
| `WARNING` | 警告信息 | 黄色 |
| `CAUTION` | 危险警告 | 红色 |

### 数学公式

使用 KaTeX 语法渲染数学公式。

#### 行内公式

```markdown
质能方程 $E = mc^2$ 是物理学的基础公式。
```

#### 块级公式

```markdown
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

#### 对齐公式

```markdown
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0
\end{aligned}
$$
```

### 代码块

支持语法高亮的代码块：

````markdown
```python
def hello_world():
    print("Hello, World!")
```
````

支持的语言包括：Python, JavaScript, TypeScript, Rust, Go, Java, C++, SQL, Bash 等。

### 脚注

```markdown
这是一段正文[^1]，这里有另一个引用[^note]。

[^1]: 这是第一个脚注的内容。
[^note]: 这是命名脚注的内容。
```

### 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A1  | B1  | C1  |
| A2  | B2  | C2  |
```

支持对齐：

```markdown
| 左对齐 | 居中 | 右对齐 |
|:-------|:----:|-------:|
| 内容   | 内容 | 内容   |
```

---

## 分类与标签

### 分类 (Category)

- 每篇文章**必须**属于一个分类
- 分类在 `site.json` 中预定义
- 用于文章的主要分类导航

### 标签 (Tags)

- 每篇文章可以有**多个**标签
- 标签更灵活，无需预定义
- 用于文章的精细化分类

### 使用示例

```yaml
---
category: tutorial
tags:
  - Python
  - 数据分析
  - Pandas
  - 入门教程
---
```

---

## 系列文章

### 创建系列

在 `src/content/series/` 创建系列配置文件：

```json
// machine-learning-basics.json
{
  "id": "machine-learning-basics",
  "title": {
    "en": "Machine Learning Basics",
    "zh": "机器学习基础"
  },
  "description": {
    "en": "A beginner's guide to machine learning",
    "zh": "机器学习入门指南"
  }
}
```

### 将文章加入系列

在文章 frontmatter 中指定系列：

```yaml
---
title: "机器学习入门（一）：基本概念"
series: machine-learning-basics
seriesOrder: 1
---
```

```yaml
---
title: "机器学习入门（二）：线性回归"
series: machine-learning-basics
seriesOrder: 2
---
```

### 系列导航

文章页面会自动显示系列导航，方便读者按顺序阅读。

---

## 国际化

### 支持的语言

- `zh` - 中文
- `en` - 英文

### 多语言文章

同一篇文章的不同语言版本使用相同的文件名：

```
src/content/blog/
├── en/
│   └── my-article.md    # 英文版
└── zh/
    └── my-article.md    # 中文版
```

### UI 文本配置

界面文本在 `src/content/i18n/` 中配置：

```json
// blog-zh.json
{
  "nav": {
    "home": "首页",
    "blog": "博客",
    "about": "关于"
  },
  "post": {
    "readMore": "阅读更多",
    "publishedOn": "发布于",
    "updatedOn": "更新于"
  }
}
```

---

## 作者配置

### 创建作者

在 `src/content/authors/` 创建作者文件：

```json
// wenjie.json
{
  "id": "wenjie",
  "name": "Wenjie",
  "bio": {
    "en": "A developer who loves coding",
    "zh": "一个热爱编程的开发者"
  },
  "avatar": "/assets/img/avatar.jpg",
  "social": {
    "github": "https://github.com/username",
    "twitter": "https://twitter.com/username"
  }
}
```

### 在文章中使用

```yaml
---
author: wenjie
---
```

---

## 快速开始示例

### 创建一篇新文章

1. 在 `src/content/blog/zh/` 创建文件 `my-new-post.md`

2. 添加 frontmatter：

```yaml
---
title: "我的新文章"
description: "这是一篇关于某个主题的文章"
pubDate: 2024-01-15
author: wenjie
category: tutorial
tags:
  - 教程
  - 入门
lang: zh
---
```

3. 编写内容：

```markdown
## 引言

这是文章的开头...

> [!TIP]
> 这是一个有用的提示。

## 主要内容

这里是正文内容，可以包含：

- 列表项 1
- 列表项 2

### 代码示例

```python
print("Hello, World!")
```

## 数学公式

著名的欧拉公式：$e^{i\pi} + 1 = 0$

## 结论

文章的总结...
```

4. 运行开发服务器预览：

```bash
bun run dev
```

5. 构建并部署：

```bash
bun run build
```

---

## 常见问题

### Q: 如何创建草稿？

在 frontmatter 中设置 `draft: true`，草稿不会被构建到生产环境。

### Q: 如何设置精选文章？

设置 `featured: true`，精选文章会显示在首页轮播区域。

### Q: 如何更改文章 URL？

URL 格式为 `/{lang}/blog/{year}/{slug}`，其中 `slug` 是文件名（不含扩展名）。

### Q: 如何添加图片？

将图片放在 `public/assets/img/` 目录，然后引用：

```markdown
![图片描述](/assets/img/my-image.jpg)
```

### Q: 目录不显示怎么办？

确保文章中有使用 `##`、`###` 等标题语法，目录会自动提取这些标题。

---

## 进阶配置

### 自定义 CSS

如需自定义样式，可以编辑 `src/styles/global.css` 或创建新的 CSS 文件。

### 扩展 Markdown

Astro 配置文件 `astro.config.mjs` 中可以添加更多 remark/rehype 插件来扩展 Markdown 功能。

### 性能优化

- 图片建议使用 WebP 格式
- 大图片建议压缩后上传
- 避免在首屏加载过多资源

---

## MDX 组件

博客支持丰富的 MDX 组件，可在 `.mdx` 文件中使用。

### 导入组件

在 MDX 文件开头导入需要的组件：

```jsx
import {
  Callout,
  Theorem,
  Definition,
  Proof,
  Figure,
  PhotoGrid,
  Video,
  Audio,
  Chart,
  ECharts,
  VegaLite,
  Plotly,
  Mermaid,
  TikZ,
  Typograms,
  GeoMap,
  CodeDiff,
  Pseudocode,
  Tabs,
  Details,
  ImageSlider,
  ImageComparison,
  PhotoGallery
} from '@/components/mdx';
```

### 组件列表

#### 提示框组件

##### Callout（提示框）

```jsx
<Callout type="info" title="提示">
  这是一条信息提示。
</Callout>

<Callout type="warning" title="警告">
  这是一条警告信息。
</Callout>

<Callout type="danger" title="危险">
  这是一条危险警告。
</Callout>

<Callout type="tip" title="小贴士">
  这是一个实用技巧。
</Callout>
```

**属性：**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'info' \| 'warning' \| 'danger' \| 'tip' \| 'note' \| 'success' \| 'error'` | `'info'` | 提示框类型 |
| `title` | `string` | - | 提示框标题 |

---

#### 学术环境组件

##### Definition（定义）

```jsx
<Definition name="极限">
  设函数 $f(x)$ 在点 $x_0$ 的某个去心邻域内有定义...
</Definition>
```

##### Theorem（定理）

```jsx
<Theorem name="费马大定理">
  当整数 $n > 2$ 时，关于 $x$, $y$, $z$ 的方程...
</Theorem>
```

##### Proof（证明）

```jsx
<Proof>
  证明过程...
</Proof>
```

---

#### 媒体组件

##### Figure（图片）

```jsx
<Figure 
  src="/images/example.jpg" 
  alt="图片描述"
  caption="图片说明文字"
/>
```

##### PhotoGrid（照片网格）

```jsx
<PhotoGrid 
  images={[
    { src: "/img1.jpg", alt: "图片1" },
    { src: "/img2.jpg", alt: "图片2" },
    { src: "/img3.jpg", alt: "图片3" },
    { src: "/img4.jpg", alt: "图片4" }
  ]}
  columns={2}
/>
```

##### Video（视频）

```jsx
<Video 
  src="/videos/demo.mp4"
  poster="/images/poster.jpg"
  caption="视频说明"
/>
```

##### Audio（音频）

```jsx
<Audio 
  src="/audio/music.mp3"
  title="音频标题"
/>
```

---

#### 图片高级组件

##### ImageSlider（图片轮播）

```jsx
<ImageSlider
  images={[
    { src: "/img1.jpg", alt: "图片1", caption: "说明1" },
    { src: "/img2.jpg", alt: "图片2", caption: "说明2" }
  ]}
  autoplay={true}
  interval={5000}
/>
```

**属性：**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `images` | `Array<{src, alt, caption?}>` | 必填 | 图片数组 |
| `autoplay` | `boolean` | `false` | 是否自动播放 |
| `interval` | `number` | `5000` | 自动播放间隔（毫秒） |
| `showThumbnails` | `boolean` | `false` | 是否显示缩略图 |

##### ImageComparison（图片对比）

```jsx
<ImageComparison
  beforeSrc="/before.jpg"
  afterSrc="/after.jpg"
  beforeAlt="处理前"
  afterAlt="处理后"
/>
```

##### PhotoGallery（图片画廊）

```jsx
<PhotoGallery
  images={[
    { src: "/img1.jpg", alt: "图片1", thumbnail: "/thumb1.jpg" },
    { src: "/img2.jpg", alt: "图片2" }
  ]}
  columns={3}
/>
```

---

#### 图表组件

##### Chart（Chart.js 图表）

```jsx
<Chart
  client:load
  type="line"
  data={{
    labels: ['一月', '二月', '三月'],
    datasets: [{
      label: '销售额',
      data: [12, 19, 3],
      borderColor: 'rgb(75, 192, 192)'
    }]
  }}
/>
```

**属性：**
| 属性 | 类型 | 说明 |
|------|------|------|
| `type` | `'line' \| 'bar' \| 'pie' \| 'doughnut' \| 'radar'` | 图表类型 |
| `data` | `object` | Chart.js 数据对象 |
| `options` | `object` | Chart.js 配置选项 |

##### ECharts（Apache ECharts）

```jsx
<ECharts
  option={{
    title: { text: '示例图表' },
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [10, 20, 30] }]
  }}
  height="400px"
/>
```

**属性：**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `option` | `object` | 必填 | ECharts 配置对象 |
| `height` | `string` | `'400px'` | 图表高度 |
| `theme` | `string` | - | ECharts 主题名 |

##### VegaLite（Vega-Lite 图表）

```jsx
<VegaLite
  spec={{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { "values": [{"a": "A", "b": 28}] },
    "mark": "bar",
    "encoding": {
      "x": {"field": "a", "type": "nominal"},
      "y": {"field": "b", "type": "quantitative"}
    }
  }}
/>
```

##### Plotly（Plotly.js 图表）

```jsx
<Plotly
  data={[{
    type: 'scatter3d',
    mode: 'markers',
    x: [1, 2, 3],
    y: [1, 4, 9],
    z: [1, 8, 27]
  }]}
  layout={{
    title: '3D 散点图'
  }}
  height="400px"
/>
```

---

#### 图表/图形组件

##### Mermaid（流程图）

```jsx
<Mermaid code={`
graph TD
    A[开始] --> B{判断}
    B -->|是| C[处理]
    B -->|否| D[结束]
`} />
```

支持的图表类型：
- `graph` / `flowchart` - 流程图
- `sequenceDiagram` - 时序图
- `classDiagram` - 类图
- `stateDiagram` - 状态图
- `erDiagram` - ER 图
- `gantt` - 甘特图
- `pie` - 饼图
- `mindmap` - 思维导图

##### Typograms（ASCII 图形）

```jsx
<Typograms>
{`+--------+
|  Box   |
+--------+`}
</Typograms>
```

##### TikZ（LaTeX 绘图）

```jsx
<TikZ code={`
\\begin{tikzpicture}
  \\draw (0,0) circle (1);
\\end{tikzpicture}
`} />
```

---

#### 地图组件

##### GeoMap（Leaflet 地图）

```jsx
<GeoMap
  center={[39.9, 116.4]}
  zoom={12}
  markers={[
    { lat: 39.9, lng: 116.4, popup: "北京" }
  ]}
  height="400px"
/>
```

**属性：**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `center` | `[number, number]` | `[0, 0]` | 地图中心点 [纬度, 经度] |
| `zoom` | `number` | `10` | 缩放级别 |
| `markers` | `Array<{lat, lng, popup?}>` | `[]` | 标记点数组 |
| `geojson` | `object` | - | GeoJSON 数据 |
| `height` | `string` | `'400px'` | 地图高度 |

---

#### 代码相关组件

##### CodeDiff（代码差异）

```jsx
<CodeDiff
  language="javascript"
  oldCode={`function hello() {
  console.log('Hello');
}`}
  newCode={`function hello(name) {
  console.log(\`Hello, \${name}\`);
}`}
  oldTitle="旧版本"
  newTitle="新版本"
/>
```

**属性：**
| 属性 | 类型 | 说明 |
|------|------|------|
| `language` | `string` | 代码语言 |
| `oldCode` | `string` | 旧代码 |
| `newCode` | `string` | 新代码 |
| `oldTitle` | `string` | 旧版本标题 |
| `newTitle` | `string` | 新版本标题 |
| `style` | `'side-by-side' \| 'line-by-line'` | 显示样式 |

##### Pseudocode（伪代码）

```jsx
<Pseudocode title="快速排序">
{`\\begin{algorithm}
\\caption{QuickSort}
\\begin{algorithmic}
\\PROCEDURE{QuickSort}{$A, lo, hi$}
    \\IF{$lo < hi$}
        \\STATE $p \\gets$ \\CALL{Partition}{$A, lo, hi$}
        \\STATE \\CALL{QuickSort}{$A, lo, p - 1$}
        \\STATE \\CALL{QuickSort}{$A, p + 1, hi$}
    \\ENDIF
\\ENDPROCEDURE
\\end{algorithmic}
\\end{algorithm}`}
</Pseudocode>
```

---

#### 布局组件

##### Tabs（选项卡）

```jsx
<Tabs labels={["JavaScript", "Python", "Go"]}>
  <div>
    // JavaScript 代码
  </div>
  <div>
    # Python 代码
  </div>
  <div>
    // Go 代码
  </div>
</Tabs>
```

**属性：**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `labels` | `string[]` | 必填 | 选项卡标签 |
| `defaultTab` | `number` | `0` | 默认激活的选项卡索引 |
| `groupId` | `string` | - | 同步组 ID（同组的选项卡会同步切换） |

##### Details（折叠内容）

```jsx
<Details title="点击展开">
  这里是隐藏的内容...
</Details>

<Details title="默认展开" open>
  这是默认展开的内容...
</Details>
```

**属性：**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | 必填 | 折叠块标题 |
| `open` | `boolean` | `false` | 是否默认展开 |

---

### 组件使用注意事项

1. **MDX 文件格式**：使用 `.mdx` 扩展名而非 `.md`
2. **客户端渲染**：图表组件（Chart, ECharts, Plotly 等）需要添加 `client:load` 指令
3. **深色模式**：所有组件自动支持深色模式切换
4. **性能优化**：大型图表库（Plotly, ECharts）会延迟加载以优化首屏性能
5. **数据格式**：使用 JavaScript 对象语法传递数据，注意 JSX 中的模板字符串转义
