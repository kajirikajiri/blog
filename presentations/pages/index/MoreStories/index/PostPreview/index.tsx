import DateFormatter from "@/components/date-formatter";
import CoverImage from "@/components/cover-image";
import Author from "@/types/author";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parent: {
      [theme.breakpoints.up("ss")]: {
        minWidth: "80vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        margin: "0 5px",
      },
      [theme.breakpoints.up("s")]: {
        minWidth: "auto",
        width: "100%",
        height: "31.5%",
        display: "flex",
        flexDirection: "row",
        margin: "0 5px",
      },
    },
    childLeft: {
      [theme.breakpoints.up("ss")]: {
        height: "70%",
        width: "100%",
      },
      [theme.breakpoints.up("s")]: {
        height: "100%",
        width: "100%",
        margin: "0",
      },
    },
    childRight: {
      [theme.breakpoints.up("ss")]: {
        height: "30%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      },
      [theme.breakpoints.up("s")]: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      },
    },
  })
);

export const PostPreview = ({
  title,
  coverImage,
  date,
  // excerpt,
  // author,
  slug,
}: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.parent} position="relative">
      <a
        aria-label={title}
        href={`/${slug}`}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      ></a>
      <Box
        className={classes.childLeft}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CoverImage slug={slug} title={title} src={coverImage} />
      </Box>
      <Box className={classes.childRight}>
        <Box height="70%" display="flex" alignItems="center">
          <Box
            fontWeight="bold"
            fontSize={13}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              wordBreak: "break-all",
              overflow: "hidden",
            }}
          >
            {title}
          </Box>
        </Box>
        <Box
          alignItems="center"
          display="flex"
          color={grey[700]}
          fontSize={13}
          height="30%"
        >
          <AccessTime
            fontSize="inherit"
            style={{ marginBottom: 1 }}
            color="inherit"
          />
          <DateFormatter dateString={date} />
        </Box>
      </Box>
      {/* <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} /> */}
    </Box>
  );
};
