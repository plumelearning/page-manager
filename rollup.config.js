import pkg from "./package.json" with { type: "json" };

const name = "PageManager";

const banner = `/*!
* ${pkg.name} v${pkg.version}
* Copyright 2018, 2019, 2020 Strategic Technology Solutions DBA Plum eLearning
* @license Apache-2.0
*/`;

const outputDir = "dist";

export default [
  {
    input: "src/index.js",
    output: [
      {
        banner,
        name,
        file: `${outputDir}/bundle.esm.js`,
        format: "esm",
      },
      {
        banner,
        name,
        file: `${outputDir}/bundle.common.js`,
        format: "cjs",
        exports: "named",
      },
    ],
    strictDeprecations: true,
  },
];
