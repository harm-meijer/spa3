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
          h3Message: 'midSeasonSale',
          h1Message: 'up50',
          bttnText: 'shopNow',
        },
      },
      {
        id: 2,
        title: 'Slide 2',
        content: {
          h3Message: 'checkout',
          h1Message: 'newCollection',
          bttnText: 'shopNow',
        },
      },
    ],
  }),
};
