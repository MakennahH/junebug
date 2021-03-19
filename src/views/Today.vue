<template>
	<div class="home pb-2">
		<div class="base-header text-center">
			<div>Home</div>
		</div>
		<div class="row has-header">
			<div class="col mx-2" v-if="!isLoading">
				<div class="d-flex justify-content-between align-items-center">
					<h3>{{ dayOfWeek }}</h3>
					<h3 class="text-secondary">{{ today }}</h3>
					<!-- <b-form-checkbox switch>I took my meds today</b-form-checkbox> -->
				</div>
				<b-list-group class="w-100 text-left">
					<!-- <b-list-group-item> 9:00am <b-icon icon="alarm"></b-icon> wake up</b-list-group-item> -->
					<div v-for="(hour, index) in totalHours" :key="index">
						<b-list-group-item v-b-toggle="'' + index" class="d-flex justify-content-between align-items-center">
							{{ prettyHour(index) }}
							<div v-for="event in events" :key="event.id">
								<div v-if="timeToHour(event.startTime) == index + timeToHour(startTime)">{{ event.title }}</div>
							</div>
							<div v-for="task in tasks" :key="task.id">
								<div v-if="timeToHour(task.dueTime) == index + timeToHour(startTime)">{{ task.title }}</div>
							</div>
							<div v-for="alarm in alarms" :key="alarm.id">
								<div v-if="timeToHour(alarm.time) == index + timeToHour(startTime)">{{ alarm.title }}</div>
							</div>
							<b-icon icon="chevron-down" class="float-right" v-if="false"></b-icon>
						</b-list-group-item>
						<b-collapse :id="'' + index" v-if="false">
							<div class="p-2 bg-info text-light">
								<div>Location: <span class="font-weight-bold">JSC 312</span></div>
								<div>With: <span class="font-weight-bold">Professor Ocean</span></div>
								<div>Bring: <span class="font-weight-bold">Laptop, water bottle, Raspberry Pi</span></div>
								<div>Notes: Dude's like CRAZY tall... like SCARY tall</div>
							</div>
						</b-collapse>
					</div>
					<!-- <b-list-group-item> 11:00am </b-list-group-item>
					<b-list-group-item class="bg-danger text-light">
						12:00pm Doctor's Appt
						<b-icon icon="chevron-down" class="float-right"></b-icon>
					</b-list-group-item>
					<b-list-group-item> 1:00pm </b-list-group-item>
					<b-list-group-item> 2:00pm </b-list-group-item>
					<b-list-group-item class="bg-success text-light">
						3:00pm Go grocery shopping
						<b-icon icon="chevron-down" class="float-right"></b-icon>
					</b-list-group-item>
					<b-list-group-item> 4:00pm <b-icon icon="alarm"></b-icon> feed lizard</b-list-group-item>
					<b-list-group-item> 5:00pm </b-list-group-item>
					<b-list-group-item> 6:00pm </b-list-group-item>
					<b-list-group-item> 7:00pm </b-list-group-item> -->
				</b-list-group>
				<h3 class="my-2">Upcoming:</h3>
				<b-card class="card-secondary text-center">
					<b-card-text>Nothing coming up! Sit back and relax.</b-card-text>
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
export default class Today extends Vue {
	private loading = true;
	private startTime = {};
	private startOfToday = {};
	private endOfToday = {};
	private dayOfWeek = {};
	private today = {};
	private totalHours= 0;

	mounted() {
		this.$store.dispatch("getAlarms").then(() => {
			this.$store.dispatch("getEvents").then(() => {
				this.$store.dispatch("getTasks").then(() => {
					this.$store.dispatch("getCurrentUserProfile").then(() => {
						this.loading = false;
						this.startTime = this.$store.state.userProfile.calendarStartHour;
						this.startOfToday = moment().startOf("date").add(this.startTime);
						this.endOfToday = moment().endOf("date");
						this.dayOfWeek = moment().format("dddd");
						this.today = moment().format("MM/D/YY");
						this.totalHours = moment(this.endOfToday).add(1, 'hours').diff(moment(this.startOfToday), "hours");
					});
				});
			});
		});
	}

	get isLoading() {
		return this.loading;
	}

	get alarms() {
		return this.$store.state.scheduling.alarms.filter((alarm: any) => moment().startOf("date").add(alarm.time) >= this.startOfToday || moment().startOf("date").add(alarm.time) <= this.endOfToday);
	}

	get events() {
		return this.$store.state.scheduling.events.filter((event: any) => moment(event.date).add(event.startTime) >= this.startOfToday && moment(event.date).add(event.endTime) <= this.endOfToday);
	}

	get tasks() {
		return this.$store.state.scheduling.tasks.filter((task: any) => moment(task.dueDate).add(task.dueTime) >= this.startOfToday && moment(task.dueDate).add(task.dueTime) <= this.endOfToday);
	}

	prettyHour(value: number) {
		return moment(moment(this.startTime, "h:mm A").add(value, "hour")).format("h:mm A");
	}

	timeToHour(time: any){
		return moment(time, 'h:mm').hour();
	}
}
</script>
