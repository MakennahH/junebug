<template>
	<div class="notes pb-2">
		<div class="base-header text-center">
			<div>Notes</div>
			<router-link class="header-button" to="/notes/add" replace>
				<b-icon icon="plus" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col">
				<b-list-group v-if="notes.length > 0" class="mx-2">
					<b-list-group-item v-for="(note, key) in notes" :key="key" class="text-left text-truncate" :to="'notes/view/' + key" replace>
						{{ note }}
					</b-list-group-item>
				</b-list-group>
				<b-card v-else class="card-secondary text-center mx-2">
					<b-card-text>You have no notes saved.</b-card-text>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Notes extends Vue {
	private notes = [];
	// ["It was the best of times, it was the worst of times", "According to all known laws of aviation, it is impossible"];
	mounted() {
		// TODO: display notes
	}
}
</script>
