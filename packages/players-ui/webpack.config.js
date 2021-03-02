const webpack = require("webpack");
const { GenerateSW } = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = () => {
  process.env.ENV = process.env.ENV || "local";
  const isProduction = process.env.NODE_ENV === "production";
  const envLocation = `./src/env/env.${process.env.ENV}.js`;
  const env = require(envLocation);
  const envPath = path.join(__dirname, envLocation);

  console.log(
    `Preparing a ${isProduction ? "production" : "development"} build`
  );
  console.log(`Building for environment (${process.env.ENV})`);
  console.log(`Environment variables can be found under (${envPath})`);
  return {
    entry: "./src/index.js",
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? undefined : "eval-cheap-source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules\/(?!@ibookweplay\/lib)/,
          options: {
            compiler: "ttypescript",
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader?url=false",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, "./src"), "node_modules"],
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
      alias: {
        ENV: envPath,
      },
    },
    output: {
      chunkFilename: "[name].[chunkhash].js",
      filename: "[name].[fullhash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CopyPlugin({
        patterns: [{ from: "**", to: ".", context: "./public" }],
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
          ],
        },
      }),
      new GenerateSW({
        swDest: "service-worker.js",
        navigateFallback: "/index.html",
        ignoreURLParametersMatching: [/.*/],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        additionalManifestEntries: [
          { url: "/index.html", revision: Date.now().toString() },
        ],
        runtimeCaching: [
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxAgeSeconds: 7 * 24 * 60 * 60,
                maxEntries: 100,
              },
            },
          },
          { urlPattern: /.*\.(?:js)/, handler: "NetworkFirst" },
          {
            urlPattern: new RegExp(
              `${env.API_HOST}${env.API_ROOT}/establishments.*$`
            ),
            handler: "NetworkFirst",
          },
          {
            urlPattern: new RegExp(`https://eu1.locationiq.com/v1.*`),
            handler: "CacheFirst",
            options: {
              cacheName: "locationiq",
              expiration: {
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
            },
          },
        ],
      }),
      // Ignore all the default webpack locales.
      // New locales must be imported manually
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      new CompressionPlugin(),
    ],
    devServer: {
      contentBase: "./public",
      hot: true,
      historyApiFallback: true,
      port: 5000,
    },
  };
};
