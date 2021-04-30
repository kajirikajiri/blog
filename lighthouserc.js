module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      staticDistDir: "./out",
      url: ["/"],
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
