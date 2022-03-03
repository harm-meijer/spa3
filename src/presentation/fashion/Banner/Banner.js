import SlideContent from 'presentation/Banner/SlideContent.js';
import BannerSlide from 'presentation/Banner/BannerSlide.vue';
import { Slide } from 'vue3-carousel';
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
    Slide,
  },
  data() {
    return {
      slides: SlideContent,
    };
  },
};
