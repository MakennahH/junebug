import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/Auth/NotFound.vue";
import ForgotPassword from "../views/Auth/ForgotPassword.vue";
import SignUp from "../views/Auth/SignUp.vue";
import Login from "../views/Auth/Login.vue";

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
		path: "/today",
		name: "Today",
		component: () => import("../views/Today.vue"),
		meta: {
			tab: "today",
		},
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
		component: () => import("../views/Planner.vue"),
		meta: {
			tab: "planner",
		},
	},
	{
		path: "/alarms",
		name: "Alarms",
		component: () => import("../views/Alarms/Alarms.vue"),
		meta: {
			tab: "planner",
		},
	},
	{
		path: "/alarms/add",
		name: "AddAlarm",
		component: () => import("../views/Alarms/AddAlarm.vue"),
		meta: {
			tab: "planner",
		},
	},
	{
		path: "/events",
		name: "Events",
		component: () => import("../views/Events/Events.vue"),
		meta: {
			tab: "planner",
		},
	},
	{
		path: "/events/add",
		name: "AddEvent",
		component: () => import("../views/Events/AddEvent.vue"),
		meta: {
			tab: "planner",
		},
	},
	{
		path: "/tasks",
		name: "Tasks",
		component: () => import("../views/Tasks/Tasks.vue"),
		meta: {
			tab: "planner",
		},
	},
	{
		path: "/tasks/add",
		name: "AddTask",
		component: () => import("../views/Tasks/AddTask.vue"),
		meta: {
			tab: "planner",
		},
	},
	{
		path: "/timelimits",
		name: "TimeLimits",
		component: () => import("../views/TimeLimits/TimeLimits.vue"),
		meta: {
			tab: "planner",
		},
	},
	{
		path: "/timelimits/add",
		name: "AddTimeLimit",
		component: () => import("../views/TimeLimits/AddTimeLimit.vue"),
		meta: {
			tab: "planner",
		},
	},
	{
		path: "/notes/add",
		name: "AddNote",
		component: () => import("../views/Notes/AddNote.vue"),
		meta: {
			tab: "notes",
		},
	},
	{
		path: "/notes",
		name: "Notes",
		component: () => import("../views/Notes/Notes.vue"),
		meta: {
			tab: "notes",
		},
	},
	{
		path: "/notes/view/:id",
		name: "ViewNote",
		component: () => import("../views/Notes/ViewNote.vue"),
		meta: {
			tab: "notes",
		},
	},
	{
		path: "/settings",
		name: "Settings",
		component: () => import("../views/Settings.vue"),
		meta: {
			tab: "settings",
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
