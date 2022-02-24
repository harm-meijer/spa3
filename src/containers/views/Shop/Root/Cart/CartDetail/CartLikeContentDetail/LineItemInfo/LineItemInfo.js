/* eslint-disable no-unused-vars */
//@todo: remove this eslint disable
// import LineItemQuantityForm from '../../../cartdetail/LineItemQuantityForm/LineItemQuantityForm.vue';
// import LineItemDeleteForm from '../../../cartdetail/LineItemDeleteForm/LineItemDeleteForm.vue';
// import Remove from '../../../cartdetail/LineItemQuantityForm/Remove/Remove.vue';
// import { totalPrice, variantAttributes, locale, productSlug } from '../../shared';
import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import config from '../../../../../../../../../sunrise.config';
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
    productRoute(lineItem) {
      return {
        name: 'product',
        params: {
          sku: lineItem.variant.sku,
          productSlug: lineItem.productSlug,
        },
      };
    },
    displayedImageUrl(variant) {
      return variant?.images?.[0].url;
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
      const attributes = this.lineItem.variant.attributesRaw
        .filter(({ name }) =>
          config.variantInProductName.includes(name)
        )
        .map(({ attributeDefinition, value }) => [
          attributeDefinition.label,
          value,
        ]);
      return attributes.join(', ');
    },
  },
};
