const { transformFontWeight } = require("./font-weight.js");

const transformTypography = (token) => {
  fontSize = `${token.value.fontSize}px`;
  lineHeight = `${token.value.lineHeight ? token.value.lineHeight : "normal"}`;
  fontWeight = transformFontWeight(token.value.fontWeight);
  return `(font-size: ${fontSize}, line-height: ${lineHeight}, font-weight: ${fontWeight})`;
};

module.exports = { transformTypography };
