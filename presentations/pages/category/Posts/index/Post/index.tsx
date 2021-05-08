import { CoverImage } from "@/components/CoverImage";
import { DateFormatter } from "@/components/DateFormatter";
import Author from "@/types/author";
import { Box } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { AccessTime } from "@material-ui/icons";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};
export const Post = ({
  title,
  coverImage,
  date,
  // excerpt,
  author,
  slug,
}: Props) => {
  return (
    <>
      <Box height={360} position="relative">
        <a
          aria-label={title}
          href={`/${slug}`}
          style={{ height: "100%", width: "100%", position: "absolute" }}
        ></a>
        <Box height="50%" paddingTop={1.5} paddingX={1.5}>
          <CoverImage title={title} src={coverImage} slug={slug} />
        </Box>
        <Box height="50%" paddingBottom={1.5} paddingX={1.5}>
          <Box display="flex" alignItems="center" height="80%">
            <Box
              fontWeight="bold"
              fontSize={18}
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
            justifyContent="space-between"
            fontSize={13}
            height="20%"
          >
            <Box alignItems="center" color={grey[700]} display="flex">
              <AccessTime
                fontSize="inherit"
                style={{ marginBottom: 1, marginRight: 2 }}
                color="inherit"
              />
              <DateFormatter dateString={date} />
            </Box>
            <Box display="flex">
              by{" "}
              <Box height="18.4px" width="18.4px" marginX={1}>
                <CoverImage src={author?.picture} title={author?.name} />
              </Box>
              <span
                itemType="https://schema.org/Person"
                itemProp="author"
                itemScope
              >
                {author.name}
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
