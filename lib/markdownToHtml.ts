import unified from "unified";
import remarkParse from "remark-parse";
import html from "remark-html";
import toc from "remark-toc";
import footnotes from "remark-footnotes";
import breaks from "remark-breaks";
import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkSlug)
    .use(remarkAutolinkHeadings, {
      behavior: "append",
      content: {
        type: "element",
        tagName: "span",
        properties: {
          className: ["icon", "icon-link"],
          style: [`font-size:13px;padding-left:5px;padding-right:5px;`],
        },
        children: [
          {
            type: "text",
            value: "🔗",
          },
        ],
      },
    })
    .use(toc, { tight: true })
    .use(footnotes)
    .use(breaks)
    .use(html)
    .process(markdown);
  return result.toString();
}
