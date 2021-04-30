import { Box } from "@material-ui/core";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src }: Props) => {
  return (
    <Box height="100%" style={{}}>
      <img
        style={{ height: "100%", width: "100%", objectFit: "contain" }}
        src={src}
        alt={`Cover Image for ${title}`}
      />
    </Box>
  );
};

export default CoverImage;
