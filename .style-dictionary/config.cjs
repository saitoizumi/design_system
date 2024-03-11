const StyleDictionary = require("style-dictionary");
require("./transforms/transform-groups.js");
require("./parsers/parsers.js");
require("./headers/headers.js");

StyleDictionary.extend({
  source: [".style-dictionary/tokens/converted-semantic-tokens.json"],
  platforms: {
    scss: {
      transformGroup: "custom/scss",
      buildPath: "./src/stylesheets/",
      files: [
        {
          destination: "design-tokens.scss",
          format: "scss/variables",
          options: {
            fileHeader: "customHeaderForScss",
          },
        },
      ],
    },
    js: {
      transformGroup: "custom/js",
      buildPath: "./src/stylesheets/",
      files: [
        {
          destination: "design-tokens.js",
          format: "javascript/es6",
        },
      ],
    },
  },
}).buildAllPlatforms();
