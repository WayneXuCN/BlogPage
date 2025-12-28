import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { PAGES, SITE } from "@/config";

export async function GET() {
  if (!PAGES.posts.enabled) return new Response(null, { status: 404 });

  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, id, filePath }) => {
      const authors = Array.isArray(data.author)
        ? data.author.join(", ")
        : (data.author ?? SITE.author);
      return {
        link: getPath(id, filePath, true, data.lang, data.slug),
        title: data.title,
        description: data.description,
        pubDate: new Date(data.modDatetime ?? data.pubDatetime),
        author: authors,
        categories: [data.category].filter(Boolean).concat(data.tags || []),
      };
    }),
  });
}
