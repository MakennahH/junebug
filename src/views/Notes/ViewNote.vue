<template>
	<div class="notes pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/notes" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Notes</div>
			<router-link class="header-button" :to="'/notes/edit/' + id" replace>
				<b-icon icon="pencil" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<div class="text-secondary">{{ note.lastModified }}</div>
				<div>{{ note.contents }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class ViewNote extends Vue {
	private id = this.$route.params.id;
	private note = {
		lastModified: "9/9/99",
		contents: "It was the best of times, it was the worst of times",
	};
}
</script>
