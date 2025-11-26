/**
 * RSS Feed 生成
 * 
 * 路由: /[lang]/rss.xml
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { siteConfig, getPostUrl } from '../../config';

export function getStaticPaths() {
  return [
    { params: { lang: 'zh' } },
    { params: { lang: 'en' } },
  ];
}

export async function GET(context: APIContext) {
  const { lang } = context.params;
  const currentLang = lang as 'zh' | 'en';
  
  // 获取当前语言的所有文章
  const posts = await getCollection('blog', ({ data }) => {
    return data.lang === currentLang;
  });
  
  // 按发布日期排序
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
  
  // 站点信息
  const siteTitle = currentLang === 'zh' 
    ? siteConfig.title.zh 
    : siteConfig.title.en;
  
  const siteDescription = currentLang === 'zh'
    ? siteConfig.description.zh
    : siteConfig.description.en;
  
  return rss({
    title: siteTitle,
    description: siteDescription,
    site: context.site || siteConfig.url,
    items: sortedPosts.map((post) => {
      const year = new Date(post.data.pubDate).getFullYear();
      // 从 post.id 提取 slug (格式: "zh/welcome-to-my-blog" -> "welcome-to-my-blog")
      const slug = post.id.includes('/') ? post.id.split('/').pop()! : post.id;
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: getPostUrl(slug, currentLang, year),
        categories: post.data.tags,
        author: siteConfig.authorInfo.name,
      };
    }),
    customData: `<language>${currentLang === 'zh' ? 'zh-CN' : 'en-US'}</language>`,
    stylesheet: '/rss/styles.xsl',
  });
}
