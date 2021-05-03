import { Box } from "@material-ui/core";
import { ElementType } from "react";

type Props = {
  headerComponent?: ElementType;
};

export const Header = ({ headerComponent }: Props) => {
  return (
    <header style={{ position: "relative" }}>
      <a
        style={{ position: "absolute", height: "100%", width: "100%" }}
        href="/"
        aria-label="home"
      ></a>
      <Box
        fontFamily="DotGothic16"
        width="258px"
        height="62px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize={30}
        component={headerComponent}
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
