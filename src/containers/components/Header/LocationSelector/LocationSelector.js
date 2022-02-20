import useLocation from 'hooks/useLocation';
import sunriseConfig from '../../../../../sunrise.config';
export default {
  name: 'LocationSelector',
  setup() {
    const location = useLocation();
    const values = Object.keys(sunriseConfig.countries);
    return { ...location, title: 'location', values };
  },
};
