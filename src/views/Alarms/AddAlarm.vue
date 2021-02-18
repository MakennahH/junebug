<template>
	<div class="add-alarm pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/alarms" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>{{ isEdit ? "Edit Alarm" : "Add an Alarm"}}</div>
		</div>
		<div class="row has-header">
			<form class="col mx-2">
				<div>Time:</div>
				<b-form-timepicker class="mb-2" placeholder="Time"></b-form-timepicker>
				<div>Title:</div>
				<b-form-input class="mb-2" placeholder="Title"></b-form-input>
				<div>Notes:</div>
				<b-form-textarea class="textarea mb-2" v-model="text" placeholder="Extra notes" maxRows="8" no-auto-shrink no-resize></b-form-textarea>
				<div>Snooze Interval:</div>
				<b-form-spinbutton class="mb-2" :formatter-fn="formatMinutes" size="sm" v-model="maxMinutes" wrap min="5" max="30"></b-form-spinbutton>
				<div>Applies:</div>
				<b-form-datepicker class="mb-2" placeholder="Calendar date"></b-form-datepicker>
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
					<b-button variant="outline-secondary" class="btn text-left" v-for="weekday in weekdays" :key="weekday.value" :pressed.sync="selected[weekday.index]">
						{{ weekday.text }}
						<b-icon v-if="selected[weekday.index]" icon="check" class="float-right" variant="light"></b-icon>
					</b-button>
				</b-button-group>
				<b-button @click="addAlarm" class="btn" variant="info" block>
					Save
				</b-button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddAlarm extends Vue {
	private isEdit = this.$route.params.id;
	private days: boolean[] = [false, false, false, false, false, false, false];
	private day = false;
	private month = false;
	private year = false;
	private weekdays = [
		{ text: "Sunday", value: "sunday", index: 0 },
		{ text: "Monday", value: "monday", index: 1 },
		{ text: "Tuesday", value: "tuesday", index: 2 },
		{ text: "Wednesday", value: "wednesday", index: 3 },
		{ text: "Thursday", value: "thursday", index: 4 },
		{ text: "Friday", value: "friday", index: 5 },
		{ text: "Saturday", value: "saturday", index: 6 },
	];
	private minutes = 5;

	mounted(){
		// find out if this is supposed to be populated with an object to edit
		// set isEdit to true
		// fill v-models with object values
	}

	addAlarm() {
		// TODO: save the Alarm
		this.$router.replace("/alarms");
	}

	get selected() {
		return this.days;
	}

	set selected(value) {
		this.days = value;
	}

	get daySelected() {
		return this.day;
	}

	set daySelected(value) {
		this.day = value;
	}

	get monthSelected() {
		return this.month;
	}

	set monthSelected(value) {
		this.month = value;
	}

	get yearSelected() {
		return this.year;
	}

	set yearSelected(value) {
		this.year = value;
	}

	formatMinutes() {
		return this.minutes + " minutes";
	}

	get maxMinutes() {
		return this.minutes;
	}

	set maxMinutes(value) {
		this.minutes = value;
	}
}
</script>
