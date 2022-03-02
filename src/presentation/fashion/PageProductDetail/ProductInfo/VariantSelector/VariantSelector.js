//@todo: make container and presentation
import useLocale from 'hooks/useLocale';
import config from '../../../../../../sunrise.config';
import { getAttributeValue } from '../../../../../containers/lib';

export default {
  props: {
    allVariants: {
      type: Array,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { locale } = useLocale();
    console.log('allvariants', props.allVariants);
    const tmpAttributes = props.allVariants
      .map(({ attributesRaw, sku }) =>
        attributesRaw.map(({ name, value }) => {
          return {
            label: name, //@todo: how to translate name??
            value: getAttributeValue(value, locale.value),
            sku,
            score: props.sku === sku ? 1 : 0,
          };
        })
      )
      .flat()
      .filter(({ label }) =>
        config.variantSelector.includes(label)
      );
    const uniQueValues = tmpAttributes.reduce(
      (acc, { label, value }) =>
        acc.set(
          label,
          (acc.get(label) || []).concat(value)
        ),
      new Map()
    );
    uniQueValues.forEach((value, key) => {
      if (new Set(value).size <= 1) {
        uniQueValues.delete(key);
      }
    });
    console.log('unique:', uniQueValues);
  },
};
