import BannerSlide from 'presentation/Banner/BannerSlide.vue';

import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    return {
      t,
    };
  },
  components: {
    BannerSlide,
    VueperSlides,
    VueperSlide,
  },
  data: () => ({
    autoPlaying: true,
    internalAutoPlaying: true,
  }),
};
