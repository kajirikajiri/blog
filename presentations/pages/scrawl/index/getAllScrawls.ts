import fetch from "node-fetch";

export type Scrawl = {
  id: string;
  title: string;
  body: string;
};

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

const getScrawlEdges = async (cursor: string) =>
  (await getScrawls(cursor)).data.repository.discussions.edges;

export type GetScrawlsAndCursor = (
  cursor: string
) => Promise<{
  scrawls: Scrawl[];
  cursor: string;
}>;
export const getScrawlsAndCursor: GetScrawlsAndCursor = async (cursor) => {
  const edges = await getScrawlEdges(cursor);
  return {
    scrawls: edges.map(({ node }) => node),
    cursor: edges[edges.length - 1].cursor,
  };
};

const getLastOneScrawl = async () =>
  await fetch(endpoint, {
    ...commonFetchOptions,
    body: JSON.stringify(lastOneScrawlQuery),
  });

type GetLastScrawlCursor = () => Promise<string>;
export const getLastScrawlCursor: GetLastScrawlCursor = async () => {
  const r = await getLastOneScrawl();
  if (!r.ok) {
    console.error("response.ok:", r.ok);
    console.error("response.status:", r.status);
    console.error("response.statusText:", r.statusText);
    console.error("response.body:", r.body);
    console.error("response.url:", r.url);
    throw Error(r.statusText);
  }
  return (await r.json()).data.repository.discussions.edges[0].cursor;
};

type LoopCount = number;
type Cursor = string;
type GetAllScrawls = (
  lastCursor: string,
  getScrawlsAndCursor: GetScrawlsAndCursor
) => Promise<Scrawl[]>;
export const getAllScrawls: GetAllScrawls = async (
  lastCursor,
  getScrawlsAndCursor
) => {
  const recursion = async (
    loopCount: LoopCount = 0,
    cursor: Cursor = "",
    scrawls: Scrawl[] = []
  ): Promise<Scrawl[]> => {
    const {
      scrawls: newScrawls,
      cursor: newCursor,
    } = await getScrawlsAndCursor(cursor);
    const result = [...scrawls, ...newScrawls];
    const canRecursive = lastCursor !== newCursor;
    if (!canRecursive) return result;
    return await recursion(loopCount + 1, newCursor, result);
  };
  return await recursion();
};

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
