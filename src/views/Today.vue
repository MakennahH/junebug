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
					<div v-for="(item, index) in dayTimeLine" :key="index">
						<div v-if="prettyHour(index) == '12 AM'" class="d-flex justify-content-between align-items-center pt-2">
							<h3 >{{ tomorrowDayOfWeek }}</h3>
							<h3 class="text-secondary">{{ tomorrow }}</h3>
						</div>
						<b-list-group-item>
							<b-icon :icon="index > 15 ? 'moon' : index > 7 ? 'brightness-alt-high-fill' : 'brightness-high-fill'"></b-icon>
							{{ prettyHour(index) }}
							<div v-for="(itemSub, index2) in item" :key="'itemSub' + index2">
								<div v-if="itemSub.name == 'event'" v-b-toggle="itemSub.id" class="d-flex align-items-center">
									<b-icon-calendar class="mr-2"></b-icon-calendar>
									{{ itemSub.title }}
									<b-icon icon="chevron-down" class="ml-auto"></b-icon>
								</div>
								<b-collapse :id="itemSub.id" v-if="itemSub.name == 'event'">
									<div>
										<span class="font-weight-bold">{{ prettyTime(itemSub.startTime) }}-{{ prettyTime(itemSub.endTime) }}</span>
									</div>
									<div>
										Location: <span class="font-weight-bold">{{ itemSub.location }}</span>
									</div>
									<div>
										With: <span class="font-weight-bold">{{ itemSub.people }}</span>
									</div>
									<div>
										Bring: <span class="font-weight-bold">{{ itemSub.bring }}</span>
									</div>
									<div>{{ itemSub.notes }}</div>
								</b-collapse>
								<div v-if="itemSub.name == 'task'" v-b-toggle="itemSub.id" class="d-flex align-items-center">
									<b-icon-clipboard class="mr-2"></b-icon-clipboard>
									{{ itemSub.title }}
									<b-icon icon="chevron-down" class="ml-auto"></b-icon>
								</div>
								<b-collapse :id="itemSub.id" v-if="itemSub.name == 'task'">
									<div>Due: {{ prettyTime(itemSub.dueTime) }}</div>
									<div>{{ itemSub.notes }}</div>
								</b-collapse>
								<!-- <div v-if="itemSub.name == 'alarm'" v-b-toggle="itemSub.id" class="d-flex align-items-center">
									<b-icon-alarm class="mr-2"></b-icon-alarm>
									<div class="mr-2">{{ prettyTime(itemSub.time) }}</div>
									<div>{{ itemSub.title }}</div>
									<b-icon icon="chevron-down" class="ml-auto" v-if="itemSub.notes"></b-icon>
								</div>
								<b-collapse :id="itemSub.id" v-if="itemSub.name == 'alarm'">
									<div>{{ itemSub.notes }}</div>
								</b-collapse> -->
							</div>
						</b-list-group-item>
					</div>
				</b-list-group>

				<!-- <h3 class="my-2">Upcoming:</h3>
				<b-card class="card-secondary text-center">
					<b-card-text>Nothing coming up! Sit back and relax.</b-card-text>
				</b-card> -->
			</div>
			<b-spinner v-else class="m-auto" variant="info" label="Spinning"></b-spinner>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import { AlarmModel, EventModel, TaskModel } from "@/models/scheduling";
@Component({})
export default class Today extends Vue {
	private loading = true;
	private startTime = {};
	private startOfToday = {};
	private endOfToday = {};
	private dayOfWeek = {};
	private tomorrowDayOfWeek = {};
	private today = {};
	private tomorrow = {};
	private totalHours = 24;
	private dayTimeLine: any[] = [];

	mounted() {
		this.$store.dispatch("getAlarms").then(() => {
			this.$store.dispatch("getEvents").then(() => {
				this.$store.dispatch("getTasks").then(() => {
					this.$store.dispatch("getCurrentUserProfile").then(() => {
						this.loading = false;
						this.startTime = this.$store.state.userProfile.calendarStartHour;
						// this.startTime = moment().get("hour");
						this.startOfToday = moment().startOf("date").add(this.startTime);
						this.endOfToday = moment().endOf("date").add(this.startTime);
						this.dayOfWeek = moment().format("dddd");
						this.tomorrowDayOfWeek = moment().add(1, "days").format("dddd");
						this.today = moment().format("MM/D/YY");
						this.tomorrow = moment().add(1, "days").format("MM/D/YY");
						// this.totalHours = moment(this.endOfToday).add(1, "hours").diff(moment(this.startOfToday), "hours");
						for (let i = 0; i < this.totalHours; i++) {
							this.dayTimeLine.push(i);
							for (const event of this.events) {
								let comparison = i + this.timeToHour(this.startTime);
								if (i + this.timeToHour(this.startTime) > 24) {
									comparison = i + this.timeToHour(this.startTime) - 24;
								}
								if (this.timeToHour(event.startTime) == comparison) {
									event.name = "event";
									if (!this.dayTimeLine[i][0]) {
										this.dayTimeLine[i] = [];
									}
									this.dayTimeLine[i].push(event);
								}
							}
							for (const task of this.tasks) {
								let comparison = i + this.timeToHour(this.startTime);
								if (i + this.timeToHour(this.startTime) > 24) {
									comparison = i + this.timeToHour(this.startTime) - 24;
								}
								if (this.timeToHour(task.dueTime) == comparison) {
									task.name = "task";
									if (!this.dayTimeLine[i][0]) {
										this.dayTimeLine[i] = [];
									}
									this.dayTimeLine[i].push(task);
								}
							}
							// for (const alarm of this.alarms) {
							// 	let comparison = i + this.timeToHour(this.startTime);
							// 	if (i + this.timeToHour(this.startTime) > 24) {
							// 		comparison = i + this.timeToHour(this.startTime) - 24;
							// 	}
							// 	if (this.timeToHour(alarm.time) == comparison) {
							// 		alarm.name = "alarm";
							// 		if (!this.dayTimeLine[i][0]) {
							// 			this.dayTimeLine[i] = [];
							// 		}
							// 		this.dayTimeLine[i].push(alarm);
							// 	}
							// }
						}
					});
				});
			});
		});
	}

	get isLoading() {
		return this.loading;
	}

	// get alarms() {
	// 	return this.$store.state.scheduling.alarms.filter(
	// 		(alarm: any) => (alarm.time >= this.startTime && alarm.days[moment().day()]) || (!alarm.days[moment().day()] && alarm.time < this.startTime && alarm.days[moment().add(1, "days").day()])
	// 	);
	// }

	get events() {
		return this.$store.state.scheduling.events.filter((event: any) => moment(event.date).add(event.startTime) >= this.startOfToday && moment(event.date).add(event.startTime) <= this.endOfToday);
	}

	get tasks() {
		return this.$store.state.scheduling.tasks.filter((task: any) => moment(task.dueDate).add(task.dueTime) >= this.startOfToday && moment(task.dueDate).add(task.dueTime) <= this.endOfToday);
	}

	prettyHour(value: number) {
		return moment(moment(this.startTime, "h A").add(value, "hour")).format("h A");
	}

	prettyTime(time: any) {
		return moment(moment(time, "h:mmA")).format("h:mmA");
	}

	timeToHour(time: any) {
		return moment(time, "h:mm").hour();
	}
}
</script>
