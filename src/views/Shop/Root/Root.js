import { provide } from 'vue';
import useLocale, {
  LOCALE,
} from '../../../../composition/useLocale';
import useLocation, {
  LOCATION,
} from '../../../../composition/useLocation';

export default {
  setup() {
    //@todo: set location things in context
    const location = useLocation();
    const locale = useLocale();
    provide(LOCALE, locale);
    provide(LOCATION, location);
    return {};
  },
};
