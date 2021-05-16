import { Box } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { HomeOutlined } from "@material-ui/icons";

export const Footer = () => {
  return (
    <footer style={{ width: "100%" }}>
      <Box
        paddingY={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="100%"
      >
        <Box
          position="relative"
          width="50%"
          height={35}
          maxWidth="100px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width="100%"
            height="100%"
            position="absolute"
            component="a"
            {...{ href: "/" }}
            aria-label="home"
          ></Box>
          <HomeOutlined />
        </Box>
        <Box color={grey[800]}>©{new Date().getFullYear()} kajiri.dev</Box>
      </Box>
    </footer>
  );
};
