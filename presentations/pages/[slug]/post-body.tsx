import Box from "@mui/material/Box";
import styles from "./githubMarkdown.module.css";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <Box className={[styles["markdown-body"]].join(" ")}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Box>
  );
};

export default PostBody;
