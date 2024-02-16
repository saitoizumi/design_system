const transformFontWeight = (fontWeight) => {
  switch (fontWeight) {
    case "W3":
      return "300";
    case "W6":
      return "600";
    default:
      return "400";
  }
};

module.exports = { transformFontWeight };
