<template>
	<div class="notes pb-2 h-100">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/notes" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Notes</div>
			<router-link class="header-button" :to="'/notes/edit/' + id" replace>
				<b-icon icon="pencil" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header h-100">
			<div class="col mx-2 h-100">
				<div class="small text-secondary">{{ note.prettyLastEdited }}</div>
				<div class="big pb-3">{{ note.contents }}</div>
				<b-button @click="deleteNote" variant="outline-danger" class="mb-2"><b-icon-trash></b-icon-trash> Delete</b-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class ViewNote extends Vue {
	private id = this.$route.params.id;
	private loading = true;

	mounted() {
		this.loading = true;
		this.$store.dispatch("getNotes").finally(() => (this.loading = false));
	}

	get notes() {
		return this.$store.state.scheduling.notes;
	}

	get note() {
		return this.notes.find((note: any) => {
			return note.id === this.id;
		});
	}

	deleteNote() {
		this.$store.dispatch("deleteNote", { id: this.$route.params.id }).then(() => {
			this.$router.replace("/notes");
		});
	}
}
</script>

<style scoped>
.big {
	min-height: 100% !important;
}
</style>
