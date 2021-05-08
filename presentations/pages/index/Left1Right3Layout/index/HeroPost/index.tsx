import { DateFormatter } from "@/components/DateFormatter";
import { CoverImage } from "@/components/CoverImage";
import Author from "@/types/author";
import { Box } from "@material-ui/core";
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

export const HeroPost = ({
  title,
  coverImage,
  date,
  // excerpt,
  author,
  slug,
}: Props) => {
  return (
    <Box height="100%" position="relative">
      <a
        aria-label={title}
        href={`/${slug}`}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      ></a>
      <Box height="62%">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </Box>
      <Box height="38%">
        <Box display="flex" alignItems="center" height="70%">
          <Box
            fontWeight="bold"
            fontSize={18}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
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
          height="30%"
        >
          <Box alignItems="center" color={grey[700]} display="flex">
            <AccessTime
              fontSize="inherit"
              style={{ marginBottom: 1, marginRight: 2 }}
              color="inherit"
            />
            <DateFormatter dateString={date} />
          </Box>
          <Box display="flex" height="100%" alignItems="center">
            <Box display="flex" alignItems="center">
              by{" "}
              <Box height="18.4px" width="18.4px" marginX={1}>
                <CoverImage src={author.picture} title={author.name} />
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
    </Box>
  );
};
