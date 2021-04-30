module.exports = {
  ci: {
    collect: {
      staticDistDir: "./out",
      url: ["/"],
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
