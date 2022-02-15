const path = require('path');
const PROJECT_VIEW_PATH =
  process.env.PROJECT_VIEW_PATH || '';

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        Cart: path.resolve(
          __dirname,
          `src/views/Shop/Root/${PROJECT_VIEW_PATH}`
        ),
        Home: path.resolve(
          __dirname,
          `src/views/Home/${PROJECT_VIEW_PATH}`
        ),
        Product: path.resolve(
          __dirname,
          `src/views/Product/${PROJECT_VIEW_PATH}`
        ),
        Products: path.resolve(
          __dirname,
          `src/views/Products/${PROJECT_VIEW_PATH}`
        ),
        About: path.resolve(
          __dirname,
          `src/views/About/${PROJECT_VIEW_PATH}`
        ),
        react: path.resolve(__dirname, 'composition/react'),
      },
    },
  },
};
