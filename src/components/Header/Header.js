import useLocale from '../../../composition/useLocale';
import useLocation from '../../../composition/useLocation';

export default {
  setup() {
    const locale = useLocale();
    const location = useLocation();
    return { ...locale, ...location };
  },
};
