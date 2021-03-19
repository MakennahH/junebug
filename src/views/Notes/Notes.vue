<template>
	<div class="notes pb-2">
		<div class="base-header text-center">
			<div>Notes</div>
			<router-link class="header-button" to="/notes/add" replace>
				<b-icon icon="plus" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col" v-if="!isLoading">
				<b-list-group v-if="notes.length > 0" class="mx-2">
					<b-list-group-item v-for="note in notes" :key="note.id" class="text-left text-truncate" :to="'notes/view/' + note.id" replace>
						<div class="text-truncate">{{ note.contents }}</div>
						<div class="small text-secondary">{{ note.prettyLastEdited }}</div>
					</b-list-group-item>
				</b-list-group>
				<b-card v-else class="card-secondary text-center mx-2">
					<b-card-text>You have no notes saved.</b-card-text>
				</b-card>
			</div>
			<b-spinner v-else class="m-auto" variant="info" label="Spinning"></b-spinner>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Notes extends Vue {
	private loading = true;

	get isLoading() {
		return this.loading;
	}

	get notes() {
		return this.$store.state.scheduling.notes;
	}

	mounted() {
		this.loading = true;
		this.$store.dispatch("getNotes").finally(() => (this.loading = false));
	}
}
</script>
