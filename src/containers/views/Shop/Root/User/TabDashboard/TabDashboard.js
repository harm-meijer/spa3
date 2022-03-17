import { useI18n } from 'vue-i18n';
import useCustomerTools from 'hooks/useCustomerTools';

export default {
  setup() {
    const { t } = useI18n();
    const { customer } = useCustomerTools();
    return { t, customer };
  },
};
