<template>
	<nav id="tabs" class="bar bar-tab d-none">
		<router-link class="tab-item" v-bind:class="{ active: isActive('today') }" to="/today">
			<b-icon icon="house-door-fill" class="icon"></b-icon>
			<span class="tab-label">Home</span>
		</router-link>
		<router-link class="tab-item" v-bind:class="{ active: isActive('calendar') }" to="/calendar">
			<b-icon icon="calendar3-week-fill" class="icon"></b-icon>
			<span class="tab-label">Calendar</span>
		</router-link>
		<router-link class="tab-item" v-bind:class="{ active: isActive('planner') }" to="/planner">
			<b-icon icon="file-text-fill" class="icon"></b-icon>
			<span class="tab-label">Planner</span>
		</router-link>
		<router-link class="tab-item" v-bind:class="{ active: isActive('notes') }" to="/notes">
			<b-icon icon="pen-fill" class="icon"></b-icon>
			<span class="tab-label">Notes</span>
		</router-link>
		<router-link class="tab-item" v-bind:class="{ active: isActive('settings') }" to="/settings">
			<b-icon icon="gear-fill" class="icon"></b-icon>
			<span class="tab-label">Settings</span>
		</router-link>
	</nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TabBar extends Vue {
	isActive(tab: string) {
		return this.$store.state.tab === tab;
	}
}
</script>

<style scoped>
.bar-tab {
	line-height: 1;
	bottom: 0;
	display: table;
	width: 100%;
	height: 50px;
	padding: 0;
	table-layout: fixed;
	border-bottom: 0;
}

.bar {
	position: fixed;
	right: 0;
	left: 0;
	z-index: 10;
	height: calc(70px + min(12px, env(safe-area-inset-top, 6px)));
	background-color: #234c6c;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}

.bar-tab .tab-item {
	-moz-transition: all 0.1s ease-in;
	-o-transition: all 0.1s ease-in;
	-webkit-transition: all 0.1s ease-in;
	transition: all 0.1s ease-in;
	display: table-cell;
	width: 1%;
	height: 50px;
	color: #ffffff;
	text-align: center;
	vertical-align: middle;
	text-decoration: none;
	font-size: 18px;
}

.bar-tab .tab-item.active {
	color: #17a2b8;
}

.bar-tab .tab-label {
	margin: 5px 0;
}

.bar-tab .tab-item .icon ~ .tab-label {
	display: block;
	font-size: 12px;
}
</style>
