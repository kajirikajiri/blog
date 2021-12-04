import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormatListBulleted, FormatListNumbered } from "@mui/icons-material";
import React from "react";

type Props = {
  head?: any;
  items?: any[];
  type?: "ol" | "ul";
};

const useStyles = makeStyles(() => ({
  li: {
    listStylePosition: "inside",
    textIndent: "10px",
    height: "auto",
    padding: "10px 10px 10px 0",
  },
  ol: {
    listStylePosition: "inside",
    textIndent: "10px",
    height: "auto",
    padding: "10px 10px 10px 0",
  },
}));

export const NotebookList = ({ head, items, type = "ul" }: Props) => {
  const classes = useStyles();
  if (Array.isArray(items)) {
    return (
      <Box
        boxShadow={2}
        borderRadius={4}
        padding="60px 24px 36px"
        marginBottom={"36px"}
      >
        <Box paddingBottom={1} display="flex" alignItems="center" fontSize={20}>
          {type === "ul" ? (
            <FormatListBulleted fontSize="large" style={{ marginRight: 10 }} />
          ) : (
            <FormatListNumbered
              fontSize={"large"}
              style={{ marginRight: 10 }}
            />
          )}
          {head}
        </Box>
        <Box
          component={type === "ul" ? "ul" : "ol"}
          style={{
            color: "#646464",
            padding: "0",
            borderTop: "2px solid #cecece",
          }}
        >
          {items.map((item, i) => {
            return (
              <Box
                key={i}
                component={"li"}
                className={type === "ul" ? classes.li : classes.ol}
                style={
                  i === items.length - 1
                    ? {
                        borderBottom: "2px solid #cecece",
                      }
                    : { borderBottom: "2px dotted #cecece" }
                }
              >
                {item}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
  return <></>;
};
