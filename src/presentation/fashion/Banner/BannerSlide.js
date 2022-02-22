export default {
  name: 'bannerSlide',

  props: {
    bannerImage: {
      type: String,
      required: true,
    },
    h3Message: {
      type: String,
      required: true,
    },
    h1Message: {
      type: String,
      required: true,
    },
    bttnText: {
      type: String,
      required: true,
    },
  },
};
