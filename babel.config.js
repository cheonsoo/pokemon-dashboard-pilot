"use strict";

module.exports = (api) => {
  api.cache(true);

  const presets = [["@babel/env", { targets: { ie: 11 } }]];

  const plugins = ["@babel/transform-runtime"];

  return { presets, plugins };
};
