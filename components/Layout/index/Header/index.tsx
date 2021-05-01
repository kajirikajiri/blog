import { Box } from "@material-ui/core";

export const Header = () => {
  return (
    <header>
      <Box
        fontFamily="DotGothic16"
        width="258px"
        height="62px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize={30}
        component={"h1"}
        margin={0}
      >
        <span itemType="https://schema.org/Person" itemProp="name" itemScope>
          かじり
        </span>
        ブログ
      </Box>
    </header>
  );
};
