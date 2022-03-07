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
    slides: [
      {
        id: 1,
        title: 'Slide 1',
        content: {
          h3Message: 'h3msg1',
          h1Message: 'h1msg1',
          bttnText: 'shopNow',
        },

        message: ' This is slide 1 message',
      },
      {
        id: 2,
        title: 'Slide 2',
        content: {
          h3Message: 'h3msg 2',
          h1Message: 'h1msg 2',
          bttnText: 'shopNow',
        },
        message: 'this is slide 2 message',
      },
    ],
  }),
};
