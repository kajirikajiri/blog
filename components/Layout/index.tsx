import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { ElementType } from "react";
import { Aside } from "./index/Aside";
import { Footer } from "./index/Footer";
import { Header } from "./index/Header";
import { Meta } from "./index/Meta";

const useStyles = makeStyles((theme: Theme) => ({
  outer: {
    [theme.breakpoints.up("ss")]: {
      padding: "0px 15px 30px 15px",
    },
    [theme.breakpoints.up("t")]: {
      padding: "0px 25px 30px 25px",
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
}));

type Props = {
  preview?: boolean;
  children: React.ReactNode;
  containerClassName?: string;
  headerComponent?: ElementType;
  title?: string;
  description?: string;
};

const Layout = ({
  children,
  containerClassName,
  headerComponent,
  title,
  description,
}: Props) => {
  const classes = useStyles();
  return (
    <>
      <Box
        bgcolor="#fff"
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
        className={classes.outer}
      >
        <Header headerComponent={headerComponent} />
        <Meta title={title} description={description} />
        <Box
          flex={1}
          className={classes.parent}
          display="flex"
          justifyContent="center"
          maxWidth="1180px"
          width="100%"
        >
          <Box
            className={classes.childLeft}
            display="flex"
            flexDirection="column"
          >
            <Box
              component="main"
              className={containerClassName ?? classes.container}
            >
              {children}
            </Box>
          </Box>
          <Box className={classes.childRight}>
            <Box className={classes.asidePad}></Box>
            <Aside />
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
