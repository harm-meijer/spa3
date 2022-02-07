import { onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sunriseConfig from '../sunrise.config';
import { caseCorrected, moveLocationLocale } from './lib';

export const LOCALE = 'LOCALE';
const setStorage = (value) =>
  localStorage.setItem(LOCALE, value);
const getFirstLocale = () =>
  Object.keys(sunriseConfig.languages)[0];
export default () => {
  //on mount and watch route set locale
  const locale = ref();
  const route = useRoute();
  const router = useRouter();
  const localeFromUrl = caseCorrected(
    route.params.locale,
    'languages'
  );
  const move = (locale, fn = 'replace') =>
    moveLocationLocale(router, route, 'locale', locale, fn);
  onBeforeMount(() => {
    const localeFromLocalStorage = caseCorrected(
      localStorage.getItem(LOCALE) || undefined,
      'languages'
    );
    locale.value = localeFromUrl || localeFromLocalStorage;
    if (!locale.value) {
      move(getFirstLocale());
      return;
    }
    if (!localeFromUrl) {
      move(locale.value);
      return;
    }
    setStorage(locale.value);
  });
  watch(
    () => route.params.locale,
    (newValue) => {
      locale.value = caseCorrected(newValue, 'languages');
      setStorage(locale.value);
    }
  );
  const setLocale = (newLocale) => move(newLocale, 'push');

  return { locale, setLocale };
};
