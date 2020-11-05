<template>
  <div id="content-wrapper">
    <div id="app">
      <router-view />
    </div>
    <tab-bar />
  </div>
</template>

<script>
import TabBar from "@/components/TabBar.vue";

export default {
	name: "App",
	components: {
		TabBar,
	},
};
</script>