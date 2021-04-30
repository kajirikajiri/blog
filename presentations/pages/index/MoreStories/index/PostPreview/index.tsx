import DateFormatter from "@/components/date-formatter";
import CoverImage from "@/components/cover-image";
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

export const PostPreview = ({
  title,
  coverImage,
  date,
  // excerpt,
  // author,
  slug,
}: Props) => {
  return (
    <Box width="100%" height="31.5%" display="flex" position="relative">
      <a
        aria-label={title}
        href={`/${slug}`}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      ></a>
      <Box height="100%" width="50%">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </Box>
      <Box
        width="50%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
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
