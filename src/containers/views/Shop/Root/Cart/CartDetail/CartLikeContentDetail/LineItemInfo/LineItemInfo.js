import BasePrice from 'presentation/components/BasePrice/BasePrice.vue';
import { computed, shallowRef, watch } from 'vue';
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
  setup(props, { emit }) {
    const selected = shallowRef(false);
    const total = computed(() => {
      return { value: props.lineItem.totalPrice };
    });
    const lineItemAttr = computed(() => {
      const attributes =
        props.lineItem.variant.attributesRaw
          .filter(({ name }) =>
            config.variantInProductName.includes(name)
          )
          .map(({ attributeDefinition, value }) => [
            attributeDefinition.label,
            value,
          ]);
      return attributes.join(', ');
    });
    const item = computed(() =>
      props.selectable
        ? {
            lineItemId: this.lineItem.id,
            quantity: this.lineItem.quantity,
            shipmentState: 'Advised',
          }
        : null
    );
    watch(selected, (selected) => {
      if (selected === true) {
        emit('select-return-item', item);
      }
      if (this.selected === false) {
        emit('unselect-return-item', item);
      }
    });

    const productRoute = (lineItem) => {
      return {
        name: 'product',
        params: {
          sku: lineItem.variant.sku,
          productSlug: lineItem.productSlug,
        },
      };
    };
    const displayedImageUrl = (variant) => {
      return variant?.images?.[0].url;
    };
    return {
      total,
      lineItemAttr,
      productRoute,
      displayedImageUrl,
    };
  },
};
