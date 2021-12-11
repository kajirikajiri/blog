import Layout from "@/components/Layout";
import { getAllPosts, getOrderPosts } from "@/lib/api";
import { PostType } from "@/types/post";
import { Box, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Left1Right3Layout } from "./index/Left1Right3Layout";

type Props = {
  editorCategoryPosts: PostType[];
  sideworkCategoryPosts: PostType[];
  javascriptCategoryPosts: PostType[];
};

const useStyles = makeStyles((theme: Theme) => ({
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
}));

export const Index = ({
  editorCategoryPosts,
  sideworkCategoryPosts,
  javascriptCategoryPosts,
}: Props) => {
  const classes = useStyles();
  return (
    <>
      <Layout
        headerComponent={"h1"}
        description={`みなさんこんにちは、かじりです。工場勤務からエンジニアになった'かじり'がObsidianやプログラミングの難しかったこと、健康についての記事を書いてます。A statically generated blog using Next.js by かじり.`}
      >
        <Left1Right3Layout
          categoryLink={"/category/sidework/"}
          category={"副業"}
          orderPosts={sideworkCategoryPosts}
        />
        <Box width="100%" className={classes.pad}></Box>
        <Left1Right3Layout
          categoryLink={"/category/javascript/"}
          category={"JavaScript"}
          orderPosts={javascriptCategoryPosts}
        />
        <Box width="100%" className={classes.pad}></Box>
        <Left1Right3Layout
          categoryLink={"/category/editor/"}
          category={"エディタ"}
          orderPosts={editorCategoryPosts}
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
    "obsidian-ios-android-mobile-app",
    "obsidian-vscode-extension",
    "obsidian-moc-usage-2021",
    "obsidian-usage-2021",
  ];
  const editorCategoryPosts = getOrderPosts(allPosts, editorCategorySlugs);

  // sidework category
  const sideworkCategorySlugs: Slugs = [
    "ive-been-doing-menta-for-almost-3-months-now",
    "engineer-side-job-menta",
    "engineer-side-job-once-a-week",
  ];
  const sideworkCategoryPosts = getOrderPosts(allPosts, sideworkCategorySlugs);

  // javascript category
  const javascriptCategorySlugs: Slugs = [
    "using-ffmpeg-wasm-with-nextjs",
    "thinking-about-programmatically-input-data-using-e2e-as-a-reference",
    "javascript-promise",
    "javascript-function",
  ];
  const javascriptCategoryPosts = getOrderPosts(
    allPosts,
    javascriptCategorySlugs
  );

  // error handling // そのままreturnすると分かりづらいエラーが発生するため
  const error = [
    ...editorCategoryPosts,
    ...sideworkCategoryPosts,
    ...javascriptCategoryPosts,
  ].some((p) => p === void 0);
  if (error) {
    throw Error("存在しないファイル名をCategorySlugsに指定していませんか??");
  }

  return {
    props: {
      editorCategoryPosts,
      sideworkCategoryPosts,
      javascriptCategoryPosts,
    },
  };
};
