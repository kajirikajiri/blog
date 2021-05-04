import remark from "remark";
import html from "remark-html";
import toc from "remark-toc";
import footnotes from "remark-footnotes";
import breaks from "remark-breaks";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
    .use(toc)
    .use(footnotes)
    .use(breaks)
    .process(markdown);
  return result.toString();
}
