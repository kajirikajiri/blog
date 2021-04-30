import MoreStories from "../../components/more-stories";
import HeroPost from "../../components/hero-post";
import Layout from "@/components/Layout";
import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";
import { Box } from "@material-ui/core";

type Props = {
  allPosts: Post[];
};

export const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout>
        <Box paddingX={"30px"} paddingY={"40px"}>
          <Box display="flex">
            <Box>
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
            <Box>
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
