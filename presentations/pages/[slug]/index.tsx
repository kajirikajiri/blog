import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostHeader from "@/presentations/pages/[slug]/post-header";
import Layout from "@/components/Layout";
import { getPostBySlug, getAllPosts, getTreemapData } from "@/lib/api";
import { PostTitle } from "@/components/PostTitle";
import Head from "next/head";
import { PostType } from "@/types/post";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { MyBreadcrumbs } from "./MyBreadcrumbs";
import mediumZoom from "medium-zoom";
import { useEffect } from "react";
import genReadingTime from "reading-time";
import styles from "./githubMarkdown.module.css";
import { Toc } from "./markdownComponents/Toc";
import { NotebookList } from "./markdownComponents/NotebookList";
import { MyLink } from "./markdownComponents/MyLink";
import { Youtube } from "./markdownComponents/Youtube";
import { Hint } from "./markdownComponents/Hint";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
  readingTimeText: string;
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
};

export const Slug = ({ post, preview, readingTimeText, source }: Props) => {
  const components = {
    Box: (props: any) => <Box {...props} />,
    NotebookList: (props: any) => <NotebookList {...props} />,
    Toc: (props: any) => <Toc {...props} />,
    MyLink: (props: any) => <MyLink {...props} />,
    Youtube: (props: any) => <Youtube {...props} />,
    Hint: (props: any) => <Hint {...props} />,
  };
  useEffect(() => {
    mediumZoom("article img");
  }, []);
  const classes = useStyles();
  const router = useRouter();
  const handleClick = () => {
    window
      .open(
        `https://docs.google.com/forms/d/e/1FAIpQLSd0jode9fRHYKmHXPLQv-NaV_nHqF80MIYsxhYoo-e_YsXMoQ/viewform?usp=pp_url&entry.104525378=${"こめんと"}&entry.65983432=${"なまえ"}&entry.1085010270=${
          location.href
        }`,
        "_blank"
      )
      ?.focus();
  };
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout
      containerClassName={classes.container}
      preview={preview}
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
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/atom-one-dark.min.css"
              />
              <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/highlight.min.js" />
              <script>hljs.initHighlightingOnLoad();</script>
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              readingTimeText={readingTimeText}
            />
            <Box className={[styles["markdown-body"]].join(" ")}>
              <MDXRemote {...source} components={components} />
            </Box>
          </article>
        </>
      )}
      <Button
        size="small"
        style={{ padding: 0, fontSize: 10, minWidth: 0 }}
        onClick={handleClick}
      >
        コメント
      </Button>
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
      source: await serialize(post.content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm, html],
        },
      }),
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
