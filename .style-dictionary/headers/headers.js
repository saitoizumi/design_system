const StyleDictionary = require("style-dictionary");
const { customHeaderForScss } = require("./scss-header");

StyleDictionary.registerFileHeader({
  name: "customHeaderForScss",
  fileHeader: customHeaderForScss,
});
