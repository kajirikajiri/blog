import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "@/presentations/pages/[slug]/post-body";
import PostHeader from "@/presentations/pages/[slug]/post-header";
import Layout from "@/components/Layout";
import { getPostBySlug, getAllPosts, getTreemapData } from "@/lib/api";
import { PostTitle } from "@/components/PostTitle";
import Head from "next/head";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostType } from "@/types/post";
import { TreemapData } from "@/types/treemapData";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { MyBreadcrumbs } from "./MyBreadcrumbs";
import mediumZoom from "medium-zoom";
import { useEffect } from "react";
import genReadingTime from "reading-time";

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
            <PostBody content={post.content} />
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
    "tag",
  ]);
  const treemapData = getTreemapData(allPosts);

  const content = await markdownToHtml((post.content as string) || "");

  const readingTime = genReadingTime(content);

  return {
    props: {
      treemapData,
      readingTimeText: readingTime.text,
      post: {
        ...post,
        content,
      },
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
