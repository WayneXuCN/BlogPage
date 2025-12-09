import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import postFilter from "./postFilter";

export const DEFAULT_CATEGORY = "General";
export const DEFAULT_CATEGORY_SLUG = slugifyStr(DEFAULT_CATEGORY);

interface CategoryEntry {
  category: string;
  categoryName: string;
}

const getUniqueCategories = (
  posts: CollectionEntry<"blog">[],
  defaultLabel?: string
) => {
  const categories: CategoryEntry[] = posts
    .filter(postFilter)
    .map(post => post.data.category || "")
    .filter(Boolean)
    .map(category => {
      const categorySlug = slugifyStr(category);
      const categoryName =
        categorySlug === DEFAULT_CATEGORY_SLUG && defaultLabel
          ? defaultLabel
          : category;
      return { category: categorySlug, categoryName };
    })
    .filter(
      (value, index, self) =>
        self.findIndex(item => item.category === value.category) === index
    )
    .sort((a, b) => a.category.localeCompare(b.category));

  return categories;
};

export default getUniqueCategories;
export type { CategoryEntry };
