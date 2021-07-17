import Layout from "@/components/Layout";
import { getAllPosts, getOrderPosts } from "@/lib/api";
import { PostType } from "@/types/post";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Left1Right3Layout } from "./index/Left1Right3Layout";

type Props = {
  editorCategoryPosts: PostType[];
  programmingCategoryPosts: PostType[];
  javascriptCategoryPosts: PostType[];
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
  programmingCategoryPosts,
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
          categoryLink={"/category/editor/"}
          category={"エディタ"}
          orderPosts={editorCategoryPosts}
        />
        <Box width="100%" className={classes.pad}></Box>
        <Left1Right3Layout
          categoryLink={"/category/programming/"}
          category={"Programming"}
          orderPosts={programmingCategoryPosts}
        />
        <Box width="100%" className={classes.pad}></Box>
        <Left1Right3Layout
          categoryLink={"/category/javascript/"}
          category={"JavaScript"}
          orderPosts={javascriptCategoryPosts}
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

  // programming category
  const programmingCategorySlugs: Slugs = [
    "when-you-dont-know-how-to-program",
    "googling-for-programming",
  ];
  const programmingCategoryPosts = getOrderPosts(
    allPosts,
    programmingCategorySlugs
  );

  // programming category
  const javascriptCategorySlugs: Slugs = [
    "javascript-promise",
    "javascript-function",
    "thinking-about-programmatically-input-data-using-e2e-as-a-reference",
  ];
  const javascriptCategoryPosts = getOrderPosts(
    allPosts,
    javascriptCategorySlugs
  );

  // error handling // そのままreturnすると分かりづらいエラーが発生するため
  const error = [
    ...editorCategoryPosts,
    ...programmingCategoryPosts,
    ...javascriptCategoryPosts,
  ].some((p) => p === void 0);
  if (error) {
    throw Error("存在しないファイル名をCategorySlugsに指定していませんか??");
  }

  return {
    props: {
      editorCategoryPosts,
      programmingCategoryPosts,
      javascriptCategoryPosts,
    },
  };
};
