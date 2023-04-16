import { useEffect, useRef } from "react";

type Props = {
  code: string;
};

export const MonacoEditor = ({ code }: Props) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const origin = "https://monaco-editor.pages.dev";
  useEffect(() => {
    console.log(code, origin);
    const iframe = ref.current;
    console.log(iframe);
    if (!iframe) return;
    const iframeWindow = iframe.contentWindow;
    console.log(iframeWindow);
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
