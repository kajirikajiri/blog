import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Author from "./author";

export type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  category: {
    first: string;
    second: string;
  };
  tags: string[];
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
};
