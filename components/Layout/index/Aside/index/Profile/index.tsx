import Box from "@mui/material/Box";

export const Profile = () => {
  return (
    <>
      <Box display="flex" justifyContent="center" width="100%">
        <Box
          display="flex"
          maxWidth="257px"
          width="70%"
          borderRadius="50%"
          overflow="hidden"
          component={"a"}
          {...{ href: "/profile" }}
        >
          <img
            loading="lazy"
            width="100%"
            height="100%"
            style={{ objectFit: "contain" }}
            alt={`かじり`}
            src="/me.jpg"
          />
        </Box>
      </Box>
      <Box
        fontFamily="DotGothic16"
        display="flex"
        width="100%"
        alignItems="center"
        flexDirection="column"
        marginTop={1}
      >
        <Box fontSize={20} paddingBottom={1}>
          <span itemType="https://schema.org/Person" itemProp="name" itemScope>
            かじり
          </span>
          /中村一貴
        </Box>
        <Box>チャレンジしていこう！</Box>
      </Box>
    </>
  );
};
