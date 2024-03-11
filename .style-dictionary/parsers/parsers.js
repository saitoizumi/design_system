const StyleDictionary = require("style-dictionary");
const fs = require("fs");
const primitiveTokens = JSON.parse(fs.readFileSync(".style-dictionary/tokens/tokens.json"))[
  "primitive"
];

/**
 * tokenをprimitive値に変換する
 * ex. "{color.umi.700}" => "#626262"
 */
const convertPrimitiveValue = (value) => {
  if (!value.includes(".")) return value;

  if (value.includes("*")) {
    const path = value.split(" ")[0].replace("{", "").replace("}", "").split(".");
    const baseValue = Number(path.reduce((obj, key) => obj[key], primitiveTokens).value);
    const multipliedByValue = value
      .split(" ")
      .map((v, i) => {
        if (i === 0) return;
        return v.replace("*", "");
      })
      .join("");
    return `${baseValue * multipliedByValue}`;
  }
  const path = value.replace("{", "").replace("}", "").split(".");
  return path.reduce((obj, key) => obj[key], primitiveTokens).value;
};

/**
 * semanticのスタイルオブジェクトを返す
 */
const semanticTokens = (obj) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if ("object" === typeof value) {
      return {
        ...acc,
        ...{
          [key]: semanticTokens(value),
        },
      };
    }
    acc[key] = typeof value === "string" ? convertPrimitiveValue(value) : value;
    return acc;
  }, {});

StyleDictionary.registerParser({
  pattern: /\.json$/,
  parse: ({ contents }) => {
    return semanticTokens(JSON.parse(contents));
  },
});
