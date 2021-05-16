import { Box } from "@material-ui/core";

type Props = {
  word: string;
};

export const H2Header = ({ word }: Props) => {
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
        style={{ marginBlockStart: 0 }}
      >
        {word}
      </Box>
    </Box>
  );
};
