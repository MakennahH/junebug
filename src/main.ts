import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Route } from "vue-router";
import store from "./stores";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import * as fb from "@/firebase";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/css/layout.css";
import "@/assets/css/darkmode.css";

import ToggleButton from "vue-js-toggle-button";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ToggleButton);

Vue.config.productionTip = false;

// new Vue({
// 	router,
// 	store,
// 	render: h => h(App),
// }).$mount("#app");

let app: any;

const init = () => {
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App),
		}).$mount("#app");
	}
};

fb.auth.onAuthStateChanged(user => {
	if (user) {
		store.commit("setUserProfile", user);
		store.dispatch("getDarkMode");
	} else {
		store.commit("setUserProfile", null);
	}

	init();
});

// controls tab bar
router.afterEach((to: Route) => {
	if (to.meta) {
		if (to.meta.tab && to.meta.auth) {
			store.commit("setTab", to.meta.tab);
			document.querySelector("#tabs")?.classList.remove("d-none");
		} else {
			store.commit("setTab", "none");
			document.querySelector("#tabs")?.classList.add("d-none");
		}
	} else {
		store.commit("setTab", "none");
		document.querySelector("#tabs")?.classList.add("d-none");
	}
});

