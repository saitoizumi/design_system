const StyleDictionary = require("style-dictionary");
require("./transforms");

StyleDictionary.registerTransformGroup({
  name: "custom/scss",
  transforms: [
    "attribute/cti",
    "custom/name/boxShadow",
    "custom/name/typography",
    "custom/name/fontWeight",
  ],
});

StyleDictionary.registerTransformGroup({
  name: "custom/js",
  transforms: [
    "attribute/cti",
    "custom/name/fontWeight",
  ],
});
