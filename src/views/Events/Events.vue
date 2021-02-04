<template>
	<div class="events pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/planner" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Events</div>
			<router-link class="header-button-right" to="/events/add" replace>
				<b-icon icon="plus" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<b-card class="card-secondary text-center">
					<b-card-text>You have no events saved.</b-card-text>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Events extends Vue {
	mounted() {
		// TODO: display info
	}
}
</script>
