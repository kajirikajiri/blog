import { TreemapData } from "@/types/treemapData";
import { Box } from "@material-ui/core";
import { Category } from "../../../Category";
import { Profile } from "./index/Profile";
import { Search } from "./index/Search";

type Props = {
  treemapData: TreemapData;
};

export const Aside = ({ treemapData }: Props) => {
  return (
    <aside>
      {/* <Box height={300} bgcolor="pink" marginBottom={"42px"}>
        広告
      </Box> */}
      <Profile />
      <Box height={20}> </Box>
      <Box width="100%" height="600px">
        <Category treemapData={treemapData} />
      </Box>
      <Box height={20}> </Box>
      <Box height={45} marginBottom={"45px"}>
        <Search />
      </Box>
      {/* <Box height={10} bgcolor="pink" marginBottom={"45px"}>
        TOC
      </Box> */}
    </aside>
  );
};
