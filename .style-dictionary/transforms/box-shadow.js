const transformBoxShadow = (token) => {
  if (!Object.values(token.value).toString().includes("object")) return "none";
  return Object.values(token.value)
    .map((v) => `${v.x}px ${v.y}px ${v.blur}px ${v.spread}px ${v.color}`)
    .join(", ");
};

module.exports = { transformBoxShadow };
