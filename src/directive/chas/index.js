import Vue from 'vue';

Vue.directive('chas', (el, binding, vnode) => {
  if (binding.value) {
    const comment = document.createComment(' '); // createComment()方法用来创建并返回一个注释节点.
    Object.defineProperty(comment, 'setAttribute', {
      value: () => undefined,
    });
    vnode.elm = comment;
    vnode.text = ' ';
    vnode.isComment = true;
    vnode.context = undefined;
    vnode.tag = undefined;
    vnode.data.directives = undefined;
    if (vnode.componentInstance) {
      vnode.componentInstance.$el = comment;
    }

    if (el.parentNode) {
      el.parentNode.replaceChild(comment, el);
    }
  }
});
