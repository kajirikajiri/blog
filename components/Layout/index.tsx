import { TreemapData } from "@/types/treemapData";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Aside } from "./index/Aside";
import { Footer } from "./index/Footer";
import { Header } from "./index/Header";
import { Meta } from "./index/Meta";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outer: {
      [theme.breakpoints.up("ss")]: {
        padding: "30px 15px",
      },
      [theme.breakpoints.up("t")]: {
        padding: "30px 25px",
      },
    },
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
        flexDirection: "column",
      },
      [theme.breakpoints.up("s")]: {
        flexDirection: "column",
      },
      [theme.breakpoints.up("t")]: {
        flexDirection: "row",
      },
    },
    childLeft: {
      [theme.breakpoints.up("ss")]: {
        marginRight: 10,
        width: "100%",
      },
      [theme.breakpoints.up("s")]: {
        marginRight: 10,
        width: "100%",
      },
      [theme.breakpoints.up("t")]: {
        marginRight: 10,
        width: "68%",
      },
      [theme.breakpoints.up("l")]: {
        marginRight: 34,
        width: "68%",
      },
    },
    childRight: {
      [theme.breakpoints.up("ss")]: {
        width: "100%",
      },
      [theme.breakpoints.up("s")]: {
        width: "100%",
      },
      [theme.breakpoints.up("t")]: {
        width: "32%",
      },
    },
    asidePad: {
      [theme.breakpoints.up("ss")]: {
        height: 20,
      },
      [theme.breakpoints.up("t")]: {
        height: 0,
      },
    },
  })
);

type Props = {
  treemapData: TreemapData;
  preview?: boolean;
  children: React.ReactNode;
  posts?: React.ReactNode;
  containerClassName?: string;
};

const Layout = ({
  children,
  treemapData,
  posts,
  containerClassName,
}: Props) => {
  const classes = useStyles();
  return (
    <Box
      bgcolor="#EAEDF2"
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      className={classes.outer}
    >
      <Meta />
      <Header />
      <Box
        flex={1}
        className={classes.parent}
        display="flex"
        justifyContent="center"
        maxWidth="1180px"
        width="100%"
      >
        <main className={classes.childLeft} style={{ background: "#fff" }}>
          <Box className={containerClassName ?? classes.container}>
            {children}
          </Box>
          {posts}
        </main>
        <Box className={classes.childRight}>
          <Box className={classes.asidePad}></Box>
          <Aside treemapData={treemapData} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
