/* eslint-disable no-unused-vars */
//@todo: remove this eslint disable
// import LineItemQuantityForm from '../../../cartdetail/LineItemQuantityForm/LineItemQuantityForm.vue';
// import LineItemDeleteForm from '../../../cartdetail/LineItemDeleteForm/LineItemDeleteForm.vue';
// import Remove from '../../../cartdetail/LineItemQuantityForm/Remove/Remove.vue';
// import { totalPrice, variantAttributes, locale, productSlug } from '../../shared';

import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
export default {
  components: {
    // LineItemQuantityForm,
    // Remove,
    // LineItemDeleteForm,
    BasePrice,
  },
  props: {
    lineItem: {
      type: Object,
      required: true,
    },
    extended: {
      type: Boolean,
      default: () => true,
    },
    editable: {
      type: Boolean,
      default: () => true,
    },
    selectable: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      selected: false,
      item: null,
    };
  },

  beforeMount() {
    if (this.selectable) {
      this.item = {
        lineItemId: this.lineItem.id,
        quantity: this.lineItem.quantity,
        shipmentState: 'Advised',
      };
    }
  },
  methods: {
    productSlug(lineItem) {
      // console.log('what do we need', lineItem);
      // return productSlug(this, lineItem);
      return '--- todo ---';
    },
    productRoute(slug, sku) {
      // console.log(
      //   '---- todo ---- product route',
      //   slug,
      //   sku
      // );
      return '/';
    },
    displayedImageUrl(variant) {
      // console.log('--- todo --- get image url', variant);
      return '';
    },
  },

  watch: {
    selected() {
      if (this.selected === true) {
        this.$emit('select-return-item', this.item);
      }
      if (this.selected === false) {
        this.$emit('unselect-return-item', this.item);
      }
    },
  },

  computed: {
    total() {
      return { value: this.lineItem.totalPrice };
    },
    lineItemAttr() {
      // const attributes = variantAttributes(
      //   this.lineItem?.variant,
      //   locale(this)
      // );
      // return `${attributes
      //   .map(({ name, value }) => `${name}: ${value}`)
      //   .join(', ')}`;
      return '----  todo ----';
    },
  },
};
