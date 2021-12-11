import { Box } from "@mui/material";
import EmojiObjectsOutlined from "@mui/icons-material/EmojiObjectsOutlined";

type Props = {
  text: string;
};

export const Hint = ({ text }: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      paddingY={3}
      paddingX={2}
      bgcolor="#ebeced4d"
      marginBottom={2}
    >
      <EmojiObjectsOutlined />
      <Box
        marginLeft={1}
        style={{ wordBreak: "break-all", overflowWrap: "break-word" }}
      >
        {text}
      </Box>
    </Box>
  );
};
