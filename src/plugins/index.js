import Vue from "vue";

export const plugins = {
  install(vm) {
    vm.prototype.$bus = new Vue();
  },
};
