<template>
	<div class="notes pb-2">
		<div class="base-header text-center">
			<div>Notes</div>
			<router-link class="header-button" to="/notes/add" replace>
				<b-icon icon="plus" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<b-list-group>
					<b-list-group-item class=" text-left">
						This is the start of a note...
					</b-list-group-item>
					<b-list-group-item class=" text-left">
						This is the start of a different note...
					</b-list-group-item>
					<b-list-group-item class=" text-left">
						Milk eggs paper plates 200 lady bugs
					</b-list-group-item>
					<b-list-group-item class=" text-left">
						Dont trust Sarah.
					</b-list-group-item>
				</b-list-group>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Notes extends Vue {
	mounted() {
		// TODO: display notes
	}
}
</script>
