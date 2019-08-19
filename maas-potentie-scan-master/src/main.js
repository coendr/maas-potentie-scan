import "babel-polyfill";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-xxl/dist/css/bootstrap.min.css";
import "nprogress";
import "nprogress/nprogress.css";
import "popper.js";

import browser from "./BrowserDetect";

if (browser && window.location.pathname !== "/non-supported") {
  window.location.href = "/non-supported";
} else if (!browser && window.location.pathname == "/non-supported") {
  window.location.href = "/";
}

//import vuetify
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

import VueGoogleCharts from "vue-google-charts";
Vue.use(VueGoogleCharts);

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
