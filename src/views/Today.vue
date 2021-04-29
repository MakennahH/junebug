<template>
	<div class="home pb-2">
		<div class="base-header text-center d-flex justify-content-between" @click="scrollTo(startTime)">
			<div :class="isLoading ? 'w-33' : ''">
				<div v-if="!isLoading" class="text-light">{{ dayOfWeek }}</div>
				<b-skeleton v-else></b-skeleton>
			</div>
			<div>Home</div>
			<div :class="isLoading ? 'w-33' : ''">
				<div v-if="!isLoading" class="text-light">{{ today }}</div>
				<b-skeleton v-else></b-skeleton>
			</div>
		</div>
		<div class="row has-header">
			<div class="col mx-2" v-if="!isLoading">
				<div class="d-flex justify-content-between align-items-center">
					<!-- <b-form-checkbox switch>I took my meds today</b-form-checkbox> -->
				</div>
				<b-list-group class="w-100 text-left">
					<div v-for="(item, index) in dayTimeLine" :key="index">
						<b-list-group-item :ref="`ref-${index}`">
							<b-icon
								:icon="index < 5 || index > 20 ? 'moon' : (index <= 8 && index >= 5) || (index <= 20 && index >= 17) ? 'brightness-alt-high-fill' : 'brightness-high-fill'"
							></b-icon>
							{{ prettyHour(index) }}
							<div v-for="(itemSub, index2) in item" :key="'itemSub' + index2">
								<div v-if="itemSub.name == 'event' && itemSub.isDuplicate" class="d-flex align-items-center">
									<b-icon-calendar class="mr-2" :style="{ color: itemSub.color ? itemSub.color.hex + '!important' : '#17a2b8' }"></b-icon-calendar>
									{{ itemSub.title }}
								</div>
								<div v-if="itemSub.name == 'event' && !itemSub.isDuplicate" v-b-toggle="itemSub.id" class="d-flex align-items-center">
									<b-icon-calendar class="mr-2" :style="{ color: itemSub.color ? itemSub.color.hex + '!important' : '#17a2b8' }"></b-icon-calendar>
									{{ prettyTime(itemSub.startTime) }} {{ itemSub.title }}
									<b-icon icon="chevron-down" class="ml-auto"></b-icon>
								</div>
								<b-collapse :id="itemSub.id" v-if="itemSub.name == 'event'">
									<div>
										<span class="font-weight-bold">{{ prettyTime(itemSub.startTime) }}-{{ prettyTime(itemSub.endTime) }}</span>
									</div>
									<div v-if="itemSub.location">
										Location: <span class="font-weight-bold">{{ itemSub.location }}</span>
									</div>
									<div v-if="itemSub.people">
										With: <span class="font-weight-bold">{{ itemSub.people }}</span>
									</div>
									<div v-if="itemSub.bring">
										Bring: <span class="font-weight-bold">{{ itemSub.bring }}</span>
									</div>
									<div v-if="itemSub.notes">{{ itemSub.notes }}</div>
								</b-collapse>
								<div v-if="itemSub.name == 'task'" v-b-toggle="itemSub.id" class="d-flex align-items-center">
									<b-icon-clipboard class="mr-2" :style="{ color: itemSub.color ? itemSub.color.hex + '!important' : '#17a2b8' }"></b-icon-clipboard>
									{{ itemSub.title }}
									<b-icon icon="chevron-down" class="ml-auto"></b-icon>
								</div>
								<b-collapse :id="itemSub.id" v-if="itemSub.name == 'task'">
									<div>Due: {{ prettyTime(itemSub.dueTime) }}</div>
									<div v-if="itemSub.notes">{{ itemSub.notes }}</div>
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
	private startOfToday = {};
	private endOfToday = {};
	private dayOfWeek = {};
	private tomorrowDayOfWeek = {};
	private today = {};
	private tomorrow = {};
	private totalHours = 24;
	private dayTimeLine: any[] = [];
	private startTime = 0;

	mounted() {
		this.$store.dispatch("getAlarms").then(() => {
			this.$store.dispatch("getEvents").then(() => {
				this.$store.dispatch("getTasks").then(() => {
					this.$store.dispatch("getCurrentUserProfile").then(() => {
						this.startOfToday = moment().startOf("date");
						this.endOfToday = moment().endOf("date");
						this.dayOfWeek = moment().format("dddd");
						this.tomorrowDayOfWeek = moment().add(1, "days").format("dddd");
						this.today = moment().format("MM/D/YY");
						this.tomorrow = moment().add(1, "days").format("MM/D/YY");
						this.startTime = this.timeToInt(this.$store.state.userProfile.calendarStartHour) - 1;
						for (let i = 0; i < this.totalHours; i++) {
							this.dayTimeLine.push(i);
							for (const task of this.tasks) {
								if (this.timeToInt(task.dueTime) == i) {
									task.name = "task";
									if (!this.dayTimeLine[i][0]) {
										this.dayTimeLine[i] = [];
									}
									this.dayTimeLine[i].push(task);
								}
							}
							for (const event of this.events) {
								const comparison = this.intToTime(i);
								if (this.timeToInt(event.startTime) == i) {
									event.name = "event";
									event.isDuplicate = false;
									if (!this.dayTimeLine[i][0]) {
										this.dayTimeLine[i] = [];
									}
									this.dayTimeLine[i].push(event);
								} else if (i != 0 && this.timeToInt(event.startTime) <= i - 1 && event.endTime > comparison) {
									event.name = "event";
									const duplicate = Object.assign({}, event);
									duplicate.isDuplicate = true;
									duplicate.id = null;
									if (!this.dayTimeLine[i][0]) {
										this.dayTimeLine[i] = [];
									}
									this.dayTimeLine[i].push(duplicate);
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
						this.loading = false;
					});
				});
			});
		});
	}

	updated() {
		this.scrollTo(this.startTime);
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
		return this.$store.state.scheduling.events.filter(
			(event: any) => (moment(event.date).add(event.startTime) >= this.startOfToday && moment(event.date).add(event.startTime) <= this.endOfToday) || event.days[moment().day()]
		);
	}

	get tasks() {
		return this.$store.state.scheduling.tasks.filter((task: any) => moment(task.dueDate).add(task.dueTime) >= this.startOfToday && moment(task.dueDate).add(task.dueTime) <= this.endOfToday);
	}

	prettyHour(value: number) {
		return moment(moment(value, "hour")).format("h A");
	}

	prettyTime(time: any) {
		return moment(moment(time, "h:mmA")).format("h:mmA");
	}

	timeToInt(time: any) {
		return moment(time, "h:mmA").hour();
	}

	intToTime(int: number) {
		return moment().hour(int).minute(0).format("H:mm:ss");
	}

	scrollTo(value: any) {
		const refName = `ref-${value}`;
		const element = this.$refs[refName] as Element[];
		element[0].scrollIntoView();
	}
}
</script>
