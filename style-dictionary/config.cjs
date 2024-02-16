const StyleDictionary = require("style-dictionary");
const { customHeader } = require("./headers/scss-header.js");
const { transformBoxShadow } = require("./transforms/box-shadow.js");
const { transformTypography } = require("./transforms/typography.js");
const { transformFontWeight } = require("./transforms/font-weight.js");

const isBoxShadow = (category) => category === "boxShadow";
const isTypography = (category) => category === "typograpy";
const isFontWeght = (category) => category === "fontWeight";

StyleDictionary.registerTransform({
  name: "time/seconds",
  type: "value",
  matcher: (token) => {
    return (
      isBoxShadow(token.attributes.category) ||
      isTypography(token.attributes.category) ||
      isFontWeght(token.attributes.category)
    );
  },
  transformer: (token) => {
    if (isBoxShadow(token.attributes.category)) return transformBoxShadow(token);
    if (isTypography(token.attributes.category)) return transformTypography(token);
    if (isFontWeght(token.attributes.category)) return transformFontWeight(token.value);
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
