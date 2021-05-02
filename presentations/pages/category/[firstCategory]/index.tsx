import { Category } from "@/components/Category";
import Layout from "@/components/Layout";
import { getAllPosts, getTreemapData } from "@/lib/api";
import { PostType } from "@/types/post";
import { TreemapData } from "@/types/treemapData";
import { Box } from "@material-ui/core";
import { Posts } from "../Posts";
import { useCategoryOuterStyles } from "../useCategoryOuterStyles";

type Props = {
  categorizedPosts: PostType[];
  categorizedTreemapData: TreemapData;
  treemapData: TreemapData;
};

export const FirstCategory = ({
  categorizedTreemapData,
  treemapData,
  categorizedPosts,
}: Props) => {
  const classes = useCategoryOuterStyles();
  return (
    <Layout
      treemapData={treemapData}
      posts={<Posts posts={categorizedPosts} />}
    >
      <Box height={300} className={classes.categoryOuter}>
        <Category treemapData={categorizedTreemapData} />
      </Box>
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
    props: { categorizedPosts, categorizedTreemapData, treemapData },
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
