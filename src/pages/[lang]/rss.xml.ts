import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";
import { getLocaleConfig, type LocaleCode } from "@/i18n/config";
import { getStaticPaths as getI18nStaticPaths } from "@/i18n/utils";

export async function getStaticPaths() {
  if (!SITE.pages.posts.enabled) return [];
  return getI18nStaticPaths();
}

export async function GET({ params }: { params: { lang: string } }) {
  if (!SITE.pages.posts.enabled) return new Response(null, { status: 404 });

  const locale = getLocaleConfig(params.lang).code as LocaleCode;
  const posts = await getCollection(
    "blog",
    ({ data }) => data.lang === locale && !data.draft
  );
  const sortedPosts = getSortedPosts(posts);
  const siteUrl = new URL(
    `${getLocaleConfig(locale).path || ""}/`,
    SITE.website
  ).href;

  return rss({
    title: `${SITE.title} (${locale})`,
    description: SITE.desc,
    site: siteUrl,
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
