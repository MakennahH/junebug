import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/today",
    name: "Today",
    component: () => import("../views/Today.vue"),
    meta: {
      tab: "today",
    }
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () => import("../views/Calendar.vue"),
    meta: {
      tab: "calendar",
    },

  },
  {
    path: "/planner",
    name: "Planner",
    component: () =>
      import("../views/Planner.vue"),
    meta: {
      tab: "planner",
    }
  },
  {
    path: "/notes",
    name: "Notes",
    component: () =>
      import("../views/Notes.vue"),
    meta: {
      tab: "notes",
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import("../views/Settings.vue"),
    meta: {
      tab: "settings",
    }
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
