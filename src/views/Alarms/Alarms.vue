<template>
	<div class="alarms pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/planner" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Alarms</div>
			<router-link class="header-button-right" to="/alarms/add" replace>
				<b-icon icon="plus" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col">
				<b-list-group v-if="alarms.length > 0" class="mx-2">
					<b-list-group-item v-for="(alarm, key) in alarms" :key="key" :to="'alarms/view/' + key" replace>
						<div class="d-flex justify-content-between">
							<strong>{{ alarm.title }}</strong>
							<div class="text-info">{{ alarm.time }}</div>
						</div>
						<div>{{ alarm.days }}</div>
					</b-list-group-item>
				</b-list-group>
				<b-card v-else class="card-secondary text-center mx-2">
					<b-card-text>You have no alarms saved.</b-card-text>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Alarms extends Vue {
	private alarms = [];
	mounted() {
		// TODO: display info
	}
}
</script>
