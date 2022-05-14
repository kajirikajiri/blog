/** @jsxImportSource @emotion/react */
import fetch from "node-fetch";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import { marked } from "marked";
import hljs from "highlight.js";
import { cssString } from "./cssString";

type Props = {
  scrawls: Scrawl[];
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

type Scrawl = {
  id: string;
  title: string;
  body: string;
};

type GetStaticPropsResult = Promise<{
  props: Props;
}>;

type Res = Promise<{
  data: {
    rateLimit: {
      limit: number;
      cost: number;
      remaining: number;
      resetAt: string;
    };
    repository: {
      discussions: {
        edges: {
          cursor: string;
          node: {
            id: string;
            title: string;
            body: string;
          };
        }[];
      };
    };
  };
}>;

const endpoint = "https://api.github.com/graphql";
const commonFetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${process.env.TOKEN_FOR_GITHUB_USED_BY_GITHUB_DISCUSSIONS}`,
  },
};

const getBeginningOfPagination = async (): Res =>
  (
    await fetch(endpoint, {
      ...commonFetchOptions,
      body: JSON.stringify(firstQuery),
    })
  ).json();

const getNextPagination = async (after: string): Res =>
  (
    await fetch(endpoint, {
      ...commonFetchOptions,
      body: JSON.stringify(paginationQuery(after)),
    })
  ).json();

const getScrawls = async (cursor: string) =>
  cursor === ""
    ? await getBeginningOfPagination()
    : await getNextPagination(cursor);

const getLastOneScrawl = async (): Res =>
  (
    await fetch(endpoint, {
      ...commonFetchOptions,
      body: JSON.stringify(lastOneScrawlQuery),
    })
  ).json();

const getLastScrawlCursor = async () =>
  (await getLastOneScrawl()).data.repository.discussions.edges[0].cursor;

const getAllScrawls = async () => {
  const lastScrawlCursor = await getLastScrawlCursor();
  const scrawls: { id: string; body: string; title: string }[] = [];
  let loopCount = 0;
  let cursor = "";
  const InfiniteLoop = true;
  while (InfiniteLoop) {
    if (loopCount > 0 && cursor === "") throw Error("cursor is empty");

    const {
      data: {
        repository: {
          discussions: { edges },
        },
      },
    } = await getScrawls(cursor);
    scrawls.push(...edges.map(({ node }) => node));
    cursor = edges[edges.length - 1].cursor;
    const hasNextPages = lastScrawlCursor !== cursor;
    if (!hasNextPages) break;

    loopCount += 1;
  }
  return scrawls;
};

export const getStaticProps = async (): GetStaticPropsResult => ({
  props: {
    scrawls: (await getAllScrawls()).map((s) => ({
      id: s.id,
      title: s.title,
      body: marked.setOptions({
        highlight: (c) => hljs.highlightAuto(c).value,
      })(s.body),
    })),
  },
});

const firstQuery = {
  query: `
  query {
    rateLimit { limit cost remaining resetAt }
    repository(owner: "kajirikajiri", name: "jamstack-tech-blog") {
      discussions(first: 1, categoryId: "DIC_kwDOFZ9G0M4CO2M1", orderBy: {field: CREATED_AT, direction: DESC}) {
        edges {
          cursor
          node {
            id title body
          }
        }
      }
    }
  }`,
};
const lastOneScrawlQuery = {
  query: `
  query {
    rateLimit { limit cost remaining resetAt }
    repository(owner: "kajirikajiri", name: "jamstack-tech-blog") {
      discussions(last: 1, categoryId: "DIC_kwDOFZ9G0M4CO2M1", orderBy: {field: CREATED_AT, direction: DESC}) {
        edges {
          cursor
          node {
            id title body
          }
        }
      }
    }
  }`,
};
const paginationQuery = (after: string) => ({
  query: `
    query PaginationQuery($after: String!) {
      rateLimit { limit cost remaining resetAt }
      repository(owner: "kajirikajiri", name: "jamstack-tech-blog") {
        discussions(first: 1, after: $after categoryId: "DIC_kwDOFZ9G0M4CO2M1", orderBy: {field: CREATED_AT, direction: DESC}) {
          edges {
            cursor
            node {
              id title body
            }
          }
        }
      }
    }`,
  variables: {
    after,
  },
});
