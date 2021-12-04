import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useCategoryOuterStyles = makeStyles((theme: Theme) => ({
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
}));
