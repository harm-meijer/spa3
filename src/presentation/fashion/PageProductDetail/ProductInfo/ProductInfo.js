// import ProductGallery from '../ProductGallery/ProductGallery.vue';
// import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks.vue';
// import DetailsSection from '../DetailsSection/DetailsSection.vue';
// import AddToCartForm from '../AddToCartForm/AddToCartForm.vue';
import VariantSelector from './VariantSelector/VariantSelector.vue';
// import useProductQuery from '../../../composition/useProductQuery';
// import { ref, watch } from 'vue-demi';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import AddToCartForm from './AddToCartForm/AddToCartForm.vue';
import DetailsSection from './DetailsSection/DetailsSection.vue';
import ProductGallery from './ProductGallery/ProductGallery.vue';
import CartLike from 'containers/components/CartLike/CartLike.vue';

export default {
  name: 'ProductInfo',
  props: {
    sku: {
      type: String,
      required: true,
    },
    currentVariant: {
      type: Object,
      required: true,
    },
    allVariants: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    //@todo: implement open shopping list
    const openAddToShoppingList = () => {
      emit('open-add-shopping-list', {
        slug: props.currentVariant.slug,
        sku: props.currentVariant.sku,
      });
    };
    return { openAddToShoppingList };
  },
  components: {
    DetailsSection,
    ProductGallery,
    CartLike,
    // SocialMediaLinks,
    AddToCartForm,
    BasePrice,
    VariantSelector,
  },
};
