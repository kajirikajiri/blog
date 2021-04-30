import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Author from "../types/author";
import { Box } from "@material-ui/core";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <Box height={310} position="relative">
      <a
        aria-label={title}
        href={`/posts/${slug}`}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      ></a>
      <Box height="62%">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </Box>
      <Box height="38%">
        <div>
          {title}
          <DateFormatter dateString={date} />
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </Box>
    </Box>
  );
};

export default HeroPost;
