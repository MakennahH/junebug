import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () =>
      import("../views/Calendar.vue")
  },
  {
    path: "/planner",
    name: "Planner",
    component: () =>
      import("../views/Planner.vue")
  },
  {
    path: "/notes",
    name: "Notes",
    component: () =>
      import("../views/Notes.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import("../views/Settings.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
