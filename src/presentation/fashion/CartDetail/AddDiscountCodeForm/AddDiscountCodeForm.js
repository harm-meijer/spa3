// import { required } from 'vuelidate/lib/validators';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
// import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
// import BaseInput from '../../common/form/BaseInput/BaseInput.vue';

import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    // BaseForm,
    // BaseInput,
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
    const code = shallowRef('');
    const error = shallowRef(null);
    const { applyDiscount: ad } = props.cartLike.cartTools;
    const applyDiscount = () =>
      ad(code.value).catch((e) => (error.value = e));
    const getErrorMessage = ({ code }) => {
      if (code === 'DiscountCodeNonApplicable') {
        return t('nonApplicable');
      }
      return t('unknownError');
    };

    return {
      t,
      applyDiscount,
      code,
      getErrorMessage,
      error,
    };
  },
};
