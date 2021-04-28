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
			<div class="col" v-if="!isLoading">
				<h3 class="m-2">Upcoming</h3>
				<b-list-group v-if="upcomingEvents.length > 0" class="mx-2">
					<b-list-group-item v-for="event in upcomingEvents" :key="event.id" :to="'events/view/' + event.id" replace>
						<div class="d-flex justify-content-between">
							<strong :style="{ color: event.color ? event.color.hex + '!important' : '#17a2b8' }">{{ event.title }}</strong>
							<div class="font-weight-light">
								{{ isWeeklyRecurring(event)? formattedDays(event) : prettyDate(event.date) }} <span class="small text-info">{{ prettyTime(event.startTime) }}-{{ prettyTime(event.endTime) }}</span>
							</div>
						</div>
						<div class="text-secondary">{{ event.location }}</div>
						<div>{{ event.whatToBring }}</div>
						
					</b-list-group-item>
				</b-list-group>
				<b-card v-else class="card-secondary text-center mx-2">
					<b-card-text>Nothing coming up! Sit back and relax.</b-card-text>
				</b-card>
				<h3 class="m-2 mt-4" v-if="pastEvents.length > 0" v-b-toggle="'showPast'">Past Events <b-icon icon="chevron-down" class="float-right mr-2" v-if="pastEvents.length > 0"></b-icon></h3>
				<b-collapse :id="'showPast'">
					<b-list-group class="mx-2">
						<b-list-group-item v-for="event in pastEvents.reverse()" :key="event.id" :to="'events/view/' + event.id" class="bg-depreciated" replace>
							<div class="d-flex justify-content-between">
								<strong :style="{ color: event.color ? event.color.hex + '!important' : '#17a2b8' }">{{ event.title }}</strong>
								<div class="font-weight-light text-secondary">
									{{ isWeeklyRecurring(event)? formattedDays(event) : prettyDate(event.date) }} <span class="small text-info">{{ prettyTime(event.startTime) }}-{{ prettyTime(event.endTime) }}</span>
								</div>
							</div>
							<div class="text-secondary">{{ event.location }}</div>
							<div class="text-secondary">{{ event.whatToBring }}</div>
						</b-list-group-item>
					</b-list-group>
				</b-collapse>
				<b-card v-if="events.length == 0" class="card-secondary text-center mx-2">
					<b-card-text>You have no events saved.</b-card-text>
				</b-card>
			</div>
			<b-spinner v-else class="m-auto" variant="info" label="Spinning"></b-spinner>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";

@Component({})
export default class Events extends Vue {
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

	get events() {
		return this.$store.state.scheduling.events;
	}

	get pastEvents() {
		return this.events.filter((event: any) => moment(event.date) < moment() && !this.isWeeklyRecurring(event));
	}

	get upcomingEvents() {
		return this.events.filter((event: any) => moment(event.date) >= moment() || this.isWeeklyRecurring(event));
	}

	isWeeklyRecurring(event: any) {
		for (const day of event.days) {
			if (day) {
				return true;
			}
		}
		return false;
	}

	formattedDays(event: any) {
		let daysString = "";
		let dayIndex = 0;
		let everyDay = true;
		let weekDays = true;
		let weekEnds = true;
		// check if every day
		for (const day of event.days) {
			if (day == true) {
				daysString += this.theseWeekdays[dayIndex].text + " ";
			} else {
				everyDay = false;
			}
			dayIndex++;
		}
		// check if week days
		if (!event.days[0] && !event.days[6]) {
			for (let i = 1; i < 6; i++) {
				if (!event.days[i]) {
					weekDays = false;
				}
			}
		} else {
			weekDays = false;
		}
		// check if weekends
		if (event.days[0] && event.days[6]) {
			for (let j = 1; j < 6; j++) {
				if (event.days[j]) {
					weekEnds = false;
				}
			}
		} else {
			weekEnds = false;
		}
		return everyDay ? "Every day" : weekDays ? "Weekdays" : weekEnds ? "Weekends" : daysString;
	}

	prettyTime(data: any) {
		return moment(moment(data, "h:mmA")).format("hA");
	}

	prettyDate(data: any) {
		return moment(data).format("M/D/YY");
	}

	mounted() {
		this.loading = true;
		this.$store.dispatch("getEvents").finally(() => (this.loading = false));
	}
}
</script>
