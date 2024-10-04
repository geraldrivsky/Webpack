import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypescript from "react-refresh-typescript";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import { buildBabelLoader } from './babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const svgLoader = {
    test: /\.svg$/,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      }
    ]
  }

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const tsLoader = {
    test: /\.(ts|tsx)$/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      getCustomTransformers: () => ({
        before: [isDev && ReactRefreshTypescript()].filter(Boolean)
      })
    },
    exclude: /node_modules/,
  };
  const cssLoaderWithModules = {
    loader: 'css-loader',
     options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
      },
     }
  }
  const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };
  const babelLoader = buildBabelLoader(options);

  return [
    svgLoader,
    assetLoader,
    tsLoader,
    sassLoader,
    babelLoader
  ]
}
