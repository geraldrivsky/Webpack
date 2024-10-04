import { PluginItem } from "@babel/core";

export function removeDataTestIdBabelPlugin(): PluginItem {
  return {
    visitor: {
      JSXAttribute(path) {
        const { name } = path.node;
        if (name.name === "data-testid") {
          path.remove();
        }
      },
    },
  };
}
