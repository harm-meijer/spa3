import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import config from '../../../../../../../../../sunrise.config';
import LineItemQuantityForm from './LineItemQuantityForm/LineItemQuantityForm.vue';
import Remove from './LineItemQuantityForm/Remove/Remove.vue';
export default {
  components: {
    LineItemQuantityForm,
    Remove,
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
