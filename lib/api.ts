import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { TreemapData } from "@/types/treemapData";

type Items = {
  [key: string]: string | { [key: string]: string };
};

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPostsForAlgolia() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) =>
      getPostBySlug(slug, [
        "title",
        "date",
        "slug",
        "author",
        "content",
        "coverImage",
        "excerpt",
        "category",
        "tags",
      ])
    )
    .map((s: any) => {
      return {
        title: s.title,
        date: s.date,
        objectID: s.slug,
        content: s.content,
        excerpt: s.excerpt,
        firstCategory: s.category.first,
        secondCategory: s.category.second,
        coverImage: s.coverImage,
        tags: s.tags,
        slug: s.slug,
      };
    });
  return posts;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export const getOrderPosts = (allPosts: Items[], orderSlugs: string[]) => {
  const filteredPosts = allPosts.filter((p) =>
    orderSlugs.includes(p.slug as string)
  );
  const orderPosts = orderSlugs.map(
    (s) => filteredPosts.filter((p) => p.slug === s)[0]
  );
  return orderPosts;
};

type CategorizeData = { [key: string]: { [key: string]: number } };

// firstCategoryを引数に渡すと、指定したfirstCategoryのデータのみ取得
export const getTreemapData = (
  allPosts: Items[],
  firstCategory?: string
): TreemapData => {
  const categorizeData: CategorizeData = {};
  allPosts.forEach((p) => {
    const pp = p as { category: { first: string; second: string } };
    if (!(pp.category.first in categorizeData)) {
      categorizeData[pp.category.first] = {};
    }
    if (pp.category.second in categorizeData[pp.category.first]) {
      ++categorizeData[pp.category.first][pp.category.second];
    } else {
      categorizeData[pp.category.first][pp.category.second] = 1;
    }
  });
  const viewableFormats = generateTreemapData(categorizeData, firstCategory);
  return viewableFormats;
};

const generateTreemapData = (
  categorizeData: CategorizeData,
  firstCategory?: string
) => {
  const viewableFormats: {
    name: "category";
    children: {
      name: string;
      children?: {
        name: string;
        value: number;
      }[];
    }[];
  } = { name: "category", children: [] };
  const keys = Object.keys(categorizeData);
  keys
    .filter((k) => {
      // firstCategoryがアレば絞り込み
      if (typeof firstCategory === "string") {
        return k === firstCategory;
      } else {
        return true;
      }
    })
    .map((k) => {
      Object.keys(categorizeData[k]).map((kk) => {
        viewableFormats.children.push({ name: k, children: [] });
        viewableFormats.children[
          viewableFormats.children.length - 1
        ].children!.push({
          name: kk,
          value: categorizeData[k][kk],
        });
      });
    });
  return viewableFormats as TreemapData;
};
