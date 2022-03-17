import ServerError from 'presentation/components/ServerError/ServerError.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';

import { useI18n } from 'vue-i18n';

export default {
  components: {
    BaseForm,
    BaseInput,
    ServerError,
  },
  props: {
    cartLike: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { form, v } =
      props.cartLike.cartTools.discountCode;
    const { applyDiscount: ad } = props.cartLike.cartTools;
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
