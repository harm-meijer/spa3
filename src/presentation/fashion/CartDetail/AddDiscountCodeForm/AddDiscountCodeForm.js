import ServerError from 'presentation/components/ServerError/ServerError.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';

import { useI18n } from 'vue-i18n';
import useCartTools from 'hooks/useCartTools';

export default {
  components: {
    BaseForm,
    BaseInput,
    ServerError,
  },
  setup() {
    const { t } = useI18n();
    const {
      discountCode: { form, v },
      applyDiscount: ad,
    } = useCartTools();
    const applyDiscount = () => ad(form.value.code);
    const getErrorMessage = ({ code }) => {
      if (code === 'DiscountCodeNonApplicable') {
        return t('nonApplicable');
      }
      return t('unknownError');
    };

    return {
      t,
      applyDiscount,
      form,
      getErrorMessage,
      v,
    };
  },
};
