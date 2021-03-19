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
					<b-list-group-item v-for="alarm in alarms" :key="alarm.id" :to="'alarms/view/' + alarm.id" replace>
						<div class="d-flex justify-content-between">
							<strong>{{ alarm.title }}</strong>
							<div class="text-info">{{ prettyTime(alarm.time) }}</div>
						</div>
						<div>{{ formattedDays(alarm) }}</div>
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
import moment from "moment";
@Component({})
export default class Alarms extends Vue {
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

	get alarms() {
		return this.$store.state.scheduling.alarms;
	}

	formattedDays(alarm: any) {
		let daysString = "";
		let dayIndex = 0;
		let everyDay = true;
		let weekDays = true;
		let weekEnds = true;
		// check if every day
		for (const day of alarm.days) {
			if (day == true) {
				daysString += this.theseWeekdays[dayIndex].text + " ";
			} else {
				everyDay = false;
			}
			dayIndex++;
		}
		// check if week days
		if (!alarm.days[0] && !alarm.days[6]) {
			for (var i = 1; i < 6; i++) {
				if (!alarm.days[i]) {
					weekDays = false;
				}
			}
		} else {
			weekDays = false;
		}
		// check if weekends
		if (alarm.days[0] && alarm.days[6]) {
			for (var i = 1; i < 6; i++) {
				if (alarm.days[i]) {
					weekEnds = false;
				}
			}
		} else {
			weekEnds = false;
		}
		return everyDay ? "Every day" : weekDays ? "Week days" : weekEnds ? "Weekends" : daysString;
	}

	prettyTime(alarm: any) {
		return moment(moment(alarm, "h:mm A")).format("h:mm A");
	}

	mounted() {
		this.loading = true;
		this.$store.dispatch("getAlarms").finally(() => (this.loading = false));
	}
}
</script>
