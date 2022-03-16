import { shallowRef } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

function useDiscountCode() {
  const code = shallowRef('');
  const rules = {
    code: { required, $lazy: true },
  };

  const v = useVuelidate(rules, code);
  return { code, v };
}
export default useDiscountCode;
