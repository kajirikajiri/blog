import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useCategoryOuterStyles = makeStyles((theme: Theme) =>
  createStyles({
    categoryOuter: {
      [theme.breakpoints.up("ss")]: {
        height: "200vh",
      },
      [theme.breakpoints.up("s")]: {
        height: "200vh",
      },
      [theme.breakpoints.up("t")]: {
        height: "100vh",
      },
    },
  })
);
