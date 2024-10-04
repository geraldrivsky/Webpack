import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack, { Configuration, DefinePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { BuildOptions } from "./types/types";

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __BUILD__: JSON.stringify(mode)
    }),
  ];

  const devPlugins = [
    new webpack.ProgressPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: true,
    }),
    new ReactRefreshPlugin(),
  ]

  const prodPlugins = [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
      }),
      analyzer && new BundleAnalyzerPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, 'locales'),
            to: path.resolve(paths.output, 'locales')
           },
        ],
      })
  ]


  return [
    ...isDev ? devPlugins : [],
    ...isProd ? prodPlugins : [],
    ...plugins,
  ].filter(Boolean)
}
