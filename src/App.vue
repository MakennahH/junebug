<template>
	<div id="content-wrapper">
		<div id="app">
			<router-view />
		</div>
		<tab-bar />

		<b-modal id="modal-1" title="BootstrapVue">
			<p class="my-4">Hello from modal!</p>
		</b-modal>
	</div>
</template>

<script>
import TabBar from "@/components/TabBar.vue";

export default {
	name: "App",
	components: {
		TabBar,
	},

	methods: {
		showModal() {
			this.$bvModal.msgBoxConfirm("Your time limit titled [title] is up.", {
				title: "Time's up!",
				headerBgVariant: "info",
				headerTextVariant: "light",
				centered: true,
				okVariant: "info",
				okTitle: "OK",
				cancelTitle: "Snooze",
			});
		},
	},
};
</script>
