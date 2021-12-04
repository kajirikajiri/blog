import { DateFormatter } from "@/components/DateFormatter";
import { CoverImage } from "@/components/CoverImage";
import { PostTitle } from "@/components/PostTitle";
import Author from "@/types/author";
import { AccessTime, BookOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  readingTimeText: string;
};

const PostHeader = ({
  title,
  coverImage,
  date,
  author,
  readingTimeText,
}: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <Box display="flex">
        <Box display="flex">
          <Box color={grey[600]} component={"span"}>
            by{" "}
          </Box>
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
        <Box display="flex" alignItems="center" marginLeft={1}>
          <AccessTime
            fontSize="inherit"
            style={{ marginBottom: 1, marginRight: 2 }}
            color="inherit"
          />
          <DateFormatter dateString={date} />
        </Box>
        <Box marginLeft={2} display="flex" alignItems="center">
          <BookOutlined
            fontSize="inherit"
            style={{ marginBottom: 1, marginRight: 2 }}
            color="inherit"
          />
          {readingTimeText}
        </Box>
      </Box>
      <Box
        maxHeight={538}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={538}
        width="100%"
        marginY={2}
      >
        <CoverImage title={title} src={coverImage} />
      </Box>
    </>
  );
};

export default PostHeader;
