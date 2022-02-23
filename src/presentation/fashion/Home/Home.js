import { useI18n } from 'vue-i18n';
import Banner from 'presentation/Banner/Banner.vue';

export default {
  name: 'Home',
  components: { Banner },

  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    return {
      t,
    };
  },
};
