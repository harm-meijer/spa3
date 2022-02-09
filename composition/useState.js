import { ref } from 'vue';

export default (initialState) => {
  const state = ref(initialState);
  const setter = (newValue) =>
    typeof newValue === 'function'
      ? (state.value = newValue(state.value))
      : (state.value = newValue);
  return [state, setter];
};
