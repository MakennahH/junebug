<template>
	<div class="add-note pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/notes" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>{{ isEdit ? "Edit Note" : "Add a Note"}}</div>
		</div>
		<div class="row has-header">
			<form class="col mx-2">
				<b-form-textarea class="textarea" v-model="text" placeholder="start a note..." no-auto-shrink no-resize></b-form-textarea>
				<b-button @click="addNote" class="btn mt-2" variant="info" block>
					Save
				</b-button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddNote extends Vue {
	private isEdit = this.$route.params.id;

	mounted(){
		// find out if this is supposed to be populated with an object to edit
		// set isEdit to true
		// fill v-models with object values
	}

	addNote() {
		// TODO: save the note + date created/edited
		this.$router.replace("/notes");
	}
}
</script>

<style scoped>
.textarea {
	height: calc(100vh - 180px);
}
</style>
