import { useI18n } from 'vue-i18n';

export default {
  name: 'About',
  setup() {
    const t = useI18n();
    return { ...t };
  },
};
