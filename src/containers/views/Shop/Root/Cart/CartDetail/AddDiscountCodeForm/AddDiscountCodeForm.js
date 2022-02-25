// import { required } from 'vuelidate/lib/validators';
// import ServerError from '../../common/form/ServerError/ServerError.vue';
// import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
// import BaseInput from '../../common/form/BaseInput/BaseInput.vue';

import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import useCartMutation, {
  addDiscountCode,
} from 'hooks/useCartMutation';

export default {
  components: {
    // BaseForm,
    // BaseInput,
    // ServerError,
  },
  setup() {
    const { t } = useI18n();
    const code = shallowRef('');
    const { mutateCart } = useCartMutation();
    const applyDiscount = () =>
      mutateCart(addDiscountCode(code.value));

    const getErrorMessage = ({ code }) => {
      if (code === 'DiscountCodeNonApplicable') {
        return t('nonApplicable');
      }
      return t('unknownError');
    };

    return { t, applyDiscount, code, getErrorMessage };
  },
};
