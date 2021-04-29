import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/Auth/NotFound.vue";
import ForgotPassword from "../views/Auth/ForgotPassword.vue";
import SignUp from "../views/Auth/SignUp.vue";
import Login from "../views/Auth/Login.vue";
import { auth } from "@/firebase";

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
		component: Login,
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
		path: "/editprofile",
		name: "EditProfile",
		component: () => import("../views/EditProfile.vue"),
		meta: {
			tab: "settings",
			auth: true,
		},
	},
	{
		path: "/changepassword",
		name: "ChangePassword",
		component: () => import("../views/ChangePassword.vue"),
		meta: {
			tab: "settings",
			auth: true,
		},
	},
	{
		path: "/today",
		name: "Today",
		component: () => import("../views/Today.vue"),
		meta: {
			tab: "today",
			auth: true,
		},
	},
	{
		path: "/calendar",
		name: "Calendar",
		component: () => import("../views/Calendar.vue"),
		meta: {
			tab: "calendar",
			auth: true,
		},
	},
	{
		path: "/planner",
		name: "Planner",
		component: () => import("../views/Planner.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/alarms/add",
		name: "AddAlarm",
		component: () => import("../views/Alarms/AddAlarm.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/alarms/edit/:id",
		name: "EditAlarm",
		component: () => import("../views/Alarms/AddAlarm.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/alarms",
		name: "Alarms",
		component: () => import("../views/Alarms/Alarms.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/alarms/view/:id",
		name: "ViewAlarm",
		component: () => import("../views/Alarms/ViewAlarm.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/events/add",
		name: "AddEvent",
		component: () => import("../views/Events/AddEvent.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/events/edit/:id",
		name: "EditEvent",
		component: () => import("../views/Events/AddEvent.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/events",
		name: "Events",
		component: () => import("../views/Events/Events.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/events/view/:id",
		name: "ViewEvent",
		component: () => import("../views/Events/ViewEvent.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/tasks/add",
		name: "AddTask",
		component: () => import("../views/Tasks/AddTask.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/tasks/edit/:id",
		name: "EditTask",
		component: () => import("../views/Tasks/AddTask.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/tasks",
		name: "Tasks",
		component: () => import("../views/Tasks/Tasks.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/tasks/view/:id",
		name: "ViewTask",
		component: () => import("../views/Tasks/ViewTask.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/timelimits/add",
		name: "AddTimeLimit",
		component: () => import("../views/TimeLimits/AddTimeLimit.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/timelimits/edit/:id",
		name: "EditTimeLimit",
		component: () => import("../views/TimeLimits/AddTimeLimit.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/timelimits",
		name: "TimeLimits",
		component: () => import("../views/TimeLimits/TimeLimits.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/timelimits/view/:id",
		name: "ViewTimeLimits",
		component: () => import("../views/TimeLimits/ViewTimeLimit.vue"),
		meta: {
			tab: "planner",
			auth: true,
		},
	},
	{
		path: "/notes/add",
		name: "AddNote",
		component: () => import("../views/Notes/AddNote.vue"),
		meta: {
			tab: "notes",
			auth: true,
		},
	},
	{
		path: "/notes/edit/:id",
		name: "EditNote",
		component: () => import("../views/Notes/AddNote.vue"),
		meta: {
			tab: "notes",
			auth: true,
		},
	},
	{
		path: "/notes",
		name: "Notes",
		component: () => import("../views/Notes/Notes.vue"),
		meta: {
			tab: "notes",
			auth: true,
		},
	},
	{
		path: "/notes/view/:id",
		name: "ViewNote",
		component: () => import("../views/Notes/ViewNote.vue"),
		meta: {
			tab: "notes",
			auth: true,
		},
	},
	{
		path: "/settings",
		name: "Settings",
		component: () => import("../views/Settings.vue"),
		meta: {
			tab: "settings",
			auth: true,
		},
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
	routes,
});

export default router;

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(x => x.meta.auth);

	if (requiresAuth && !auth.currentUser) {
		next("/login");
	} else {
		next();
	}
});
