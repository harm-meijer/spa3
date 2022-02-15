const path = require('path');
const PROJECT_VIEW_PATH = `src/views/${
  process.env.PROJECT_VIEW_PATH || ''
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
          `${PROJECT_VIEW_PATH}/Shop/Root/`
        ),
        Home: path.resolve(
          __dirname,
          `${PROJECT_VIEW_PATH}/Home`
        ),
        Product: path.resolve(
          __dirname,
          `${PROJECT_VIEW_PATH}/Product`
        ),
        Products: path.resolve(
          __dirname,
          `${PROJECT_VIEW_PATH}/Products`
        ),
        About: path.resolve(
          __dirname,
          `${PROJECT_VIEW_PATH}/About`
        ),
      },
    },
  },
};
