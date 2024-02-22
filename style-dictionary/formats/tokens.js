const StyleDictionary = require("style-dictionary");
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
 *
 * TODO: &、-の後を大文字にする
 */
const toPascalCase = (text) => {
  const connectedText = text.replaceAll(/[ \-&]/g, "");
  return connectedText.charAt(0).toUpperCase() + connectedText.substring(1).toLowerCase();
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

  if (value.includes("borderRadius")) {
    const path = value.split(" ")[0].replace("{", "").replace("}", "").split(".");
    return `${
      Number(path.reduce((obj, key) => obj[key], primitiveTokens).value) *
      Number(
        value
          .split(" ")
          .map((v, i) => {
            if (i === 0) return;
            return v.replace("*", "");
          })
          .join("")
      )
    }`;
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
  formatter: ({ dictionary }) => {
    return customScssFormatter(dictionary);
  },
});

StyleDictionary.registerFormat({
  name: "custom/format/js",
  formatter: ({ dictionary }) => {
    return customJsFormatter(dictionary);
  },
});

StyleDictionary.registerParser({
  pattern: /\.json$/,
  parse: ({ contents, filePath }) => {
    if (filePath.includes("primitive")) return;
    return semanticTokens(JSON.parse(contents));
  },
});
