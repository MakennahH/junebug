<template>
	<div class="events pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/events" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Events</div>
			<router-link class="header-button" :to="'/events/edit/' + id" replace>
				<b-icon icon="pencil" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<b-card>
					<h3 :style="{ color: event.color ? event.color.hex + '!important' : '#17a2b8' }">{{ event.title }}</h3>
					<div class="d-flex justify-content-between">
						<div class="font-weight-bold">{{ isWeeklyRecurring ? formattedDays(event) : prettyDate(event.date) }}</div>
						<div class="text-info">{{ prettyTime(event.startTime) }} - {{ prettyTime(event.endTime) }}</div>
					</div>
					<div class="text-secondary">{{ event.location }}</div>
					<div class="font-weight-light mt-2 border rounded px-2 py-1" v-if="isWeeklyRecurring">
						<div class="d-flex align-items-center" :class="{ 'text-secondary': !event.days[0] }">Sunday <b-icon icon="check" v-if="event.days[0]"></b-icon></div>
						<div class="d-flex align-items-center" :class="{ 'text-secondary': !event.days[1] }">Monday <b-icon icon="check" v-if="event.days[1]"></b-icon></div>
						<div class="d-flex align-items-center" :class="{ 'text-secondary': !event.days[2] }">Tuesday <b-icon icon="check" v-if="event.days[2]"></b-icon></div>
						<div class="d-flex align-items-center" :class="{ 'text-secondary': !event.days[3] }">Wednesday <b-icon icon="check" v-if="event.days[3]"></b-icon></div>
						<div class="d-flex align-items-center" :class="{ 'text-secondary': !event.days[4] }">Thursday <b-icon icon="check" v-if="event.days[4]"></b-icon></div>
						<div class="d-flex align-items-center" :class="{ 'text-secondary': !event.days[5] }">Friday <b-icon icon="check" v-if="event.days[5]"></b-icon></div>
						<div class="d-flex align-items-center" :class="{ 'text-secondary': !event.days[6] }">Saturday <b-icon icon="check" v-if="event.days[6]"></b-icon></div>
					</div>
					<div class="pt-2 pr-2" v-if="event.people != ''">
						<span class="font-weight-bold">With: </span>
						<span class="font-weight-light">{{ event.people }}</span>
					</div>
					<div class="pt-2" v-if="event.bring != ''">
						<span class="font-weight-bold">Bring: </span>
						<span class="font-weight-light">{{ event.bring }}</span>
					</div>
					<div class="pt-2" v-if="event.notes != ''">
						{{ event.notes }}
					</div>
					<b-button @click="deleteEvent" variant="danger" class="mt-2"><b-icon-trash></b-icon-trash></b-button>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
@Component({})
export default class ViewEvent extends Vue {
	private id = this.$route.params.id;
	private loading = true;
	private isWeeklyRecurring = false;

	private theseWeekdays = [
		{ text: "Sun", value: "sunday", index: 0 },
		{ text: "Mon", value: "monday", index: 1 },
		{ text: "Tue", value: "tuesday", index: 2 },
		{ text: "Wed", value: "wednesday", index: 3 },
		{ text: "Thu", value: "thursday", index: 4 },
		{ text: "Fri", value: "friday", index: 5 },
		{ text: "Sat", value: "saturday", index: 6 },
	];

	mounted() {
		this.loading = true;
		this.$store.dispatch("getEvents").finally(() => {
			for(const day of this.event.days){
				if(day){
					this.isWeeklyRecurring = true;
				}
			}
			this.loading = false;
		});
	}

	get events() {
		return this.$store.state.scheduling.events;
	}

	get event() {
		return this.events.find((event: any) => {
			return event.id === this.id;
		});
	}

	prettyTime(data: any) {
		return moment(moment(data, "h:mm A")).format("h:mm A");
	}

	prettyDate(data: any) {
		return moment(data).format("ddd, MMM Do 'YY");
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

	deleteEvent() {
		this.$bvModal
			.msgBoxConfirm("Are you sure you want to delete this event?", {
				hideHeader: true,
				centered: true,
				okVariant: "info",
			})
			.then((value) => {
				if (value) {
					try {
						this.$store.dispatch("deleteEvent", { id: this.$route.params.id }).then(() => {
							this.$router.replace("/events");
						});
					} catch (error) {
						this.$bvToast.toast(error.message, {
							title: `Error Occured`,
							variant: "danger",
							solid: true,
						});
					}
				}
				// else do nothing
			});
	}
}
</script>