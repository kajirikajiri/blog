import { Category } from "@/components/Category";
import Layout from "@/components/Layout";
import { getAllPosts, getTreemapData } from "@/lib/api";
import { PostType } from "@/types/post";
import { TreemapData } from "@/types/treemapData";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { MyBreadcrumbs } from "../[slug]/MyBreadcrumbs";
import { Posts } from "./Posts";
import { useCategoryOuterStyles } from "./useCategoryOuterStyles";

const width = 100;
const pad = 4;
const post = (width - pad) / 2;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    post: {
      [theme.breakpoints.up("ss")]: {
        paddingLeft: 0,
        paddingRight: 0,
        width: "100%",
      },
      [theme.breakpoints.up("s")]: {
        paddingLeft: 0,
        paddingRight: 0,
        width: "100%",
      },
      [theme.breakpoints.up("t")]: {
        width: `${post}%`,
      },
    },
    pad: {
      [theme.breakpoints.up("ss")]: {
        width: "0%",
      },
      [theme.breakpoints.up("s")]: {
        width: "0%",
      },
      [theme.breakpoints.up("t")]: {
        width: `${pad}%`,
      },
    },
  })
);

type Props = {
  allPosts: PostType[];
  treemapData: TreemapData;
};

export const CategoryPage = ({ treemapData, allPosts }: Props) => {
  const classes = { ...useStyles(), ...useCategoryOuterStyles() };
  return (
    <Layout treemapData={treemapData} posts={<Posts posts={allPosts} />}>
      <Box>
        <MyBreadcrumbs />
        <Box className={classes.categoryOuter}>
          <Category treemapData={treemapData} />
        </Box>
      </Box>
    </Layout>
  );
};

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

  return {
    props: { allPosts, treemapData },
  };
};
