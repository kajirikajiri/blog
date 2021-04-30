import { Box } from "@material-ui/core";
import Link from "next/link";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <img
      style={{ height: "100%", width: "100%" }}
      src={src}
      alt={`Cover Image for ${title}`}
    />
  );
  return (
    <Box height="100%" style={{ objectFit: "contain" }}>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </Box>
  );
};

export default CoverImage;
