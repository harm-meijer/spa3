import { inject } from 'vue';
import { LOCALE } from '../../../composition/useLocale';
import { LOCATION } from '../../../composition/useLocation';

export default {
  setup() {
    const locale = inject(LOCALE);
    const location = inject(LOCATION);
    return { ...locale, ...location };
  },
};
