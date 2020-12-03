<template>
	<div class="add-event pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/events" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Add an Event</div>
		</div>
		<div class="row has-header">
			<form class="col mx-2">
				<b-form-input class="mb-2" placeholder="Title"></b-form-input>
				<div class="d-flex">
					<b-form-timepicker class="mb-2" placeholder="Start time"></b-form-timepicker>
					<b-form-timepicker class="mb-2" placeholder="End time"></b-form-timepicker>
				</div>
				<b-form-input class="mb-2" placeholder="With who?"></b-form-input>
				<b-form-input class="mb-2" placeholder="Location"></b-form-input>
				<b-form-input class="mb-2" placeholder="What to bring"></b-form-input>
				<b-form-textarea class="textarea mb-2" v-model="text" placeholder="Extra notes" maxRows="8" no-auto-shrink no-resize></b-form-textarea>
				<b-form-checkbox class="mb-2">Remind me when to leave</b-form-checkbox>
				<div>Applies:</div>
				<b-form-datepicker class="mb-2" placeholder="Calendar date"></b-form-datepicker>
				<b-button block class="d-flex align-items-center justify-content-between" v-b-toggle.recurring>
					<div>Recurring</div>
					<b-icon icon="chevron-down"></b-icon>
				</b-button>
				<b-collapse id="recurring">
					<b-button-group vertical class="mb-2 w-100">
						<b-button class="btn text-left" :pressed.sync="yearSelected">
							Yearly
							<b-icon v-if="yearSelected" icon="check" class="float-right" variant="light"></b-icon>
						</b-button>
						<b-button class="btn text-left" :pressed.sync="monthSelected">
							Monthly
							<b-icon v-if="monthSelected" icon="check" class="float-right" variant="light"></b-icon>
						</b-button>
					</b-button-group>
					<div>Weekly:</div>
					<b-button-group vertical class="mb-2 w-100">
						<b-button class="btn text-left" v-for="weekday in weekdays" :key="weekday.value" :pressed.sync="selected[weekday.index]">
							{{ weekday.text }}
							<b-icon v-if="selected[weekday.index]" icon="check" class="float-right" variant="light"></b-icon>
						</b-button>
					</b-button-group>
				</b-collapse>
				<b-button @click="addEvent" class="btn mt-2" variant="info" block>
					Save
				</b-button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddEvent extends Vue {
	private days: boolean[] = [false, false, false, false, false, false, false];
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

	get selected() {
		return this.days;
	}

	set selected(value) {
		this.days = value;
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

	addEvent() {
		// TODO: save the Event
		this.$router.replace("/events");
	}
}
</script>

<style scoped>
.textarea {
	overflow: auto;
}
</style>
