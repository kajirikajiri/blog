import { Profile } from "./index/Profile";
import { Box, Link } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
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
      <Profile />
      <Box height={80}> </Box>
      {pathNames[0] !== "category" && (
        <Box
          width="100%"
          bgcolor="#000"
          color="#fff"
          height={40}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Link href={"/category"} color="inherit">
            カテゴリ一覧
          </Link>
          <ChevronRight fontSize="small" />
        </Box>
      )}
      {/* <Box height={10} bgcolor="pink" marginBottom={"45px"}>
        TOC
      </Box> */}
    </aside>
  );
};
