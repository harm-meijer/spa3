const path = require('path');
const PROJECT_VIEW_PATH =
  process.env.PROJECT_VIEW_PATH ||
  'src/presentation/fashion/';

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
        presentation: path.resolve(
          __dirname,
          PROJECT_VIEW_PATH
        ),
        container: path.resolve(__dirname, 'src/'),
        react: path.resolve(__dirname, 'composition/react'),
      },
    },
  },
};
