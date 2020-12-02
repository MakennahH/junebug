<template>
	<div class="home"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
	mounted() {
		document.querySelector("#tabs")?.classList.add("d-none");
		this.$router.replace("/login");
	}
}
</script>
