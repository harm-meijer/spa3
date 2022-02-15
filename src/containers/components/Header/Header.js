import useLocale from 'hooks/useLocale';
import useLocation from 'hooks/useLocation';

export default {
  setup() {
    const locale = useLocale();
    const location = useLocation();
    return { ...locale, ...location };
  },
};
