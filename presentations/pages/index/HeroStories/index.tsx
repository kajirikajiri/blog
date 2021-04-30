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

export const HeroPost = ({
  title,
  coverImage,
  date,
  // excerpt,
  // author,
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
        <CoverImage
          title={title}
          src={coverImage}
          slug={slug}
          height={202}
          width={398}
        />
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
        {/* <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div> */}
      </Box>
    </Box>
  );
};
