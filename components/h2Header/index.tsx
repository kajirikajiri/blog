import { Box } from "@mui/material";
import { CSSProperties } from "react";

type Props = {
  word: string;
  h2Style?: CSSProperties;
};

export const H2Header = ({ word, h2Style }: Props) => {
  return (
    <Box width="100%">
      <Box
        height={60}
        bgcolor={"#000"}
        component="h2"
        display="flex"
        alignItems="center"
        paddingLeft={2}
        color="#fff"
        style={{ marginBlockStart: 0, ...h2Style }}
      >
        {word}
      </Box>
    </Box>
  );
};
