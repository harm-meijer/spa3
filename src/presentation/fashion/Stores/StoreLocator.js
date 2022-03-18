import GoogleMaps from 'containers/views/Shop/Root/Stores/GoogleMaps/GoogleMaps.vue';
import { computed, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import useChannels from '../../../../composition/useChannels';
const getCoordinates = ({ lat, lng }) => ({
  lat: parseFloat(lat),
  lng: parseFloat(lng),
});

const getLocationFromPlace = (p) =>
  getCoordinates({
    lat: p.geometry.location.lat(),
    lng: p.geometry.location.lng(),
  });

export default {
  name: 'StoreLocator',
  components: { GoogleMaps },
  setup() {
    const { t } = useI18n();
    const center = shallowRef({});
    const radiusOptions = [
      {
        distance: 25,
        label: '25 mi',
      },
      {
        distance: 50,
        label: '50 mi',
      },
      {
        distance: 100,
        label: '100 mi',
      },
      {
        distance: 500,
        label: '500 mi',
      },
      {
        distance: 1000,
        label: '1000 mi',
      },
      {
        distance: 3000,
        label: '3000 mi',
      },
    ];
    const distance = computed(
      () => searchRadius.value.distance
    );
    const searchRadius = shallowRef(radiusOptions[0]);
    const { channels, loading } = useChannels(
      center,
      distance
    );
    function setPlace(place) {
      center.value = getLocationFromPlace(place);
    }
    return {
      setPlace,
      center,
      radiusOptions,
      searchRadius,
      loading,
      channels,
      t,
    };
  },
};
