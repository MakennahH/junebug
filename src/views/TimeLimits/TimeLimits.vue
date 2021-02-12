<template>
	<div class="timelimits pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/planner" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Time Limits</div>
			<router-link class="header-button-right" to="/timelimits/add" replace>
				<b-icon icon="plus" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col">
				<b-list-group v-if="timeLimits.length > 0" class="mx-2">
					<b-list-group-item v-for="(timelimit, key) in timeLimits" :key="key" :to="'timelimits/view/' + key" replace>
						<div class="d-flex justify-content-between">
							<strong>{{ timelimit.title }}</strong>
							<div class="text-info">{{ timelimit.duration }}</div>
						</div>
						<div class="text-truncate">{{ timelimit.days }}</div>
					</b-list-group-item>
				</b-list-group>
				<b-card v-else class="card-secondary text-center mx-2">
					<b-card-text>You have no time limits saved.</b-card-text>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Timelimits extends Vue {
	private timeLimits = [
		{
			title: "Test",
			duration: "2 hours",
			days: "Mon Tue Wed Thu Fri"
		}
	];
	mounted() {
		// TODO: display info
	}
}
</script>
