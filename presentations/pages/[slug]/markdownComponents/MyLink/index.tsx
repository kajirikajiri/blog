import { Box } from "@mui/material";
import Launch from "@mui/icons-material/Launch";

type Props = {
  text: string;
  link: string;
};

export const MyLink = ({ link, text }: Props) => {
  return (
    <Box
      marginBottom={"36px"}
      display="flex"
      alignItems="center"
      position="relative"
      border="1px #000 solid"
      borderRadius={4}
    >
      <Box
        component="a"
        position="absolute"
        {...{ href: link }}
        width="100%"
        height="100%"
      ></Box>
      <Box
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        width="100%"
        paddingX={2}
      >
        <Box display="flex" alignItems="baseline" paddingBottom={1}>
          <Box fontSize={40}>{text.substring(0, 1)}</Box>
          <Box>{text.substring(1)}</Box>
        </Box>
        <Launch />
      </Box>
    </Box>
  );
};
