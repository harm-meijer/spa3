import useLocale from './useLocale';
import useCart from './ct/useCart';
import { ref } from 'vue';
//Vue/app specific code
export default ({ expand } = {}) => {
  const { locale } = useLocale();
  return useCart({
    locale,
    expand: ref(expand),
  });
};
