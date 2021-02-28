import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Vuesax from "vuesax";
import { plugins } from "./plugins";
import "vuesax/dist/vuesax.css"; //Vuesax

Vue.config.productionTip = false;
Vue.use(Vuesax);
Vue.use(plugins);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
