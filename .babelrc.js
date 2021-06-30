const plugins = () => {
  const defaultPlugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
        version: "7.0.0-beta.0",
      },
    ],
    [
      "module-resolver",
      {
        cwd: "babelrc",
        alias: {
          src: "./src",
          test: "./src/test/",
          app: "./src/app",
          infra: "./src/infra/",
          helpers: "./src/helpers/",
          config: "./src/infra/config/",
          domain: "./src/domain/",
          common: "./src/common/",
          interfaces: "./src/interfaces/",
        },
      },
    ],
  ];

  return defaultPlugins;
};

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "12.18.3",
        },
      },
    ],
  ],
  plugins: plugins(),
};
