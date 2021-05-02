const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      {
        source: "/category",
        destination: "/",
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizeFonts: true,
  },
  // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },
});
