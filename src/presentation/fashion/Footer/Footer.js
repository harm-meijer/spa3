//import BaseFooter from '../BaseFooter/BaseFooter.vue';
//import FooterLinks from '../FooterLinks/FooterLinks.vue';
//import FooterMarketing from '../FooterMarketing/FooterMarketing.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Footer',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    return { t };
  },
};
