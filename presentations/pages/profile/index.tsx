import { CoverImage } from "@/components/CoverImage";
import Layout from "@/components/Layout";
import { getAllPosts, getTreemapData } from "@/lib/api";
import { TreemapData } from "@/types/treemapData";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { MyBreadcrumbs } from "../[slug]/MyBreadcrumbs";

const width = 100;
const pad = 4;
const card = (width - pad) / 2;

type Props = {
  treemapData: TreemapData;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
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
        width: `${card}%`,
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

export const Profile = ({ treemapData }: Props) => {
  const cards = [
    {
      src: "/logos/github.png",
      title: "github",
      href: "https://github.com/kajirikajiri",
    },
    {
      src: "/logos/codesandbox.svg",
      title: "codesandbox",
      href: "https://codesandbox.io/u/kajirikajiri",
    },
    {
      src: "/logos/qiita.png",
      title: "qiita",
      href: "https://qiita.com/kajirikajiri",
    },
    {
      src: "/logos/twitter.svg",
      title: "twitter",
      href: "https://twitter.com/kajirikajiri",
    },
  ];
  const classes = useStyles();
  return (
    <>
      <Layout treemapData={treemapData} headerComponent={"h1"}>
        <MyBreadcrumbs />
        <Box height={20}></Box>
        <Box display="flex" width="100%" flexWrap="wrap" paddingX={0}>
          {cards.map((c, i) => {
            return (
              <>
                <Box
                  className={classes.card}
                  marginBottom={3}
                  component={"a"}
                  {...{ href: c.href }}
                >
                  <Box
                    width="100%"
                    height="300px"
                    bgcolor="#fff"
                    boxShadow={3}
                    padding={2}
                    borderRadius={10}
                    component="h2"
                    margin={0}
                  >
                    <CoverImage src={c.src} title={c.title} />
                  </Box>
                </Box>
                {i % 2 === 0 && <Box className={classes.pad}></Box>}
              </>
            );
          })}
        </Box>
      </Layout>
    </>
  );
};

// ビルド時に実行される
// https://qiita.com/matamatanot/items/1735984f40540b8bdf91
export const getStaticProps = async () => {
  const allPosts = getAllPosts(["category"]);

  const treemapData = getTreemapData(allPosts);

  return {
    props: { treemapData },
  };
};
