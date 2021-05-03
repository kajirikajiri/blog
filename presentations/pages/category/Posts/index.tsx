import { PostType } from "@/types/post";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Post } from "./index/Post";
import { useCategoryOuterStyles } from "../useCategoryOuterStyles";
import { H2Header } from "../../../../components/h2Header";

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
  posts: PostType[];
  Breadcrumbs?: React.ReactNode;
};

export const Posts = ({ posts, Breadcrumbs }: Props) => {
  const classes = { ...useStyles(), ...useCategoryOuterStyles() };
  return (
    <Box bgcolor="#eaedf2">
      {Breadcrumbs && <Box marginBottom={2}>{Breadcrumbs}</Box>}
      <H2Header word={"カテゴリ記事一覧"} />
      <Box width="100%">
        <Box display="flex" width="100%" flexWrap="wrap" paddingX={0}>
          {posts.map((p, i) => {
            return (
              <>
                <Box className={classes.post} paddingBottom={3}>
                  <Box width="100%" bgcolor="#fff" boxShadow={3}>
                    <Post
                      title={p.title}
                      coverImage={p.coverImage}
                      date={p.date}
                      author={p.author}
                      slug={p.slug}
                      excerpt={p.excerpt}
                    />
                  </Box>
                </Box>
                {i % 2 === 0 && <Box className={classes.pad}></Box>}
              </>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
