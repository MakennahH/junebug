<template>
	<div class="add-note pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/notes" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>{{ this.isEdit ? "Edit Note" : "Add a Note" }}</div>
		</div>
		<div class="row has-header">
			<form class="col mx-2">
				<b-form-textarea class="textarea" v-model="contents" placeholder="start a note..." no-auto-shrink no-resize></b-form-textarea>
				<b-button @click="saveNote" class="btn mt-2" variant="info" block> Save </b-button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { NoteModel } from "../../models/scheduling";
import moment from "moment";
@Component({})
export default class AddNote extends Vue {
	private isEdit = "";
	private note = new NoteModel();

	mounted() {
		this.isEdit = this.$route.params.id;
		if (this.isEdit) {
			this.note = this.notes.find((note: any) => {
				return note.id === this.$route.params.id;
			});
		}
	}

	get notes() {
		return this.$store.state.scheduling.notes;
	}

	get contents() {
		return this.note.contents || "";
	}

	set contents(value: string) {
		if (this.note) {
			this.note.contents = value;
		}
	}

	saveNote() {
		if (this.isEdit) {
			const newLastEdited = new Date();
			this.$store
				.dispatch("updateNote", { id: this.$route.params.id, contents: this.note.contents, lastEdited: newLastEdited, prettyLastEdited: moment(newLastEdited).format("h:mmA MMM Do YYYY") })
				.then(() => {
					this.$router.replace("/notes");
				});
		} else {
			this.$store.dispatch("addNote", { contents: this.note.contents, lastEdited: this.note.lastEdited, prettyLastEdited: moment(this.note.lastEdited).format("h:mmA MMM Do YYYY") }).then(() => {
				this.$router.replace("/notes");
			});
		}
	}
}
</script>

<style scoped>
.textarea {
	height: calc(100vh - 180px);
}
</style>
