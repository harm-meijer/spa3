// import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import { useI18n } from 'vue-i18n';
// import LineItemInfo from '../../common/CartLike/LineItemInfo/LineItemInfo.vue';
// import LineItemDeleteForm from '../../cartdetail/LineItemDeleteForm/LineItemDeleteForm.vue';

export default {
  name: 'MiniCart',
  components: {
    // LineItemDeleteForm,
    // LineItemInfo,
    // VuePerfectScrollbar,
    BasePrice,
  },
  props: {
    miniCart: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { open, close } = props.miniCart;
    const { t } = useI18n();
    return { open, close, t };
  },
};
