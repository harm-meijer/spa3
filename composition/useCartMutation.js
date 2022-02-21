import org from './ct/useCartMutation';
import useCurrency from './useCurrency';
import useLocation from './useLocation';
export { addLineItem } from './ct/useCartMutation';
const useCartMutation = () => {
  const { location } = useLocation();
  const currency = useCurrency();
  return org({ location, currency });
};
export default useCartMutation;
