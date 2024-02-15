const StyleDictionary = require("style-dictionary");

StyleDictionary.registerTransform({
  name: "time/seconds",
  type: "value",
  matcher: function (token) {
    return token.attributes.category === "boxShadow" || token.attributes.category === "typograpy";
  },
  transformer: function (token) {
    if (token.type === "boxShadow") {
      if (!Object.values(token.value).toString().includes("object")) return "none";
      return Object.values(token.value)
        .map((v) => `${v.x}px ${v.y}px ${v.blur}px ${v.spread}px ${v.color}`)
        .join(", ");
    }
    console.log(token.value);
    if (token.type === "typograpy") {
      // TODO: 確認
      return undefined;
    }
  },
});

module.exports = {
  source: [".style-dictionary/tokens/converted_tokens.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: ".style-dictionary/dist/",
      files: [
        {
          destination: "design-tokens.scss",
          format: "scss/variables",
        },
      ],
      options: {
        showFileHeader: false,
      },
    },
    js: {
      transformGroup: "js",
      buildPath: ".style-dictionary/dist/",
      files: [
        {
          destination: "design-tokens.js",
          format: "javascript/es6",
        },
      ],
    },
  },
};
