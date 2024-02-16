const { transformFontWeight } = require("./font-weight.js");

const transformTypography = (token) => {
  fontSize = `${token.value.fontSize}px`;
  lineHeight = `${token.value.lineHeight ? token.value.lineHeight : "normal"}`;
  fontWeight = transformFontWeight(token.value.fontWeight);
  return `(${fontSize}, ${lineHeight}, ${fontWeight})`;
};

module.exports = { transformTypography };
