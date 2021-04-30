import { MoreStories } from "./index/MoreStories";
import { HeroPost } from "./index/HeroStories";
import Layout from "@/components/Layout";
import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";
import { Box, createStyles, Link, makeStyles, Theme } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";

type Props = {
  allPosts: Post[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      [theme.breakpoints.up("s")]: {
        padding: "25px 30px",
      },
      [theme.breakpoints.up("l")]: {
        padding: "30px 40px",
      },
    },
    parent: {
      [theme.breakpoints.up("s")]: {
        height: 620,
        flexDirection: "column",
      },
      [theme.breakpoints.up("l")]: {
        height: 310,
        flexDirection: "row",
      },
    },
    child: {
      [theme.breakpoints.up("s")]: {
        height: "50%",
        paddingBottom: 10,
        paddingRight: 0,
      },
      [theme.breakpoints.up("l")]: {
        height: "100%",
        paddingBottom: 0,
        paddingRight: 10,
      },
    },
  })
);

export const Index = ({ allPosts }: Props) => {
  const classes = useStyles();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout>
        <Box className={classes.container}>
          <Box
            height={40}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              borderLeft="thick solid #1c73bd"
              paddingLeft={1}
              component="h2"
            >
              エディタ
            </Box>
            <Box display="flex" alignItems="center" fontSize="13px">
              <Link color="inherit" href="/category/editor">
                エディタの記事一覧
              </Link>
              <ChevronRight fontSize="small" />
            </Box>
          </Box>
          <Box className={classes.parent} display="flex" alignItems="center">
            <Box className={classes.child} width={"100%"}>
              {heroPost && (
                <HeroPost
                  title={heroPost.title}
                  coverImage={heroPost.coverImage}
                  date={heroPost.date}
                  author={heroPost.author}
                  slug={heroPost.slug}
                  excerpt={heroPost.excerpt}
                />
              )}
            </Box>
            <Box className={classes.child} width="100%">
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
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
  ]);

  return {
    props: { allPosts },
  };
};
