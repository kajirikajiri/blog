import { useEffect } from "react";
import { v4 } from "uuid";

type Props = {
  code: string;
};

export const MonacoEditor = ({ code }: Props) => {
  const id = `iframe-${v4()}`;
  const origin = "https://monaco-editor.pages.dev/";
  useEffect(() => {
    if (!document) return;
    const iframe = document.querySelector<HTMLIFrameElement>(`#${id}`);
    console.log(iframe);
    if (!iframe) return;
    const iframeWindow = iframe.contentWindow;
    if (!iframeWindow) return;
    iframeWindow.postMessage(code, origin);
  }, []);
  return (
    <iframe id={id} height="200" src={origin} title="MonacoEditor"></iframe>
  );
};
