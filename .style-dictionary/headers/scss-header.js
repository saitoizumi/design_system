const customHeaderForScss = (defaultMessage) => {
  return [
    ...defaultMessage,
    ,
    "-------------------",
    `$typography`,
    "-------------------",
    `$typography: (font-size: 32px, line-height: 125%, font-weight: 600);`,
    `font-size: map-get($typograpy, 'font-size');  // 32px`,
    `line-height: map-get($typograpy, 'line-height');  // 125%`,
    `font-weight: map-get($typograpy, 'font-weight');  // 600`,
  ];
};

module.exports = { customHeaderForScss };
