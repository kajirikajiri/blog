import Layout from "@/components/Layout";
import {
  getAllPosts,
  getAllPostsForAlgolia,
  getOrderPosts,
  getTreemapData,
} from "@/lib/api";
import { PostType } from "@/types/post";
import { TreemapData } from "@/types/treemapData";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Left1Right3Layout } from "./index/Left1Right3Layout";
import algoliasearch from "algoliasearch";

type Props = {
  treemapData: TreemapData;
  editorCategoryPosts: PostType[];
  blogCategoryPosts: PostType[];
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
  treemapData,
  healthCategoryPosts,
  blogCategoryPosts,
  sideworkCategoryPosts,
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
          categoryLink={"/category/editor/"}
          category={"エディタ"}
          orderPosts={editorCategoryPosts}
        />
        <Box width="100%" className={classes.pad}></Box>
        <Left1Right3Layout
          categoryLink={"/category/blog/"}
          category={"ブログ"}
          orderPosts={blogCategoryPosts}
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
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
  const disabledAlgoliad = process.env.DISABLED_ALGOLIA;
  // localでなにか変更するたびに実行されて面倒だったのでpackage.jsonから環境変数いれてlocalなら無効にしてる
  if (
    typeof appId === "string" &&
    typeof apiKey === "string" &&
    !(disabledAlgoliad === "true")
  ) {
    const client = algoliasearch(appId, apiKey);
    const allPostsForAlgolia = getAllPostsForAlgolia();
    client
      .initIndex("kajiri.dev")
      .clearObjects()
      .then(() => {
        console.log("success 1");
        client
          .initIndex("kajiri.dev")
          .saveObjects(allPostsForAlgolia)
          .then(({ objectIDs }) => {
            console.log("success 2", objectIDs);
          })
          .catch((reason) => {
            console.log("error 2", reason);
          });
      })
      .catch((reason) => {
        console.log("error 1", reason);
      });
  }

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

  // sidework category
  const sideworkCategorySlugs: Slugs = ["engineer-side-job-once-a-week"];
  const sideworkCategoryPosts = getOrderPosts(allPosts, sideworkCategorySlugs);

  // error handling // そのままreturnすると分かりづらいエラーが発生するため
  const error = [
    ...editorCategoryPosts,
    ...blogCategoryPosts,
    ...healthCategoryPosts,
    ...sideworkCategoryPosts,
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
      sideworkCategoryPosts,
    },
  };
};
