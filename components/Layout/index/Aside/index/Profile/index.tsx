import { Box } from "@material-ui/core";

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
        >
          <img
            loading="lazy"
            width="100%"
            height="100%"
            style={{ objectFit: "contain" }}
            alt={`かじり`}
            src="/me.png"
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
          中村一貴/
          <span itemType="https://schema.org/Person" itemProp="name" itemScope>
            かじり
          </span>
        </Box>
        <Box>JavaScriptが得意です。</Box>
        <Box>e2eもやります。</Box>
        <Box>ひげはSnap Cameraによるものです。</Box>
      </Box>
    </>
  );
};
