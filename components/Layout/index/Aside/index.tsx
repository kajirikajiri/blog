import { TreemapData } from "@/types/treemapData";
import { Box } from "@material-ui/core";
import { Category } from "./index/Category";
import { Profile } from "./index/Profile";

type Props = {
  treemapData: TreemapData;
};

export const Aside = ({ treemapData }: Props) => {
  return (
    <aside>
      {/* <Box height={300} bgcolor="pink" marginBottom={"42px"}>
        広告
      </Box> */}
      {/* <Box height={45} bgcolor="pink" marginBottom={"45px"}>
        検索
      </Box> */}
      <Profile />
      <Box height={20}> </Box>
      <Box
        fontFamily="DotGothic16"
        fontSize={19}
        display="flex"
        justifyContent="center"
        paddingBottom={1}
        paddingTop={4}
      >
        カテゴリ
      </Box>
      <Box width="100%" height="200px">
        <Category treemapData={treemapData} />
      </Box>
      {/* <Box height={10} bgcolor="pink" marginBottom={"45px"}>
        TOC
      </Box> */}
    </aside>
  );
};
