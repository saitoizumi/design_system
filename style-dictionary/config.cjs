const StyleDictionary = require("style-dictionary");
const { customHeader } = require("./headers/scss-header.js");
const { transformBoxShadow } = require("./transforms/box-shadow.js");
const { transformTypography } = require("./transforms/typography.js");
const { transformFontWeight } = require("./transforms/font-weight.js");

StyleDictionary.registerTransform({
  name: "time/seconds",
  type: "value",
  matcher: (token) => {
    return (
      token.attributes.category === "boxShadow" ||
      token.attributes.category === "typograpy" ||
      token.attributes.category === "fontWeight"
    );
  },
  transformer: (token) => {
    if (token.type === "boxShadow") return transformBoxShadow(token);
    if (token.type === "typography") return transformTypography(token);
    if (token.type === "fontWeights") return transformFontWeight(token.value);
  },
});

StyleDictionary.registerFileHeader({
  name: "customHeader",
  fileHeader: customHeader,
});

module.exports = {
  source: ["style-dictionary/tokens/converted_tokens.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "style-dictionary/dist/",
      files: [
        {
          destination: "design-tokens.scss",
          format: "scss/variables",
          options: {
            fileHeader: "customHeader",
          },
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "style-dictionary/dist/",
      files: [
        {
          destination: "design-tokens.js",
          format: "javascript/es6",
        },
      ],
    },
  },
};
