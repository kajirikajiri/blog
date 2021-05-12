import { TreemapData } from "@/types/treemapData";
import {
  Backdrop,
  Box,
  Button,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { ZoomInOutlined } from "@material-ui/icons";
import { useState } from "react";
import { Category } from "../../../Category";
import { Profile } from "./index/Profile";
import { Search } from "./index/Search";

const useStyle = makeStyles((theme) =>
  createStyles({
    // hideInner: {
    //   background: 'transparent',
    //   height: '0px',
    //   width: '100%',
    // },
    // showInner: {
    //   background: '#fff',
    //   height: '100%',
    //   width: '100%',
    // },
    hide: {
      background: "transparent",
      position: "static",
      height: "0px",
      width: "0px",
      maxWidth: "0px",
      opacity: 0,
      transition:
        "max-width 1s, height 1s, width 1s, background 1s, opacity 1s",
    },
    show: {
      background: "#fff",
      height: "100%",
      width: "100%",
      padding: 20,
      transition: "background 1s, height 1s",
      borderRadius: 10,
      opacity: 1,
      maxWidth: "700px",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      padding: "40px 32px 40px 32px",
    },
  })
);

type Props = {
  treemapData: TreemapData;
};

export const Aside = ({ treemapData }: Props) => {
  const classes = useStyle();
  const [isShow, setIsShow] = useState(false);
  const handleClick = () => {
    setIsShow(!isShow);
  };

  return (
    <aside>
      {/* <Box height={300} bgcolor="pink" marginBottom={"42px"}>
        広告
      </Box> */}
      <Profile />
      <Box height={40}> </Box>
      <Button variant="outlined" fullWidth onClick={handleClick}>
        <ZoomInOutlined color="disabled" />
        <Box style={{ textTransform: "none" }} color={grey[600]}>
          search by Algolia
        </Box>
      </Button>
      <Backdrop
        open={isShow}
        className={classes.backdrop}
        onClick={() => setIsShow(false)}
      >
        <Box
          className={isShow ? classes.show : classes.hide}
          onClick={(e) => e.stopPropagation()}
        >
          <Search />
        </Box>
      </Backdrop>
      <Box height={40}> </Box>
      <Box width="100%" height="600px">
        <Category treemapData={treemapData} />
      </Box>
      {/* <Box height={10} bgcolor="pink" marginBottom={"45px"}>
        TOC
      </Box> */}
    </aside>
  );
};
