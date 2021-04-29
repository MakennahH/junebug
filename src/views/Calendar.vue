<template>
	<div class="calendar pb-2">
		<div class="base-header text-center">
			<div>Calendar</div>
		</div>
		<div class="row has-header">
			<div class="col mx-2" v-if="!isLoading">
				<h3>{{ month }}</h3>
				<b-card no-body>
					<div class="d-flex text-center my-1">
						<div class="calendar-day" v-for="(dayOfWeek, index) in daysOfWeek" :key="'weekday' + index">{{ dayOfWeek }}</div>
					</div>
					<div class="d-flex justify-content-start flex-wrap">
						<!-- last few days of previous month -->
						<b-card class="calendar-day" v-for="(leadingDay, index) of leadingDays" :key="'prev' + index" :class="weekEnd < 7 && today < 7 ? 'bg-emphasized' : 'bg-depreciated'">
							<div class="small position-absolute date-number">{{ lastMonthNumDays - leadingDays + index + 1 }}</div>
							<div v-for="event in events" :key="event.id">
								<b-icon
									v-if="
										(!isWeeklyRecurring(event) && getDate(event.date) == lastMonthNumDays - index && getMonth() - getMonth(event.date) == 1) ||
										(isWeeklyRecurring(event) && checkDay(event, index, 'past'))
									"
									:style="{ color: event.color ? event.color.hex : '#17a2b8' }"
									@click="scrollTo(event.id)"
									icon="square-fill"
								></b-icon>
							</div>
						</b-card>
						<!-- current month -->
						<b-card
							class="calendar-day"
							v-for="(day, index) in days"
							:key="index"
							:class="{
								'bg-today': today == index + 1,
								'bg-emphasized': (index + 1 >= weekStart && index + 1 <= weekEnd) || (index + 1 >= weekStart && today > weekEnd) || (today < weekStart && index + 1 <= weekEnd),
							}"
						>
							<div class="small position-absolute date-number">{{ index + 1 }}</div>
							<div v-for="event in events" :key="event.id">
								<b-icon
									v-if="
										(!isWeeklyRecurring(event) && getDate(event.date) == index + 1 && getMonth(event.date) == getMonth()) ||
										(isWeeklyRecurring(event) && checkDay(event, index, 'current'))
									"
									:style="{ color: event.color ? event.color.hex : '#17a2b8' }"
									@click="scrollTo(event.id)"
									icon="square-fill"
									>{{ event }}</b-icon
								>
							</div>
						</b-card>
						<!-- first few days of next month -->
						<b-card class="calendar-day" v-for="(trailingDay, index) of trailingDays" :key="'next' + index" :class="weekStart >= 23 && today > 6 ? 'bg-emphasized' : 'bg-depreciated'">
							<div class="small position-absolute date-number">{{ index + 1 }}</div>
							<div v-for="event in events" :key="event.id">
								<b-icon
									v-if="
										(!isWeeklyRecurring(event) && getDate(event.date) == index + 1 && getMonth(event.date) - getMonth() == 1) ||
										(isWeeklyRecurring(event) && checkDay(event, index, 'next'))
									"
									:style="{ color: event.color ? event.color.hex : '#17a2b8' }"
									@click="scrollTo(event.id)"
									icon="square-fill"
								></b-icon>
							</div>
						</b-card>
					</div>
				</b-card>
				<div v-if="todaysEvents.length > 0">
					<h3 class="my-2">Today:</h3>
					<b-card
						class="mt-2"
						v-for="event in todaysEvents"
						:key="event.id"
						:style="{ 'background-color': event.color ? event.color.hex + '!important' : '#17a2b8' }"
						:ref="`ref-${event.id}`"
					>
						<div class="d-flex justify-content-end align-items-center small text-light">
							<router-link class="mr-auto" :to="'events/view/' + event.id" replace>
								<span class="font-weight-bold text-light">{{ event.title }}</span>
							</router-link>
							{{ isWeeklyRecurring(event) ? formattedDays(event) : prettyDate(event.date) }}
							{{ prettyTime(event.startTime) }}-{{ prettyTime(event.endTime) }}
							<b-icon icon="chevron-down" class="ml-2" v-b-toggle="'today-desc' + event.id" v-if="event.location || event.people || event.bring || event.notes"></b-icon>
						</div>
						<b-collapse :id="'today-desc' + event.id">
							<div class="py-2 text-light">
								<div v-if="event.location">
									Location: <span class="font-weight-bold">{{ event.location }}</span>
								</div>
								<div v-if="event.people">
									With: <span class="font-weight-bold">{{ event.people }}</span>
								</div>
								<div v-if="event.bring">
									Bring: <span class="font-weight-bold">{{ event.bring }}</span>
								</div>
								<div v-if="event.notes">Notes: {{ event.notes }}</div>
							</div>
						</b-collapse>
					</b-card>
				</div>
				<h3 class="my-2">Upcoming:</h3>
				<b-card v-if="upcomingEvents.length == 0" class="card-secondary text-center">
					<b-card-text>Nothing coming up! Sit back and relax.</b-card-text>
				</b-card>
				<b-card
					v-else
					class="mt-2"
					:style="{ 'background-color': event.color ? event.color.hex + '!important' : '#17a2b8' }"
					v-for="event in upcomingEvents"
					:key="event.id"
					:ref="`ref-${event.id}`"
				>
					<div class="d-flex justify-content-end align-items-center small text-light">
						<router-link class="text-light mr-auto" :to="'events/view/' + event.id" replace>
							<span class="font-weight-bold">{{ event.title }}</span>
						</router-link>
						{{ isWeeklyRecurring(event) ? formattedDays(event) : prettyDate(event.date) }}
						{{ prettyTime(event.startTime) }}-{{ prettyTime(event.endTime) }}
						<b-icon icon="chevron-down" class="ml-2" v-b-toggle="'desc' + event.id" v-if="event.location || event.people || event.bring || event.notes"></b-icon>
					</div>
					<b-collapse :id="'desc' + event.id">
						<div class="py-2 text-light">
							<div v-if="event.location">
								Location: <span class="font-weight-bold">{{ event.location }}</span>
							</div>
							<div v-if="event.people">
								With: <span class="font-weight-bold">{{ event.people }}</span>
							</div>
							<div v-if="event.bring">
								Bring: <span class="font-weight-bold">{{ event.bring }}</span>
							</div>
							<div v-if="event.notes">Notes: {{ event.notes }}</div>
						</div>
					</b-collapse>
				</b-card>
				<h3 class="m-2 mt-4" v-if="pastEvents.length > 0" v-b-toggle="'showPast'">Past Events <b-icon icon="chevron-down" class="float-right mr-2" v-if="pastEvents.length > 0"></b-icon></h3>
				<b-collapse :id="'showPast'">
					<b-card class="mt-2" :style="{ 'background-color': event.color ? event.color.hex + '!important' : '#17a2b8' }" v-for="event in pastEvents" :key="event.id" :ref="`ref-${event.id}`">
						<div class="d-flex justify-content-end align-items-center small text-light">
							<router-link class="text-light mr-auto" :to="'events/view/' + event.id" replace>
								<span class="font-weight-bold">{{ event.title }}</span>
							</router-link>
							{{ isWeeklyRecurring(event) ? formattedDays(event) : prettyDate(event.date) }}
							{{ prettyTime(event.startTime) }}-{{ prettyTime(event.endTime) }}
							<b-icon icon="chevron-down" class="ml-2" v-b-toggle="'desc' + event.id" v-if="event.location || event.people || event.bring || event.notes"></b-icon>
						</div>
						<b-collapse :id="'desc' + event.id">
							<div class="py-2 text-light">
								<div v-if="event.location">
									Location: <span class="font-weight-bold">{{ event.location }}</span>
								</div>
								<div v-if="event.people">
									With: <span class="font-weight-bold">{{ event.people }}</span>
								</div>
								<div v-if="event.bring">
									Bring: <span class="font-weight-bold">{{ event.bring }}</span>
								</div>
								<div v-if="event.notes">Notes: {{ event.notes }}</div>
							</div>
						</b-collapse>
					</b-card>
				</b-collapse>
			</div>
			<b-spinner v-else class="m-auto" variant="info" label="Spinning"></b-spinner>
		</div>
	</div>
</template>

<script lang="ts">
import moment from "moment";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Calendar extends Vue {
	private loading = true;
	private month = "";
	private daysOfWeek: string[] = [];
	private days = 0;
	private today = 0;
	private leadingDays = 0;
	private trailingDays = 0;
	private lastMonthNumDays = 0;
	private weekStart = 0;
	private weekEnd = 0;
	private theseWeekdays = [
		{ text: "Sun", value: "sunday", index: 0 },
		{ text: "Mon", value: "monday", index: 1 },
		{ text: "Tue", value: "tuesday", index: 2 },
		{ text: "Wed", value: "wednesday", index: 3 },
		{ text: "Thu", value: "thursday", index: 4 },
		{ text: "Fri", value: "friday", index: 5 },
		{ text: "Sat", value: "saturday", index: 6 },
	];

	created() {
		this.month = moment().format("MMMM");
		this.days = moment().daysInMonth();
		this.today = moment().date();
		this.leadingDays = moment().startOf("month").day();
		this.trailingDays = 7 - moment().startOf("month").add(1, "months").day();
		this.lastMonthNumDays = moment().subtract(1, "months").daysInMonth();
		this.weekStart = moment().startOf("week").date();
		this.weekEnd = moment().endOf("week").date();
		for (let i = 0; i < 7; i++) {
			this.daysOfWeek[i] = moment().day(i).format("ddd");
		}
		this.$store.dispatch("getEvents").then(() => {
			this.loading = false;
		});
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

	checkDay(event, index: number, monthType: string) {
		let data;
		switch (monthType){
			case "past":
				index = this.lastMonthNumDays - this.leadingDays + index + 1
				data = moment().subtract(1, "month").date(index);
				break;
			case "current":
				index = index + 1;
				data = moment().date(index);
				break;
			case "next":
				index = index + 1;
				data = moment().add(1, "month").date(index);
				break;
		}
		
		const refinedData = moment(data).day();
		return event.days[refinedData];
	}

	get events() {
		return this.$store.state.scheduling.events;
	}

	get todaysEvents() {
		return this.events.filter(
			(event: any) => (moment(event.date) >= moment().startOf("day") && moment(event.date) <= moment().endOf("day")) || (this.isWeeklyRecurring(event) && event.days[moment().day()])
		);
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

	get isLoading() {
		return this.loading;
	}

	prettyTime(data: any) {
		return moment(moment(data, "h:mmA")).format("hA");
	}

	prettyDate(data: any) {
		return moment(data).format("M/D/YY");
	}

	getDate(value: any) {
		return moment(value).date();
	}

	getMonth(value: any) {
		return moment(value).month();
	}

	scrollTo(value: string) {
		const refName = `ref-${value}`;
		const element = this.$refs[refName] as Element[];
		element[0].scrollIntoView();
	}
}
</script>

<style scoped>
.calendar-day {
	width: 14.2%;
}
.date-number {
	top: 0;
	left: 0;
}
</style>
