import { Profile } from "./index/Profile";
import Box from "@mui/material/Box";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/router";

export const Aside = () => {
  const router = useRouter();

  // what filter
  // if '/category/foo'.split('/')
  // splitted ['', 'category', 'foo']
  // filtered ['category', 'foo']
  const pathNames = router.pathname.split("/").filter((str) => str !== "");

  return (
    <aside>
      {/* <Box height={300} bgcolor="pink" marginBottom={"42px"}>
        広告
      </Box> */}
      {pathNames[0] !== "profile" && <Profile />}
      <Box height={80}> </Box>
      {pathNames[0] !== "category" && (
        <>
          <Box
            width="100%"
            borderColor="#000"
            border="1px solid"
            color="#000"
            height={40}
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            <a
              href={"/category"}
              color="inherit"
              style={{ position: "absolute", width: "100%", height: "100%" }}
            ></a>
            カテゴリ一覧
            <ChevronRight fontSize="small" />
          </Box>
          <Box marginTop={2} />
        </>
      )}
      <Box
        width="100%"
        borderColor="#000"
        border="1px solid"
        color="#000"
        height={40}
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <a
          href={"/scrawl"}
          color="inherit"
          style={{ position: "absolute", width: "100%", height: "100%" }}
        ></a>
        はしりがき
        <ChevronRight fontSize="small" />
      </Box>
      {/* <Box height={10} bgcolor="pink" marginBottom={"45px"}>
        TOC
      </Box> */}
    </aside>
  );
};
