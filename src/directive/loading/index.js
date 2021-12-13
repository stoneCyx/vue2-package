import Vue from 'vue';
import loading from './common.vue';

const loadDirective = {
  bind(el, binding, vnode) {
    console.log(vnode.context);
    const LoadingCompoment = Vue.extend(loading);
    const loadingTemp = new LoadingCompoment().$mount();
    // eslint-disable-next-line no-param-reassign
    el.loadingInstance = loadingTemp;
    if (binding.value) {
      el.appendChild(loadingTemp.$el);
    }
  },
  update(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        el.appendChild(el.loadingInstance.$el);
      } else {
        el.removeChild(el.loadingInstance.$el);
      }
    }
  },
};

export default loadDirective;
