import { PostPreview } from "./index/PostPreview";
import Post from "@/types/post";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";

type Props = {
  posts: Post[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parent: {
      [theme.breakpoints.up("ss")]: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        overflow: "scroll",
      },
      [theme.breakpoints.up("s")]: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        overflow: "visible",
      },
    },
  })
);

export const MoreStories = ({ posts }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.parent}>
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      ))}
    </Box>
  );
};
