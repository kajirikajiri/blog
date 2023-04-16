import { useEffect, useRef } from "react";

type Props = {
  code: string;
};

export const MonacoEditor = ({ code }: Props) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const origin = "https://monaco-editor.pages.dev";
  useEffect(() => {
    (async () => {
      const messageListener = new Promise<{ success: boolean }>((resolve) => {
        setTimeout(() => {
          window.removeEventListener("message", callback);
          resolve({
            success: false,
          });
        }, 1000);
        const callback = (
          event: MessageEvent<Partial<{ success: boolean }>>
        ) => {
          if (event.origin !== origin) return;
          if (!event.data?.success) return;
          window.removeEventListener("message", callback);
          resolve({
            success: true,
          });
        };
        window.addEventListener("message", callback);
      });
      for await (const _ of Array.from({ length: 5 })) {
        const iframeWindow = ref.current?.contentWindow;
        if (!iframeWindow) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }

        const result = await Promise.all([
          messageListener,
          iframeWindow.postMessage(code, origin),
        ])
          .then((value) => {
            if (value[0].success) {
              return true;
            }
          })
          .catch((e) => {
            console.error(e);
          });
        console.log(result);
        if (result) {
          break;
        }
      }
    })();
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
