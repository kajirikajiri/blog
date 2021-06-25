import Layout from "@/components/Layout";
import { getAllPosts, getOrderPosts } from "@/lib/api";
import { PostType } from "@/types/post";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Left1Right3Layout } from "./index/Left1Right3Layout";

type Props = {
  editorCategoryPosts: PostType[];
  healthCategoryPosts: PostType[];
  sideworkCategoryPosts: PostType[];
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
  healthCategoryPosts,
  sideworkCategoryPosts,
}: Props) => {
  const classes = useStyles();
  return (
    <>
      <Layout
        headerComponent={"h1"}
        description={`みなさんこんにちは、かじりです。工場勤務からエンジニアになった'かじり'がObsidianやプログラミングの難しかったこと、健康についての記事を書いてます。A statically generated blog using Next.js by かじり.`}
      >
        <Left1Right3Layout
          categoryLink={"/category/editor/"}
          category={"エディタ"}
          orderPosts={editorCategoryPosts}
        />
        <Box width="100%" className={classes.pad}></Box>
        <Left1Right3Layout
          categoryLink={"/category/health/"}
          category={"健康"}
          orderPosts={healthCategoryPosts}
        />
        <Box width="100%" className={classes.pad}></Box>
        <Left1Right3Layout
          categoryLink={"/category/health/"}
          category={"副業"}
          orderPosts={sideworkCategoryPosts}
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
    "tags",
  ]);

  type Slugs = string[];

  // editor category
  const editorCategorySlugs: Slugs = [
    "obsidian-vscode-extension",
    "obsidian-moc-usage-part-2-2021",
    "obsidian-moc-usage-2021",
    "obsidian-usage-2021",
  ];
  const editorCategoryPosts = getOrderPosts(allPosts, editorCategorySlugs);

  // health category
  const healthCategorySlugs: Slugs = ["stretch-before-going-to-bed"];
  const healthCategoryPosts = getOrderPosts(allPosts, healthCategorySlugs);

  // sidework category
  const sideworkCategorySlugs: Slugs = ["engineer-side-job-once-a-week"];
  const sideworkCategoryPosts = getOrderPosts(allPosts, sideworkCategorySlugs);

  // error handling // そのままreturnすると分かりづらいエラーが発生するため
  const error = [
    ...editorCategoryPosts,
    ...healthCategoryPosts,
    ...sideworkCategoryPosts,
  ].some((p) => p === void 0);
  if (error) {
    throw Error("存在しないファイル名をCategorySlugsに指定していませんか??");
  }

  return {
    props: {
      editorCategoryPosts,
      healthCategoryPosts,
      sideworkCategoryPosts,
    },
  };
};
