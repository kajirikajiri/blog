import { Category } from "@/components/Category";
import Head from "next/head";
import { H2Header } from "@/components/h2Header";
import Layout from "@/components/Layout";
import { getAllPosts, getTreemapData } from "@/lib/api";
import { PostType } from "@/types/post";
import { TreemapData } from "@/types/treemapData";
import { Box } from "@material-ui/core";
import { MyBreadcrumbs } from "../../[slug]/MyBreadcrumbs";
import { Posts } from "../Posts";
import { useCategoryOuterStyles } from "../useCategoryOuterStyles";

type Props = {
  categorizedPosts: PostType[];
  categorizedTreemapData: TreemapData;
  treemapData: TreemapData;
  firstCategory: string;
};

export const FirstCategory = ({
  categorizedTreemapData,
  treemapData,
  categorizedPosts,
  firstCategory,
}: Props) => {
  const classes = useCategoryOuterStyles();
  return (
    <Layout headerComponent={"h1"} treemapData={treemapData}>
      <Head>
        <title>
          カテゴリ一覧 {">"} {firstCategory} | かじりブログ
        </title>
        <meta property="og:image" content="/ogp/1200x630.png" />
      </Head>
      <MyBreadcrumbs showCategory />
      <Box height={10}></Box>
      <H2Header word="カテゴリ" />
      <Box height={300} className={classes.categoryOuter}>
        <Category treemapData={categorizedTreemapData} />
      </Box>
      <Box height={40}></Box>
      <Posts posts={categorizedPosts} />
    </Layout>
  );
};

type Params = {
  params: {
    firstCategory: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
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
  const categorizedTreemapData = getTreemapData(allPosts, params.firstCategory);
  const treemapData = getTreemapData(allPosts);

  const categorizedPosts = allPosts.filter((p) => {
    const category = p.category as { first: string };
    return category.first === params.firstCategory;
  });

  return {
    props: {
      categorizedPosts,
      categorizedTreemapData,
      treemapData,
      firstCategory: params.firstCategory,
    },
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts(["category"]);

  return {
    paths: posts.map((post: any) => {
      return {
        params: {
          firstCategory: post.category.first,
        },
      };
    }),
    fallback: false,
  };
}
