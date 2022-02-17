import useLocale from 'hooks/useLocale';

export default {
  name: 'GoogleMaps',
  setup() {
    const locale = useLocale();
    return { ...locale };
  },
  data() {
    return {
      center: { lat: 52.5174434, lng: 13.3879598 },
      language: this.locale,
    };
  },
};
