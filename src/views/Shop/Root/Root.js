import useLocale from '../../../../composition/useLocale';
import useLocation from '../../../../composition/useLocation';

export default {
  setup() {
    //@todo: set location things in context
    const { location, setLocation } = useLocation();
    const { locale, setLocale } = useLocale();
    return { location, setLocation, locale, setLocale };
  },
};
