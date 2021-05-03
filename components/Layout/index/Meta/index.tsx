import Head from "next/head";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";

export const Meta = () => {
  return (
    <Head>
      <title>かじりブログ</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}
      <meta
        name="description"
        content={`A statically generated blog using Next.js by かじり.`}
      />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      <link
        href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};
