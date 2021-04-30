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
    parent: {
      [theme.breakpoints.up("ss")]: {
        height: 560,
        flexDirection: "column",
      },
      [theme.breakpoints.up("s")]: {
        height: 310,
        flexDirection: "row",
      },
    },
    childLeft: {
      [theme.breakpoints.up("ss")]: {
        height: "60%",
        paddingBottom: 10,
        paddingRight: 0,
      },
      [theme.breakpoints.up("s")]: {
        height: "100%",
        paddingBottom: 0,
        paddingRight: 10,
      },
    },
    childRight: {
      [theme.breakpoints.up("ss")]: {
        height: "40%",
        paddingBottom: 0,
        paddingRight: 0,
      },
      [theme.breakpoints.up("s")]: {
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
            <Box className={classes.childLeft} width={"100%"}>
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
            <Box className={classes.childRight} width="100%">
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
