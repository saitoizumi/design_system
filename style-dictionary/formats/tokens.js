const StyleDictionary = require("style-dictionary");
const { fileHeader } = StyleDictionary.formatHelpers;
const fs = require("fs");
const primitiveTokens = JSON.parse(fs.readFileSync("style-dictionary/tokens/tokens.json"))[
  "primitive"
];

/**
 * ケバブケースに変換する
 */
const toKebabCase = (propertyName) => {
  const upperToHyphenLower = (match, offset) => {
    return (offset > 0 ? "-" : "") + match.toLowerCase();
  };
  return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
};

/**
 * パスカルケースに変換する
 */
const toPascalCase = (text) => {
  const insertHyphenBeforeUpperCase = text.replace(/[A-Z]/g, (match) => '-' + match);
  const splitedText = insertHyphenBeforeUpperCase.split(/[ \-&]/g);
  return splitedText.map((v) => v.charAt(0).toUpperCase() + v.substring(1).toLowerCase()).join("");
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

/**
 * tokenをprimitive値に変換する
 * ex. { "value": "{color.umi.700}" } => { "color": "#626262" }
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
    return `${Number(baseValue) * multipliedByValue}`;
  }
  const path = value.replace("{", "").replace("}", "").split(".");
  return path.reduce((obj, key) => obj[key], primitiveTokens).value;
};

/**
 * scss formatter
 * ex. $color-primary: #000000;
 */
const customScssFormatter = (dictionary) => {
  return dictionary.allTokens
    .map((token) => {
      const key = toKebabCase(token.path.map((path) => path.replaceAll("&", "-")).join("-"));
      const value = token.value;
      return `$${key}: ${value};`;
    })
    .join("\n");
};

/**
 * js formatter
 * ex. export const ColorPrimary = "#000000";
 */
const customJsFormatter = (dictionary) => {
  return dictionary.allTokens
    .map((token) => {
      const key = token.path.map((path) => toPascalCase(path)).join("");
      const value = JSON.stringify(token.value).toString();
      return `export const ${key} = ${value};`;
    })
    .join("\n");
};

StyleDictionary.registerFormat({
  name: "custom/format/scss",
  formatter: ({ dictionary, file }) => {
    return fileHeader({ file }) + customScssFormatter(dictionary);
  },
});

StyleDictionary.registerFormat({
  name: "custom/format/js",
  formatter: ({ dictionary, file }) => {
    return fileHeader({ file }) + customJsFormatter(dictionary);
  },
});

StyleDictionary.registerParser({
  pattern: /\.json$/,
  parse: ({ contents }) => {
    return semanticTokens(JSON.parse(contents));
  },
});
