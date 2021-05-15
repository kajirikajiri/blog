import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostHeader from "@/presentations/pages/[slug]/post-header";
import Layout from "@/components/Layout";
import { getPostBySlug, getAllPosts, getTreemapData } from "@/lib/api";
import { PostTitle } from "@/components/PostTitle";
import Head from "next/head";
import { PostType } from "@/types/post";
import { TreemapData } from "@/types/treemapData";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { MyBreadcrumbs } from "./MyBreadcrumbs";
import mediumZoom from "medium-zoom";
import { useEffect } from "react";
import genReadingTime from "reading-time";
import MDX from "@mdx-js/runtime";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
import toc from "remark-toc";
import footnotes from "remark-footnotes";
import breaks from "remark-breaks";
import styles from "./githubMarkdown.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      [theme.breakpoints.up("ss")]: {
        padding: 15,
      },
      [theme.breakpoints.up("s")]: {
        padding: 15,
      },
      [theme.breakpoints.up("t")]: {
        padding: 45,
      },
    },
  })
);

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
  treemapData: TreemapData;
  readingTimeText: string;
};

export const Slug = ({
  post,
  preview,
  treemapData,
  readingTimeText,
}: Props) => {
  const components = {
    Box: (props: any) => <Box {...props} />,
  };
  useEffect(() => {
    mediumZoom("article img");
  }, []);
  const classes = useStyles();
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout
      containerClassName={classes.container}
      preview={preview}
      treemapData={treemapData}
      title={`${post.title} | かじりブログ`}
      description={post.excerpt}
    >
      <MyBreadcrumbs
        firstCategory={post.category.first}
        secondCategory={post.category.second}
      />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <Head>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              readingTimeText={readingTimeText}
            />
            <Box className={[styles["markdown-body"]].join(" ")}>
              <MDX
                remarkPlugins={[
                  remarkParse,
                  remarkGfm,
                  remarkSlug,
                  [
                    remarkAutolinkHeadings,
                    {
                      behavior: "append",
                      content: {
                        type: "element",
                        tagName: "span",
                        properties: {
                          className: ["icon", "icon-link"],
                          style: [
                            `;font-size:13px;padding-left:5px;padding-right:5px;`,
                          ],
                        },
                        children: [
                          {
                            type: "text",
                            value: "🔗",
                          },
                        ],
                      },
                    },
                  ],
                  [toc, { tight: true, maxDepth: 2 }],
                  footnotes,
                  breaks,
                ]}
                components={components}
              >
                {post.content}
              </MDX>
            </Box>
          </article>
        </>
      )}
    </Layout>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "excerpt",
    "coverImage",
    "category",
  ]);
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "category",
    "tags",
  ]);
  const treemapData = getTreemapData(allPosts);

  const readingTime = genReadingTime(post.content as string);

  return {
    props: {
      treemapData,
      post,
      readingTimeText: readingTime.text,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((posts: any) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}
