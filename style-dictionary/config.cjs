const StyleDictionary = require("style-dictionary");
const { customHeader } = require("./headers/scss-header");
require("./transforms/transforms.js");
require("./transforms/transform-groups.js");
require("./formats/tokens.js");

StyleDictionary.registerFileHeader({
  name: "customHeader",
  fileHeader: customHeader,
});

const getStyleDictionaryConfig = () => {
  return {
    source: [`style-dictionary/tokens/converted_semantic_tokens.json`],
    platforms: {
      scss: {
        transformGroup: "custom/scss",
        buildPath: "style-dictionary/dist/",
        files: [
          {
            destination: `design-tokens-semantic.scss`,
            format: "custom/format/scss",
            options: {
              fileHeader: customHeader,
            },
          },
        ],
      },
      js: {
        transformGroup: "js",
        buildPath: "style-dictionary/dist/",
        files: [
          {
            destination: `design-tokens-semantic.js`,
            format: "custom/format/js",
          },
        ],
      },
    },
  };
};

StyleDictionary.extend(getStyleDictionaryConfig()).buildAllPlatforms();
