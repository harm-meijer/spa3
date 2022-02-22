import SlideContent from 'presentation/Home/Banner/SlideContent.js';
import BannerSlide from 'presentation/Home/Banner/BannerSlide.vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';

export default {
  components: {
    BannerSlide,
    Carousel,
    Slide,
  },
  data() {
    return {
      slides: SlideContent,

      settings: {
        itemsToShow: 1,
        autoplay: 2000,
        wrapAround: false,
      },
    };
  },
};
