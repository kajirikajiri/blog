module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      staticDistDir: "./out",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
