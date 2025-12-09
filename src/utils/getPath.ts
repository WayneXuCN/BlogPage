import { BLOG_PATH } from "@/content.config";
import { LOCALE_CODES } from "@/i18n/config";
import { slugifyStr } from "./slugify";

export function getCanonicalSlug(
  id: string,
  filePath: string | undefined,
  slugOverride?: string
) {
  const pathSegments =
    filePath
      ?.replace(BLOG_PATH, "")
      .replace(/^\/*/, "")
      .split("/")
      .filter(Boolean)
      .filter(segment => !segment.startsWith("_"))
      .slice(0, -1) // remove file name
      .map(segment => slugifyStr(segment)) || [];

  // Remove leading locale directory (eg. en/, zh/)
  if (pathSegments.length > 0 && LOCALE_CODES.includes(pathSegments[0])) {
    pathSegments.shift();
  }

  let normalizedOverride = (slugOverride || "").replace(/^\/+|\/+$/g, "");

  // If slug override includes a leading locale segment (eg. zh/foo), strip it
  const overrideSegments = normalizedOverride.split("/").filter(Boolean);
  if (
    overrideSegments.length > 0 &&
    LOCALE_CODES.includes(overrideSegments[0])
  ) {
    overrideSegments.shift();
    normalizedOverride = overrideSegments.join("/");
  }

  const fallbackSlug = id.split("/").pop() || "";
  const slug = normalizedOverride || slugifyStr(fallbackSlug);

  return [...pathSegments, slug].filter(Boolean).join("/");
}

/**
 * Get full path of a blog post
 * @param id - id of the blog post (aka slug)
 * @param filePath - the blog post full file location
 * @param includeBase - whether to include `/posts` in return value
 * @param lang - language code (en or zh)
 * @returns blog post path
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true,
  lang?: string,
  slugOverride?: string
) {
  const canonicalSlug = getCanonicalSlug(id, filePath, slugOverride);
  const pathParts = [includeBase ? "posts" : "", canonicalSlug]
    .filter(Boolean)
    .join("/");

  const normalizedPath = pathParts ? `/${pathParts}` : "/posts";

  if (lang) {
    return `/${lang}${normalizedPath}`;
  }

  return normalizedPath;
}
