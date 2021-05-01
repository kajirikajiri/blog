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
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
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

export const getTreemapData = (allPosts: Items[]): TreemapData[] => {
  const result: { [key: string]: { [key: string]: number } } = {};
  allPosts.forEach((p) => {
    const pp = p as { category: { first: string; second: string } };
    if (!(pp.category.first in result)) {
      result[pp.category.first] = {};
    }
    if (!(pp.category.second in result[pp.category.first])) {
      result[pp.category.first][pp.category.second] = 1;
    }
    ++result[pp.category.first][pp.category.second];
  });
  const resultArrays: {
    name: string;
    parent: string;
    value: string | number;
  }[] = [];
  const keys = Object.keys(result);
  keys.map((k) => {
    const parent = `__firstCategory__${k}`;
    resultArrays.push({
      name: parent,
      parent: "",
      value: "",
    });
    Object.keys(result[k]).map((kk) => {
      resultArrays.push({
        name: kk,
        parent: parent,
        value: result[k][kk],
      });
    });
  });
  return resultArrays;
};
