import useLocation from './useLocation';
import config from '../sunrise.config';
import { ref, watch } from 'vue';
const currencyFromConfig = (location) =>
  config.formats.number[location]?.currency?.currency;
export default () => {
  const { location } = useLocation();
  const currency = ref(currencyFromConfig(location.value));
  watch(location, (location) => {
    currency.value = currencyFromConfig(location);
  });
  return currency;
};
