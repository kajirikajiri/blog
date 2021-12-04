import { Base64 } from "js-base64";
import fetch from "node-fetch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import JsMind from "jsmind";
import { v4 as uuidv4 } from "uuid";
import { filteringMindMapContents } from "../const";

type Props = {
  mindmap: { root: { data: any; children: any } } | undefined;
};

export const Filename = ({ mindmap }: Props) => {
  const revival = (children: any, resultChildren: any, i: number) => {
    if (Array.isArray(children.children) && children.children.length > 0) {
      resultChildren[i].children = [];
      resultChildren = resultChildren[i].children;
      children.children.forEach((children: any, i: number) => {
        resultChildren[i] = {};
        resultChildren[i].topic = children.data.text;
        resultChildren[i].id = uuidv4();
        resultChildren[i].children = [];
        revival(children, resultChildren, i);
      });
    }
  };
  const [maxWidth, setMaxWidth] = useState<"none" | "400px">("400px");
  useEffect(() => {
    if (!mindmap) {
      undefined;
    } else {
      const result: any = {};
      result.topic = mindmap.root.data.text;
      result.id = mindmap.root.data.id;
      result.children = [];
      if (Array.isArray(mindmap.root.children)) {
        mindmap.root.children.forEach((c, i) => {
          result.children[i] = {};
          result.children[i].topic = c.data.text;
          result.children[i].id = c.data.id;
          revival(c, result.children, i);
        });
      }
      const jsmind = new JsMind({
        container: "jsmind_container",
        editable: false,
        theme: "white",
        layout: {
          vspace: 50,
        },
      });
      const mind = {
        meta: {
          name: "kajiri",
          author: "kajiri",
          version: "0.2",
        },
        format: "node_tree",
        data: result,
      };
      jsmind.show(mind);
      document.querySelectorAll("jmnode").forEach((e: any) => {
        e.addEventListener("click", () => {
          e.style.maxWidth === "none"
            ? (e.style.maxWidth = "400px")
            : (e.style.maxWidth = "none");
        });
      });
    }
  }, []);
  return (
    <>
      <meta name="robots" content="noindex" />
      <Link href="/mindmap">mindmap一覧へ戻る</Link>
      <br></br>
      <br></br>
      <Button
        variant="outlined"
        onClick={() => {
          document.querySelectorAll("jmnode").forEach((e: any) => {
            if (maxWidth === "none") {
              setMaxWidth("400px");
              e.style.maxWidth = "400px";
            } else {
              setMaxWidth("none");
              e.style.maxWidth = "none";
            }
          });
        }}
      >
        おりたたみ
      </Button>
      <div id="jsmind_container" />
    </>
  );
};

type Params = {
  params: {
    filename: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const response = await fetch(
    `https://api.github.com/repos/kajirikajiri/mindmap/contents/${params.filename}.km`,
    {
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  );
  const file = await response.json();
  if (typeof file.content === "string" && file.content.length > 0) {
    const json = JSON.parse(Base64.decode(file.content));
    return {
      props: { mindmap: json },
    };
  } else {
    return {
      props: { mindmap: undefined },
    };
  }
};

export async function getStaticPaths() {
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
  return {
    fallback: false,
    paths: files.filter(filteringMindMapContents).map((f: any) => {
      return {
        params: {
          filename: f.name.slice(0, -3),
        },
      };
    }),
  };
}
