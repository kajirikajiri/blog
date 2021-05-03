import { Box } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

type Props = {
  word: string;
};

export const H2Header = ({ word }: Props) => {
  return (
    <Box width="100%">
      <Box
        height={60}
        bgcolor={indigo[400]}
        component="h2"
        display="flex"
        alignItems="center"
        paddingLeft={2}
        color="#e2e0e0"
        style={{ marginBlockStart: 0 }}
      >
        {word}
      </Box>
    </Box>
  );
};
