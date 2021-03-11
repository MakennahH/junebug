<template>
	<div class="add-alarm pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/alarms" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>{{ isEdit ? "Edit Alarm" : "Add an Alarm" }}</div>
		</div>
		<div class="row has-header">
			<form class="col mx-2">
				<div>Time:</div>
				<b-form-timepicker class="mb-2" placeholder="Time" v-model="time" required></b-form-timepicker>
				<div>Label:</div>
				<b-form-input class="mb-2" placeholder="Label" v-model="title" required></b-form-input>
				<div>Notes:</div>
				<b-form-textarea class="textarea mb-2" v-model="notes" placeholder="Extra notes" maxRows="8" no-auto-shrink no-resize></b-form-textarea>
				<div>Snooze Interval:</div>
				<b-form-spinbutton class="mb-2" :formatter-fn="formatMinutes" size="sm" v-model="snoozeInterval" wrap min="1" max="30"></b-form-spinbutton>
				<div>Applies:</div>
				<b-form-datepicker class="mb-2" v-model="date" placeholder="Calendar date"></b-form-datepicker>
				<div>Repeat:</div>
				<b-button-group vertical class="mb-2 w-100">
					<b-button variant="outline-secondary" class="btn text-left" :pressed.sync="daySelected">
						Daily
						<b-icon v-if="daySelected" icon="check" class="float-right" variant="light"></b-icon>
					</b-button>
					<b-button variant="outline-secondary" class="btn text-left" :pressed.sync="monthSelected">
						Monthly
						<b-icon v-if="monthSelected" icon="check" class="float-right" variant="light"></b-icon>
					</b-button>
					<b-button variant="outline-secondary" class="btn text-left" :pressed.sync="yearSelected">
						Yearly
						<b-icon v-if="yearSelected" icon="check" class="float-right" variant="light"></b-icon>
					</b-button>
				</b-button-group>
				<div>Weekly:</div>
				<b-button-group vertical class="mb-2 w-100">
					<b-button variant="outline-secondary" class="btn text-left" v-for="weekday in weekdays" :key="weekday.index" :pressed.sync="selected[weekday.index]">
						{{ weekday.text }}
						<b-icon v-if="selected[weekday.index]" icon="check" class="float-right" variant="light"></b-icon>
					</b-button>
				</b-button-group>
				<b-button @click="saveAlarm" class="btn" variant="info" block> Save </b-button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { AlarmModel } from "@/models/scheduling";
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddAlarm extends Vue {
	private isEdit = "";
	private thisDaySelected = false;
	private theseWeekdays = [
		{ text: "Sunday", value: "sunday", index: 0 },
		{ text: "Monday", value: "monday", index: 1 },
		{ text: "Tuesday", value: "tuesday", index: 2 },
		{ text: "Wednesday", value: "wednesday", index: 3 },
		{ text: "Thursday", value: "thursday", index: 4 },
		{ text: "Friday", value: "friday", index: 5 },
		{ text: "Saturday", value: "saturday", index: 6 },
	];
	private minutes = 5;
	private alarm = new AlarmModel();

	get weekdays(): any {
		return this.theseWeekdays;
	}

	mounted() {
		this.isEdit = this.$route.params.id;
		if (this.isEdit) {
			this.alarm = this.alarms.find((alarm: any) => {
				return alarm.id === this.$route.params.id;
			});
		}
	}

	get alarms() {
		return this.$store.state.scheduling.alarms;
	}

	get selected() {
		return this.alarm.days;
	}

	set selected(value) {
		this.alarm.days = value;
	}

	get daySelected() {
		return this.thisDaySelected;
	}

	set daySelected(value) {
		this.thisDaySelected = value;
	}

	get monthSelected() {
		return this.alarm.recurringMonthly;
	}

	set monthSelected(value) {
		this.alarm.recurringMonthly = value;
	}

	get yearSelected() {
		return this.alarm.recurringYearly;
	}

	set yearSelected(value) {
		this.alarm.recurringYearly = value;
	}

	formatMinutes() {
		return this.minutes + " minutes";
	}

	get snoozeInterval() {
		return this.alarm.snoozeInterval;
	}

	set snoozeInterval(value) {
		this.alarm.snoozeInterval = value;
	}

	get notes() {
		return this.alarm.notes;
	}

	set notes(value) {
		this.alarm.notes = value;
	}

	get title() {
		return this.alarm.title;
	}

	set title(value) {
		this.alarm.title = value;
	}

	get time() {
		return this.alarm.time;
	}

	set time(value) {
		this.alarm.time = value;
	}

	get date() {
		return this.alarm.date;
	}

	set date(value) {
		this.alarm.date = value;
	}

	saveAlarm() {
		if (this.isEdit) {
			this.$store
				.dispatch("updateAlarm", {
					id: this.$route.params.id,
					time: this.alarm.time,
					title: this.alarm.title,
					notes: this.alarm.notes,
					snoozeInterval: this.alarm.snoozeInterval,
					date: this.alarm.date,
					recurringMonthly: this.alarm.recurringMonthly,
					recurringYearly: this.alarm.recurringYearly,
					days: this.alarm.days,
				})
				.then(() => {
					this.$router.replace("/alarms");
				});
		} else {
			this.$store
				.dispatch("addAlarm", {
					time: this.alarm.time,
					title: this.alarm.title,
					notes: this.alarm.notes,
					snoozeInterval: this.alarm.snoozeInterval,
					date: this.alarm.date,
					recurringMonthly: this.alarm.recurringMonthly,
					recurringYearly: this.alarm.recurringYearly,
					days: this.alarm.days,
				})
				.then(() => {
					this.$router.replace("/alarms");
				});
		}
	}
}
</script>
