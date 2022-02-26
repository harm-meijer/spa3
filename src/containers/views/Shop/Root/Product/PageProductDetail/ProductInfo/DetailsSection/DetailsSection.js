import { computed, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  getAttributeValue,
  productAttributes,
} from 'containers/lib';

export default {
  props: {
    currentVariant: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const expanded = shallowRef([true, false]);
    //@todo: move to productLike, same as cartLike
    // const { locale } = useLocale();
    const attributes = computed(() => {
      const attributes =
        props.currentVariant.attributesRaw.map(
          ({ name, value }) => [
            name,
            getAttributeValue(value, 'en'),
          ]
        );
      return productAttributes(attributes, 'en');
    });
    const openAccordion = (e) => {
      const contextPanelGroup = window
        .$('.pdp-accord-toggle')
        .parents('.panel-group-pdp');
      const contextPanel = window
        .$(e.target)
        .parents('.panel-default');
      const contextButton = window.$(
        '.accordion-plus',
        contextPanel
      );
      contextButton.toggleClass('accordion-minus');
      // Remove minus class on all other buttons
      contextPanelGroup
        .find('.accordion-plus')
        .not(contextButton)
        .removeClass('accordion-minus');
    };
    const toggle = (index) => {
      const copy = [...expanded.value];
      copy[index] = !copy[index];
      expanded.value = copy;
    };
    return {
      expanded,
      attributes,
      openAccordion,
      toggle,
      t,
    };
  },
};
