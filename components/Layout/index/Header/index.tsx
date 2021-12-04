import { Box } from "@mui/material";
import { ElementType } from "react";
import { useRouter } from "next/router";

type Props = {
  headerComponent?: ElementType;
};

export const Header = ({ headerComponent }: Props) => {
  const router = useRouter();
  return (
    <header
      style={{
        position: "relative",
        width: "100%",
        height: 92,
        marginBottom: 10,
      }}
    >
      {router.pathname !== "/" && (
        <a
          style={{ position: "absolute", height: "100%", width: "100%" }}
          href="/"
          aria-label="home"
        ></a>
      )}
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
