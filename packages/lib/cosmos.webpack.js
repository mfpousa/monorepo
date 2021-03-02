const rootWebpackConfig = require("./webpack.config");

module.exports = function (cosmosWebpackConfig) {
  return {
    ...cosmosWebpackConfig,
    ...rootWebpackConfig,
    performance: {
      hints: false,
    },
    mode: "development",
  };
};
