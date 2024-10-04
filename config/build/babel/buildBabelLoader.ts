import { BuildOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins = [];

  const prodPlugins = [removeDataTestIdBabelPlugin, { props: ["data-testid"] }];

  if (isProd) {
    plugins.push(prodPlugins);
  }

  return {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          ["@babel/preset-react", { runtime: isDev ? "automatic" : "classic" }],
          "@babel/preset-typescript",
        ],
        plugins,
      },
    },
  };
}
