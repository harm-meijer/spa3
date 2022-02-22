import SlideContent from 'presentation/Home/Banner/SlideContent.js';
import BannerSlide from 'presentation/Home/Banner/BannerSlide.vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
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
    Carousel,
    Slide,
  },
  data() {
    return {
      slides: SlideContent,
    };
  },
};
