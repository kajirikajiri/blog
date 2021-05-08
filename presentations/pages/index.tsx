import Layout from "@/components/Layout";
import { getAllPosts, getOrderPosts, getTreemapData } from "@/lib/api";
import { PostType } from "@/types/post";
import { TreemapData } from "@/types/treemapData";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Left1Right3Layout } from "./index/Left1Right3Layout";

type Props = {
  treemapData: TreemapData;
  editorCategoryPosts: PostType[];
  blogCategoryPosts: PostType[];
  healthCategoryPosts: PostType[];
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

export const Index = ({
  editorCategoryPosts,
  treemapData,
  healthCategoryPosts,
  blogCategoryPosts,
}: Props) => {
  const classes = useStyles();
  return (
    <>
      <Layout
        treemapData={treemapData}
        headerComponent={"h1"}
        description={`どうもかじりです🐔🥦エンジニアの'かじり'がObsidianやJamstack、健康についての記事を書いてます。A statically generated blog using Next.js by かじり.`}
      >
        <Left1Right3Layout
          categoryLink={"/category/editor"}
          category={"エディタ"}
          orderPosts={editorCategoryPosts}
        />
        <Box width="100%" className={classes.pad}></Box>
        <Left1Right3Layout
          categoryLink={"/category/blog"}
          category={"ブログ"}
          orderPosts={blogCategoryPosts}
        />
        <Box width="100%" className={classes.pad}></Box>
        <Left1Right3Layout
          categoryLink={"/category/health"}
          category={"健康"}
          orderPosts={healthCategoryPosts}
        />
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

  // editor category
  const editorCategorySlugs: Slugs = [
    "obsidian-moc-usage-part-2-2021",
    "obsidian-moc-usage-2021",
    "obsidian-usage-2021",
  ];
  const editorCategoryPosts = getOrderPosts(allPosts, editorCategorySlugs);

  // blog category
  const blogCategorySlugs: Slugs = ["jamstack-blog-2021"];
  const blogCategoryPosts = getOrderPosts(allPosts, blogCategorySlugs);

  // health category
  const healthCategorySlugs: Slugs = ["stretch-before-going-to-bed"];
  const healthCategoryPosts = getOrderPosts(allPosts, healthCategorySlugs);

  // error handling // そのままreturnすると分かりづらいエラーが発生するため
  const error = [
    ...editorCategoryPosts,
    ...blogCategoryPosts,
    ...healthCategoryPosts,
  ].some((p) => p === void 0);
  if (error) {
    throw Error("存在しないファイル名をCategorySlugsに指定していませんか??");
  }

  return {
    props: {
      editorCategoryPosts,
      blogCategoryPosts,
      treemapData,
      healthCategoryPosts,
    },
  };
};
