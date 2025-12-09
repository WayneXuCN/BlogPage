import type { CollectionEntry } from "astro:content";
import type { Locale } from "@/i18n/ui";

/**
 * 根据语言过滤文章
 * @param posts 文章集合
 * @param language 语言代码（支持的Locale）
 * @returns 过滤后的文章集合
 */
const getPostsByLanguage = (
  posts: CollectionEntry<"blog">[],
  language: Locale
): CollectionEntry<"blog">[] => {
  return posts.filter(post => post.data.lang === language);
};

export default getPostsByLanguage;
