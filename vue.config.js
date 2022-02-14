const path = require('path');
const PROJECT_PATH = `src/${
  process.env.PROJECT_PATH || ''
}`;

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
          `${PROJECT_PATH}/views/Shop/Root/`
        ),
        Home: path.resolve(
          __dirname,
          `${PROJECT_PATH}/views/Home`
        ),
        Product: path.resolve(
          __dirname,
          `${PROJECT_PATH}/views/Product`
        ),
        Products: path.resolve(
          __dirname,
          `${PROJECT_PATH}/views/Products`
        ),
        About: path.resolve(
          __dirname,
          `${PROJECT_PATH}/views/About`
        ),
        Components: path.resolve(
          __dirname,
          `${PROJECT_PATH}/components`
        ),
      },
    },
  },
};
