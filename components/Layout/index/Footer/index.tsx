import {
  Box,
  createStyles,
  makeStyles,
  SvgIconTypeMap,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import {
  AirportShuttle,
  Bathtub,
  ChildFriendly,
  FreeBreakfast,
  HomeOutlined,
  Hotel,
  HotTub,
  LocalGroceryStore,
  LocalShipping,
  MusicNote,
} from "@material-ui/icons";
import { useEffect, useState } from "react";

export const Footer = () => {
  const useStyles = makeStyles(() =>
    createStyles({
      animatedItem: {
        bottom: -5,
        position: "absolute",
        animation: `$run linear infinite`,
        "-webkit-animation-duration": "20s",
      },
      "@keyframes run": {
        "0%": {
          left: -20,
        },
        "8%": {
          transform: "translateY(0px) rotate(0)",
          left: "8%",
        },
        "9%": {
          transform: "translateY(-3px) rotate(-8deg)",
          left: "9%",
        },
        "10%": {
          transform: "translateY(0px) rotate(0)",
          left: "10%",
        },
        "12%": {
          transform: "translateY(-3px) rotate(8deg)",
          left: "12%",
        },
        "13%": {
          transform: "translateY(0px) rotate(0)",
          left: "13%",
        },
        "28%": {
          transform: "translateY(0px) rotate(0)",
          left: "28%",
        },
        "29%": {
          transform: "translateY(-3px) rotate(-8deg)",
          left: "29%",
        },
        "30%": {
          transform: "translateY(0px) rotate(0)",
          left: "30%",
        },
        "32%": {
          transform: "translateY(-3px) rotate(8deg)",
          left: "32%",
        },
        "33%": {
          transform: "translateY(0px) rotate(0)",
          left: "33%",
        },
        "68%": {
          transform: "translateY(0px) rotate(0)",
          left: "68%",
        },
        "69%": {
          transform: "translateY(-3px) rotate(-8deg)",
          left: "69%",
        },
        "70%": {
          transform: "translateY(0px) rotate(0)",
          left: "70%",
        },
        "72%": {
          transform: "translateY(-3px) rotate(8deg)",
          left: "72%",
        },
        "73%": {
          transform: "translateY(0px) rotate(0)",
          left: "73%",
        },
        "100%": {
          left: "100%",
        },
      },
    })
  );

  const [Icon, setIcon] = useState<
    OverridableComponent<SvgIconTypeMap<{ className: string }, "svg">>
  >(AirportShuttle);
  useEffect(() => {
    setInterval(() => {
      const rndInt = Math.floor(Math.random() * 8) + 1;
      switch (rndInt) {
        case 1:
          setIcon(LocalGroceryStore);
          break;
        case 2:
          setIcon(ChildFriendly);
          break;
        case 3:
          setIcon(Bathtub);
          break;
        case 4:
          setIcon(FreeBreakfast);
          break;
        case 5:
          setIcon(HotTub);
          break;
        case 6:
          setIcon(Hotel);
          break;
        case 7:
          setIcon(LocalShipping);
          break;
        case 8:
          setIcon(MusicNote);
          break;
        default:
          setIcon(AirportShuttle);
          break;
      }
    }, 20000);
  }, []);
  const classes = useStyles();
  return (
    <footer style={{ width: "100%" }}>
      <Box
        paddingY={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="100%"
      >
        <Box
          position="relative"
          width="50%"
          height={35}
          maxWidth="100px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width="100%"
            height="100%"
            position="absolute"
            component="a"
            {...{ href: "/" }}
            aria-label="home"
          ></Box>
          <HomeOutlined />
        </Box>
        <Box color={grey[800]}>©{new Date().getFullYear()} kajiri.dev</Box>
        <Box width="100%" display="flex" justifyContent="center" paddingTop={3}>
          thank you !!
        </Box>
        <Box width="100%" display="flex" justifyContent="center">
          <Box
            overflow="hidden"
            position="relative"
            width="90%"
            maxWidth="480px"
            height={30}
          >
            {Icon && <Icon className={classes.animatedItem} />}
          </Box>
        </Box>
        <Box borderBottom="1px solid black" width="90vw" maxWidth="500px"></Box>
      </Box>
    </footer>
  );
};
