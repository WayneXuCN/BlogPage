import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { getCanonicalSlug } from "@/utils/getPath";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { PAGES, SITE } from "@/config";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage || !PAGES.posts.enabled) {
    return [];
  }

  const posts = await getCollection("blog").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: getCanonicalSlug(post.id, post.filePath, post.data.slug) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage || !PAGES.posts.enabled) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const buffer = await generateOgImageForPost(props as CollectionEntry<"blog">);
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
};
