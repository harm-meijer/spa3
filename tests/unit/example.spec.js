// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
import useTmp from '../../composition/useTmp';
jest.mock('../../composition/useProducts.js', () => {
  return jest.fn((a, b, c) => ({ a, b, c }));
});

// const moduleName = require('../../composition/useProducts.js');
describe('useTmp', () => {
  it('returns 43', () => {
    expect(useTmp(1, 2, 3)).toEqual({ a: 1, b: 2, c: 3 });
  });
});
