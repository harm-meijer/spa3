import {
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  provide,
  ref,
  shallowRef,
  watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LOCALE } from '../../../../constants';
import { LOCATION } from '../../../../constants';
import config from '../../../../../sunrise.config';
import { getValue, move } from '../../../../lib';
import i18n from '../../../../i18n';
import useMiniCart from 'hooks/useMinicart';
import MiniCart from 'presentation/Header/MiniCart/MiniCart.vue';

const caseCorrected = (value = '', key = 'countries') => {
  //get case insensitive locale from sunrise config
  const loc = value.toUpperCase();
  const [, fromConfig] =
    Object.keys(config[key])
      //all locale keys from config in [UPPERCASE,org]
      .map((key) => [key.toUpperCase(), key])
      .find(([key]) => key === loc) || []; //find the one from url
  return fromConfig; //return value from config (in correct case)
};
const checkParams =
  (route, router, locale, location) => () => {
    const {
      localeFromLocalStorage,
      localeFromUrl,
      locationFromLocalStorage,
      locationFromUrl,
    } = getParams(route);
    const params = route.params;
    let newParams = params;
    if (!locationFromUrl) {
      const country =
        locationFromLocalStorage ||
        Object.keys(config.countries)[0];
      newParams = {
        ...newParams,
        country,
      };
    }
    if (!localeFromUrl) {
      const locale =
        localeFromLocalStorage ||
        Object.keys(config.languages)[0];
      newParams = {
        ...newParams,
        locale,
      };
    }
    return Promise.resolve()
      .then(() => {
        if (params !== newParams) {
          return move(router, route, newParams, 'replace');
        }
      })
      .then(() => {
        const { localeFromUrl, locationFromUrl } =
          getParams(route);
        locale.value = localeFromUrl;
        location.value = locationFromUrl;
        localStorage.setItem(LOCATION, locationFromUrl);
        localStorage.setItem(LOCALE, localeFromUrl);
      });
  };
const getParams = (route) => {
  const localeFromLocalStorage = caseCorrected(
    localStorage.getItem(LOCALE) || undefined,
    'languages'
  );
  const locationFromLocalStorage = caseCorrected(
    localStorage.getItem(LOCATION) || undefined
  );
  const localeFromUrl = caseCorrected(
    route.params.locale,
    'languages'
  );
  const locationFromUrl = caseCorrected(
    route.params.country
  );
  return {
    localeFromLocalStorage,
    localeFromUrl,
    locationFromLocalStorage,
    locationFromUrl,
  };
};
const useInitRouteParams = () => {
  const locale = ref();
  const location = ref();
  const route = useRoute();
  const router = useRouter();
  watch(
    () => [route.params.country, route.params.locale],
    checkParams(route, router, locale, location)
  );
  onBeforeMount(
    checkParams(route, router, locale, location)
  );
  const setLocale = (locale) =>
    move(
      router,
      route,
      {
        ...route.params,
        locale: caseCorrected(locale, 'languages'),
      },
      'push'
    );
  const setLocation = (location) =>
    move(
      router,
      route,
      {
        ...route.params,
        country: caseCorrected(location),
      },
      'push'
    );
  return {
    locale,
    location,
    setLocale,
    setLocation,
  };
};
export default {
  components: {
    MiniCart,
  },
  setup() {
    const { locale, location, setLocale, setLocation } =
      useInitRouteParams();
    const { close, isOpen } = useMiniCart();
    const keyUpListener = shallowRef((e) => {
      if (e.key === 'Escape') {
        close();
      }
    });
    provide(LOCALE, { locale, setLocale });
    provide(LOCATION, { location, setLocation });
    const paramsSet = computed(
      () => getValue(locale) && getValue(location)
    );
    watch(paramsSet, (set) => {
      if (set) {
        i18n.global.locale = locale;
      }
    });
    onMounted(() => {
      document.body.addEventListener(
        'keyup',
        keyUpListener.value
      );
    });
    onUnmounted(() => {
      document.body.removeEventListener(
        'keyup',
        keyUpListener.value
      );
    });
    return { paramsSet, isOpen, close };
  },
};
