import { useEffect, useRef } from "react";

type Props = {
  code: string;
};

export const MonacoEditor = ({ code }: Props) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const origin = "http://monaco-editor.pages.dev";
  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    const iframeWindow = iframe.contentWindow;
    if (!iframeWindow) return;
    iframeWindow.postMessage(code, origin);
  }, []);
  return (
    <iframe
      ref={ref}
      style={{ width: "100%" }}
      height="200"
      src={origin}
      title="MonacoEditor"
    ></iframe>
  );
};
