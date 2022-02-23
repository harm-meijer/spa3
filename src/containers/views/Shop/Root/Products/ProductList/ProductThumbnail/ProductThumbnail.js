//@todo: split into presentation and container
// import productMixin from '@/mixins/productMixin';
// import BasePrice from '../BasePrice/BasePrice.vue';
// import cartMixin from '../../../mixins/cartMixin';
// import { addLine } from '../shared';
import { useI18n } from 'vue-i18n';
import useCartMutation, {
  addLineItem,
} from 'hooks/useCartMutation';
import BasePrice from './BasePrice/BasePrice.vue';
import { computed } from 'vue';

export default {
  name: 'ProductThumbnail',
  components: {
    BasePrice,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const productRoute = (productSlug, sku) => ({
      name: 'product',
      params: {
        productSlug,
        sku,
      },
    });
    const displayedImageUrl = (variant) => {
      if (
        Array.isArray(variant.images) &&
        variant.images.length
      ) {
        return variant.images[0].url;
      }
      return require('presentation/assets/img/missing.svg');
    };
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    const { mutateCart } = useCartMutation();
    const addToCart = (sku, quantity = 1) =>
      mutateCart(addLineItem(sku, quantity));
    const hasPrice = computed(
      () => props?.product?.masterVariant?.scopedPrice
    );
    const hasDiscount = computed(
      () =>
        props?.product?.masterVariant?.scopedPrice
          ?.discounted
    );
    return {
      productRoute,
      displayedImageUrl,
      t,
      addToCart,
      hasPrice,
      hasDiscount,
    };
  },
};
