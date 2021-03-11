<template>
	<div class="planner pb-2">
		<div class="base-header text-center">
			<div>Planner</div>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<b-list-group>
					<b-list-group-item class="d-flex justify-items-start align-items-center" to="/alarms">
						<div class="text-left">
							<b-icon icon="alarm" scale="1.5" class="mr-2"></b-icon>
							Alarms
						</div>
						<b-icon icon="chevron-right" variant="secondary" class="ml-auto"></b-icon>
					</b-list-group-item>
					<b-list-group-item class="d-flex justify-items-start align-items-center" to="/events">
						<div class="text-left">
							<b-icon icon="calendar" scale="1.5" class="mr-2"></b-icon>
							Events
						</div>
						<b-icon icon="chevron-right" variant="secondary" class="ml-auto"></b-icon>
					</b-list-group-item>
					<b-list-group-item class="d-flex justify-items-start align-items-center" to="/tasks">
						<div class="text-left">
							<b-icon icon="clipboard" scale="1.5" class="mr-2"></b-icon>
							Tasks
						</div>
						<b-icon icon="chevron-right" variant="secondary" class="ml-auto"></b-icon>
					</b-list-group-item>
					<b-list-group-item class="d-flex justify-items-start align-items-center" to="/timelimits">
						<div class="text-left">
							<b-icon icon="clock-history" scale="1.5" class="mr-2"></b-icon>
							Time Limits
						</div>
						<b-icon icon="chevron-right" variant="secondary" class="ml-auto"></b-icon>
					</b-list-group-item>
				</b-list-group>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Planner extends Vue {
	mounted() {
		// TODO: display info
	}
}
</script>
