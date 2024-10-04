import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const {
    mode,
    paths: { entry, output },
  } = options;
  const isDev = mode === "development";

  return {
    mode,
    entry,
    output: {
      path: output,
      filename: "[name].[contenthash:8].js",
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devServer: buildDevServer(options),
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
  };
}
