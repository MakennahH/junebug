import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/css/layout.css";
import "@/assets/css/darkmode.css";

import ToggleButton from "vue-js-toggle-button";

import firebase from "firebase";
import { Route } from 'vue-router';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9utBzDbUKegR2OIMYGTQETUg3m5AQ-sk",
  authDomain: "junebug-754bc.firebaseapp.com",
  databaseURL: "https://junebug-754bc.firebaseio.com",
  projectId: "junebug-754bc",
  storageBucket: "junebug-754bc.appspot.com",
  messagingSenderId: "789403761474",
  appId: "1:789403761474:web:a198df78ecfcafe74b66db"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ToggleButton);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.afterEach((to: Route) => {
  if (to.meta.tab) {
    document.querySelector("#tabs")?.classList.remove("d-none");
  }
  else {
    document.querySelector("#tabs")?.classList.add("d-none");
  }
})