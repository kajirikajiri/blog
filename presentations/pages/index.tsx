import Layout from "@/components/Layout";
import { getAllPosts, getOrderPosts, getTreemapData } from "@/lib/api";
import { PostType } from "@/types/post";
import { TreemapData } from "@/types/treemapData";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Left1Right3Layout } from "./index/Left1Right3Layout";

type Props = {
  treemapData: TreemapData;
  editorCategoryPosts: PostType[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pad: {
      [theme.breakpoints.up("ss")]: {
        height: 30,
      },
      [theme.breakpoints.up("t")]: {
        height: 40,
      },
      [theme.breakpoints.up("l")]: {
        height: 50,
      },
    },
  })
);

export const Index = ({ editorCategoryPosts, treemapData }: Props) => {
  const classes = useStyles();
  return (
    <>
      <Box
        fontFamily="DotGothic16"
        fontSize={150}
        width={1200}
        height={630}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        かじりブログ
      </Box>
      <Layout treemapData={treemapData} headerComponent={"h1"}>
        <Left1Right3Layout
          categoryLink={"/category/editor"}
          category={"エディタ"}
          orderPosts={editorCategoryPosts}
        />
        <Box width="100%" className={classes.pad}></Box>
      </Layout>
    </>
  );
};

// ビルド時に実行される
// https://qiita.com/matamatanot/items/1735984f40540b8bdf91
export const getStaticProps = async () => {
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

  type Slugs = string[];
  const editorCategorySlugs: Slugs = [
    "dynamic-routing",
    "hello-world copy",
    "hello-world",
  ];
  const editorCategoryPosts = getOrderPosts(allPosts, editorCategorySlugs);

  return {
    props: { editorCategoryPosts, treemapData },
  };
};
