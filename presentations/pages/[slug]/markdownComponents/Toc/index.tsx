import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";

export const Toc = () => {
  const [tocObj, setTocObj] = useState<{ text: string; id: string }[]>();
  useEffect(() => {
    const tocObj = Array.from(document.querySelectorAll("h2")).map((e, i) => {
      const id = `__h2_${i}__`;
      e.id = id;
      return {
        id,
        text: e.innerText,
      };
    });
    setTocObj(tocObj);
  }, []);
  if (Array.isArray(tocObj)) {
    return (
      <Box marginY={10}>
        <Box fontSize={40} lineHeight={"38px"}>
          <Box>TABLE</Box>
          <Box paddingY={0.8}>OF CONTENTS</Box>
        </Box>
        <Box border="5px solid #000" paddingX={3} paddingY={4}>
          {tocObj.map((t, i) => {
            return (
              <Box
                key={i}
                paddingBottom={1}
                display="flex"
                position="relative"
                alignItems="baseline"
              >
                <Box
                  zIndex={1}
                  component={"a"}
                  {...{ href: `#${t.id}` }}
                  position="absolute"
                  width="100%"
                  height="100%"
                ></Box>
                <Box fontSize={30} fontWeight="bold">
                  {i.toString().length === 1 ? "0" : ""}
                  {i}
                </Box>
                <Box
                  paddingLeft={1}
                  width="100%"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.text}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  return <></>;
};
