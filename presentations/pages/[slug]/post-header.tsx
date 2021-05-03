import { DateFormatter } from "@/components/DateFormatter";
import { CoverImage } from "@/components/CoverImage";
import { PostTitle } from "@/components/PostTitle";
import Author from "@/types/author";
import { AccessTime } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <Box display="flex">
        <Box>
          <Box color={grey[400]} component={"span"}>
            by{" "}
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
