import { Box } from "@material-ui/core";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src }: Props) => {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <img
        loading="lazy"
        width="100%"
        height="100%"
        src={src}
        style={{ objectFit: "contain" }}
        alt={`Cover Image for ${title}`}
      />
    </Box>
  );
};

export default CoverImage;
