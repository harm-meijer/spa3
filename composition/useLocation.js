import { onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sunriseConfig from '../sunrise.config';
import { caseCorrected, moveLocationLocale } from './lib';

export const LOCATION = 'LOCATION';
const setStorage = (value) =>
  localStorage.setItem(LOCATION, value);
const getFirstLocation = () =>
  Object.keys(sunriseConfig.countries)[0];
export default () => {
  //on mount and watch route set location
  const location = ref();
  const route = useRoute();
  const router = useRouter();
  const locationFromUrl = caseCorrected(
    route.params.country
  );
  const move = (location, fn = 'replace') =>
    moveLocationLocale(
      router,
      route,
      'country',
      location,
      fn
    );

  onBeforeMount(() => {
    const locationFromLocalStorage = caseCorrected(
      localStorage.getItem(LOCATION) || undefined
    );
    location.value =
      locationFromUrl || locationFromLocalStorage;
    if (!location.value) {
      move(getFirstLocation());
      return;
    }
    if (!locationFromUrl) {
      move(location.value);
      return;
    }
    setStorage(location.value);
  });
  watch(
    () => route.params.country,
    (newValue) => {
      location.value = caseCorrected(newValue);
      setStorage(location.value);
    }
  );
  const setLocation = (newLocation) =>
    move(newLocation, 'push');

  return { location, setLocation };
};
