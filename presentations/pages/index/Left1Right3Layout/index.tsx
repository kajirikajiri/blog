import { MoreStories } from "./index/MoreStories";
import { HeroPost } from "./index/HeroPost";
import { Box, createStyles, Link, makeStyles, Theme } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import { PostType } from "@/types/post";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

type Props = {
  orderPosts: PostType[];
  category: string;
  categoryLink: string;
};

export const Left1Right3Layout = ({
  orderPosts,
  category,
  categoryLink,
}: Props) => {
  const classes = useStyles();
  const heroPost = orderPosts[0];
  const morePosts = orderPosts.slice(1);
  return (
    <>
      <Box
        height={40}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          borderLeft={`thick solid ${blue[600]}`}
          paddingLeft={1}
          component="h2"
        >
          {category}
        </Box>
        <Box display="flex" alignItems="center" fontSize="13px">
          <Link color="inherit" href={categoryLink}>
            {category}の記事一覧
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
          {<MoreStories posts={morePosts} />}
        </Box>
      </Box>
    </>
  );
};
