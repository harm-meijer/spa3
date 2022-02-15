import useLocale from './useLocale';
import useCart from './ct/useCart';
//Vue/app specific code
export default () => {
  const { locale } = useLocale();
  const { cart, loading, error } = useCart({ locale });
  return { cart, loading, error };
};
