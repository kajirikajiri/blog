import { PostType } from "@/types/post";
import { Box, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { PostPreview } from "./index/PostPreview";

type Props = {
  posts: PostType[];
};

const useStyles = makeStyles((theme: Theme) => ({
  parent: {
    [theme.breakpoints.up("ss")]: {
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "normal",
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
}));

export const MoreStories = ({ posts }: Props) => {
  const classes = useStyles();
  if (posts.length > 3) {
    console.log(
      `3個までしか処理できないんだよね。${posts.length}個渡されたけどさ。`
    );
  }
  const PostElements = posts
    .slice(0, 3)
    .map((post) => (
      <PostPreview
        key={post.slug}
        coverImage={post.coverImage}
        date={post.date}
        slug={post.slug}
        title={post.title}
        author={post.author}
      />
    ));
  if (PostElements.length < 3) {
    const loopCount = 3 - PostElements.length;
    [...Array(loopCount)].map((_, i) => {
      PostElements.push(<PostPreview key={`__skelton${i}__`} />);
    });
  }

  return <Box className={classes.parent}>{PostElements}</Box>;
};
