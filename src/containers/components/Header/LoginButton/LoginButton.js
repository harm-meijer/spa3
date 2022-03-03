import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t } = useI18n();
    //@todo: implement useCustomer
    const showLoggedIn = false;
    return { showLoggedIn, t };
  },
};
