import { PostPreview } from "./index/PostPreview";
import Post from "@/types/post";
import { Box } from "@material-ui/core";

type Props = {
  posts: Post[];
};

export const MoreStories = ({ posts }: Props) => {
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
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
