import { createI18n } from 'vue-i18n';
import config from '../sunrise.config';

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  numberFormats: config.formats.number,
  dateTimeFormats: config.formats.datetime,
});

export default i18n;
