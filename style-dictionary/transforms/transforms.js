const StyleDictionary = require("style-dictionary");
const { transformBoxShadow } = require("./box-shadow");
const { transformTypography } = require("./typography");
const { transformFontWeight } = require("./font-weight");

StyleDictionary.registerTransform({
  name: "custom/name/boxShadow",
  type: "value",
  matcher: (token) => token.attributes.category === "boxShadow",
  transformer: (token) => transformBoxShadow(token),
});

StyleDictionary.registerTransform({
  name: "custom/name/typography",
  type: "value",
  matcher: (token) => token.attributes.category === "typograpy",
  transformer: (token) => transformTypography(token),
});

StyleDictionary.registerTransform({
  name: "custom/name/fontWeight",
  type: "value",
  matcher: (token) => token.attributes.category === "fontWeight",
  transformer: (token) => transformFontWeight(token.value),
});
