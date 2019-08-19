import Vue from "vue";
import Router from "vue-router";

import NProgress from "nprogress";

import Home from "./views/Home.vue";
import Brabant from "./views/Brabant.vue";
import CrowdFunding from "./views/CrowdFunding.vue";
import NoSupport from "./views/NoSupport.vue";
import ModalSplit from "./views/ModalSplit.vue";

Vue.use(Router);
Vue.use(NProgress);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", name: "home", component: Home },
    //{ path: "/brabant", name: "brabant", component: Brabant },
    { path: "/crowdfunding", name: "crowdfunding", component: CrowdFunding },
    { path: "/non-supported", name: "non-supported", component: NoSupport },
    { path: "/brabant/modalsplit", name: "modalsplit", component: ModalSplit }
  ]
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from, next) => {
  NProgress.done();
});

export default router;
