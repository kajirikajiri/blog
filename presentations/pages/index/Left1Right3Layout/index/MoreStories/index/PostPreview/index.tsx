import { DateFormatter } from "@/components/DateFormatter";
import { CoverImage } from "@/components/CoverImage";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";
import Author from "@/types/author";

type Props = {
  title?: string;
  coverImage?: string;
  date?: string;
  slug?: string;
  author?: Author;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parent: {
      [theme.breakpoints.up("ss")]: {
        minWidth: "76vw",
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
        height: "60%",
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
        height: "40%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        paddingLeft: 0,
      },
      [theme.breakpoints.up("s")]: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        paddingLeft: 5,
      },
    },
  })
);

export const PostPreview = ({
  title,
  coverImage,
  date,
  slug,
  author,
}: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.parent} position="relative">
      {(() => {
        if (typeof title === "string" && typeof slug === "string") {
          return (
            <a
              aria-label={title}
              href={`/${slug}`}
              style={{ height: "100%", width: "100%", position: "absolute" }}
            ></a>
          );
        } else {
          return <Box height="100%" width="100%" position="absolute"></Box>;
        }
      })()}
      <Box
        className={classes.childLeft}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {(() => {
          if (
            typeof slug === "string" &&
            typeof title === "string" &&
            typeof coverImage === "string"
          ) {
            return <CoverImage slug={slug} title={title} src={coverImage} />;
          } else {
            return (
              <Skeleton
                animation={false}
                variant="rect"
                width="100%"
                height="100%"
              />
            );
          }
        })()}
      </Box>
      <Box className={classes.childRight}>
        <Box height="60%" display="flex" alignItems="center">
          <Box
            fontWeight="bold"
            fontSize={13}
            style={{
              width: "100%",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              wordBreak: "break-all",
              overflow: "hidden",
            }}
          >
            {(() => {
              if (typeof title === "string") {
                return title;
              } else {
                return (
                  <>
                    <Skeleton animation={false} variant="text" />
                    <Skeleton animation={false} variant="text" />
                  </>
                );
              }
            })()}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          color={grey[700]}
          fontSize={13}
          height="40%"
          width="100%"
        >
          <Box display="flex" alignItems="center">
            <AccessTime
              fontSize="inherit"
              style={{ marginTop: -1, marginRight: 2 }}
              color="inherit"
            />
            {(() => {
              if (typeof date === "string") {
                return <DateFormatter dateString={date} />;
              } else {
                return <Skeleton animation={false} width="100%" />;
              }
            })()}
          </Box>
          <Box
            style={{
              textAlign: "right",
              width: "100%",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              wordBreak: "break-all",
              overflow: "hidden",
            }}
          >
            {(() => {
              if (typeof author?.name === "string") {
                return (
                  <>
                    by{" "}
                    <span
                      itemType="https://schema.org/Person"
                      itemProp="author"
                      itemScope
                    >
                      {author.name}
                    </span>
                  </>
                );
              } else {
                return <Skeleton animation={false} width="100%" />;
              }
            })()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
