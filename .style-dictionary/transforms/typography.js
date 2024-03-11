const { transformFontWeight } = require("./font-weight.js");

const transformTypography = (token) => {
  const fontSize = token.value.fontSize;
  const lineHeight = token.value.lineHeight ? token.value.lineHeight : "normal";
  const fontWeight = transformFontWeight(token.value.fontWeight);
  return `(font-size: ${fontSize}px, line-height: ${lineHeight}, font-weight: ${fontWeight})`;
};

module.exports = { transformTypography };
