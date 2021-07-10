import fetch from "node-fetch";
import { Box } from "@material-ui/core";
import Link from "next/link";

type Props = {
  filenames: string[];
};

export const Mindmap = ({ filenames }: Props) => {
  return (
    <Box display="flex" flexDirection="column">
      <meta name="robots" content="noindex" />
      このページはテスト中です
      {filenames.map((n) => (
        <Box border="1px black solid" margin={1}>
          <Link href={`/mindmap/${encodeURIComponent(n)}`}>{n}</Link>
        </Box>
      ))}
    </Box>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    "https://api.github.com/repos/kajirikajiri/mindmap/contents",
    {
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  );
  const files = await response.json();
  const filenames = files.map((f: any) => f.name.slice(0, -3));
  return {
    props: { filenames },
  };
};
