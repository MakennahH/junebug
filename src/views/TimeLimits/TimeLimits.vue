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
			<div class="col" v-if="!isLoading">
				<b-list-group v-if="timelimits.length > 0" class="mx-2">
					<b-list-group-item v-for="timelimit in timelimits" :key="timelimit.id" :to="'timelimits/view/' + timelimit.id" replace>
						<div class="d-flex justify-content-between">
							<strong>{{ timelimit.title }}</strong>
							<div class="text-info"><b-icon icon="clock-history" class="mr-2"></b-icon>{{ formatHours(timelimit.duration) }}</div>
						</div>
						<div class="text-truncate text-secondary">{{ formattedDays(timelimit) }}</div>
					</b-list-group-item>
				</b-list-group>
				<b-card v-else class="card-secondary text-center mx-2">
					<b-card-text>You have no time limits saved.</b-card-text>
				</b-card>
			</div>
			<b-spinner v-else class="m-auto" variant="info" label="Spinning"></b-spinner>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Timelimits extends Vue {
	private loading = true;
	private theseWeekdays = [
		{ text: "Sun", value: "sunday", index: 0 },
		{ text: "Mon", value: "monday", index: 1 },
		{ text: "Tue", value: "tuesday", index: 2 },
		{ text: "Wed", value: "wednesday", index: 3 },
		{ text: "Thu", value: "thursday", index: 4 },
		{ text: "Fri", value: "friday", index: 5 },
		{ text: "Sat", value: "saturday", index: 6 },
	];

	get isLoading() {
		return this.loading;
	}

	get timelimits() {
		return this.$store.state.scheduling.timelimits;
	}

	formatHours(data: any) {
		return data == 1 ? data + " hr" : data + " hrs";
	}

	formattedDays(timelimit: any) {
		let daysString = "";
		let dayIndex = 0;
		let everyDay = true;
		let weekDays = true;
		let weekEnds = true;
		// check if every day
		for (const day of timelimit.days) {
			if (day == true) {
				daysString += this.theseWeekdays[dayIndex].text + " ";
			} else {
				everyDay = false;
			}
			dayIndex++;
		}
		// check if week days
		if (!timelimit.days[0] && !timelimit.days[6]) {
			for (let i = 1; i < 6; i++) {
				if (!timelimit.days[i]) {
					weekDays = false;
				}
			}
		} else {
			weekDays = false;
		}
		// check if weekends
		if (timelimit.days[0] && timelimit.days[6]) {
			for (let j = 1; j < 6; j++) {
				if (timelimit.days[j]) {
					weekEnds = false;
				}
			}
		} else {
			weekEnds = false;
		}
		return everyDay ? "Every day" : weekDays ? "Week days" : weekEnds ? "Weekends" : daysString;
	}

	mounted() {
		this.loading = true;
		this.$store.dispatch("getTimeLimits").finally(() => (this.loading = false));
	}
}
</script>
