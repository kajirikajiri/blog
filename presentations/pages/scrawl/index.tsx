/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import { marked } from "marked";
import hljs from "highlight.js";
import { cssString } from "./cssString";
import {
  getAllScrawls,
  getLastScrawlCursor,
  getScrawlsAndCursor,
  Scrawl as ScrawlType,
} from "./index/getAllScrawls";

type Props = {
  scrawls: ScrawlType[];
};

export const Scrawl = (props: Props): JSX.Element => (
  <Box css={css(cssString)}>
    {
      <div className="markdown-body">
        {props.scrawls.map((s) => (
          <div style={{ margin: "200px 16px" }} key={s.id}>
            <h1>{s.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: s.body }} />
          </div>
        ))}
      </div>
    }
  </Box>
);

type GetStaticPropsResult = Promise<{
  props: Props;
}>;

export const getStaticProps = async (): GetStaticPropsResult => ({
  props: {
    scrawls: (
      await getAllScrawls(await getLastScrawlCursor(), getScrawlsAndCursor)
    ).map((s) => ({
      id: s.id,
      title: s.title,
      body: marked(s.body, {
        highlight: (c) => hljs.highlightAuto(c).value,
      }),
    })),
  },
});
