import Layout from "@/components/Layout";
import { getAllPosts, getOrderPosts } from "@/lib/api";
import Post from "@/types/post";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Left1Right3Layout } from "./index/Left1Right3Layout";

type Props = {
  editorCategoryPosts: Post[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      [theme.breakpoints.up("ss")]: {
        padding: "30px 15px",
      },
      [theme.breakpoints.up("t")]: {
        padding: "30px 25px",
      },
      [theme.breakpoints.up("l")]: {
        padding: "30px 40px",
      },
    },
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

export const Index = ({ editorCategoryPosts }: Props) => {
  const classes = useStyles();
  return (
    <>
      <Layout>
        <Box className={classes.container}>
          <Left1Right3Layout
            category={"エディタ"}
            orderPosts={editorCategoryPosts}
          />
          <Box width="100%" className={classes.pad}></Box>
        </Box>
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
  ]);

  type Slugs = string[];
  const editorCategorySlugs: Slugs = [
    "dynamic-routing",
    "hello-world copy",
    "hello-world",
  ];
  const editorCategoryPosts = getOrderPosts(allPosts, editorCategorySlugs);

  return {
    props: { editorCategoryPosts },
  };
};
