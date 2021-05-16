import { Box } from "@material-ui/core";
import { ElementType } from "react";

type Props = {
  headerComponent?: ElementType;
};

export const Header = ({ headerComponent }: Props) => {
  return (
    <header
      style={{
        position: "relative",
        width: "100%",
        height: 92,
        marginBottom: 10,
      }}
    >
      <a
        style={{ position: "absolute", height: "100%", width: "100%" }}
        href="/"
        aria-label="home"
      ></a>
      <Box
        fontFamily="DotGothic16"
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize={30}
        component={headerComponent}
        margin={0}
        bgcolor="#fff"
        fontWeight="bold"
        borderBottom="2px solid #000"
      >
        <span itemType="https://schema.org/Person" itemProp="name" itemScope>
          かじり
        </span>
        ブログ
      </Box>
    </header>
  );
};
