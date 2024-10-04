import path from "path";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths, BuildPlatform } from "./config/build/types/types";

interface EnvVariables {
  port?: number;
  mode?: BuildMode;
  analyzer?: boolean;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
  }

  return buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 3000,
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  })
}
