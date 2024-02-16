const customHeader = (defaultMessage) => {
  return [
    ...defaultMessage,
    ,
    "-------------------",
    `$typography`,
    "-------------------",
    `$typography: (32px, 125%, 600);`,
    `font-size: nth($typography, 1);  // 32px`,
    `line-height: nth($typography, 2);  // 125%`,
    `font-weight: nth($typography, 3);  // 600`,
  ];
};

module.exports = { customHeader };
