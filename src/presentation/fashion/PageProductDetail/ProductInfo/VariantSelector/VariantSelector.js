//@todo: make container and presentation
import useLocale from 'hooks/useLocale';
import { shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import config from '../../../../../../sunrise.config';
import { getAttributeValue } from '../../../../../containers/lib';
import { move } from '../../../../../lib';

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
    const route = useRoute();
    const router = useRouter();
    const { locale } = useLocale();
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
    const variants = shallowRef(
      (() => {
        const variants = tmpAttributes.reduce(
          (acc, { label, value }) =>
            acc.set(
              label,
              (acc.get(label) || []).concat(value)
            ),
          new Map()
        );
        variants.forEach((value, key) => {
          if (new Set(value).size <= 1) {
            variants.delete(key);
          }
        });
        return variants;
      })()
    );
    const validKeys = [...variants.value.keys()];
    const score = shallowRef(
      tmpAttributes
        .filter(({ label }) => validKeys.includes(label))
        .reduce(
          (acc, { label, value, score, sku }) =>
            acc.set(sku, {
              ...acc.get(sku),
              score: (acc.get(sku)?.score || 0) + score,
              [label]: value,
            }),
          new Map()
        )
    );
    const userSet = shallowRef({});
    const setScore = (label, value) => {
      //vue does not understand immutable
      // eslint-disable-next-line no-unused-vars
      const { [label]: _, ...rest } = userSet.value;
      userSet.value = { ...rest, [label]: value };
      const newScore = new Map(score.value);
      newScore.forEach((v, sku) => {
        const newV = { ...v };
        newV.score =
          v[label] === value
            ? 100
            : v[label] === userSet.value[label]
            ? 20
            : sku === props.sku
            ? 10
            : 0;
        newScore.set(sku, newV);
      });
      score.value = newScore;
    };
    const setVariant = () => {
      let high = 0;
      let sku;
      score.value.forEach(({ score }, key) => {
        if (score >= high) {
          high = score;
          sku = key;
        }
      });
      move(router, route, { ...route.params, sku }, 'push');
    };
    const variantChange = (label, e) => {
      setScore(label, e.target.value);
      setVariant();
    };
    const isSelected = (label, value) =>
      score.value.get(props.sku)[label] === value;
    return { variants, variantChange, isSelected };
  },
};