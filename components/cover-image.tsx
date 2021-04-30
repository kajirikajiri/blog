import { Box } from "@material-ui/core";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  height: number;
  width: number;
  slug?: string;
};

const CoverImage = ({ title, src, width, height }: Props) => {
  return (
    <Box height="100%" display="flex" alignItems="center">
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        width={width}
        height={height}
      />
      {/* <img
        style={{ height: "100%", width: "100%", objectFit: "contain" }}
        src={src}
        alt={`Cover Image for ${title}`}
      /> */}
    </Box>
  );
};

export default CoverImage;
