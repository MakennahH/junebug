<template>
	<div class="add-event pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/events" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>{{ isEdit ? "Edit Event" : "Add an Event" }}</div>
		</div>
		<div class="row has-header">
			<form class="col mx-2">
				<b-form-input class="mb-2" placeholder="Title" v-model="title" required></b-form-input>
				<div class="d-flex">
					<b-form-timepicker class="mb-2" placeholder="Start time" v-model="startTime" required></b-form-timepicker>
					<b-form-timepicker class="mb-2" placeholder="End time" v-model="endTime" required></b-form-timepicker>
				</div>
				<b-form-input class="mb-2" placeholder="Location" v-model="location"></b-form-input>
				<b-form-input class="mb-2" placeholder="With who?" v-model="people"></b-form-input>
				<b-form-input class="mb-2" placeholder="What to bring" v-model="bring"></b-form-input>
				<b-form-textarea class="textarea mb-2" v-model="notes" placeholder="Extra notes" maxRows="8" no-auto-shrink no-resize></b-form-textarea>
				<!-- <b-form-checkbox class="mb-2" v-model="leaveReminder">Remind me when to leave</b-form-checkbox> -->
				
				<div>Color:</div>
				<div class="d-flex justify-content-center mt-2"><compact-picker v-model="colors"></compact-picker></div>
				<div>Applies:</div>
				<b-form-datepicker v-model="date" class="mb-2" placeholder="Calendar date"></b-form-datepicker>
				<b-button variant="outline-secondary" block class="d-flex align-items-center justify-content-between" v-b-toggle.recurring>
					<div>Recurring</div>
					<b-icon icon="chevron-down"></b-icon>
				</b-button>

				<b-collapse id="recurring">
					<b-button-group vertical class="mb-2 w-100">
						<b-button variant="outline-secondary" class="btn text-left" v-model="yearSelected" :pressed.sync="yearSelected">
							Yearly
							<b-icon v-if="yearSelected" icon="check" class="float-right" variant="light"></b-icon>
						</b-button>
						<b-button variant="outline-secondary" class="btn text-left" v-model="monthSelected" :pressed.sync="monthSelected">
							Monthly
							<b-icon v-if="monthSelected" icon="check" class="float-right" variant="light"></b-icon>
						</b-button>
					</b-button-group>
					<div>Weekly:</div>
					<b-button-group vertical class="mb-2 w-100">
						<b-button variant="outline-secondary" class="btn text-left" v-for="weekday in weekdays" :key="weekday.value" :pressed.sync="selected[weekday.index]">
							{{ weekday.text }}
							<b-icon v-if="selected[weekday.index]" icon="check" class="float-right" variant="light"></b-icon>
						</b-button>
					</b-button-group>
				</b-collapse>
				<b-button @click="saveEvent" class="btn mt-2" variant="info" block> Save </b-button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { EventModel } from "@/models/scheduling";
import { Component, Vue } from "vue-property-decorator";
import { Compact } from "vue-color";
@Component({
	components: {
		"compact-picker": Compact,
	},
})
export default class AddEvent extends Vue {
	private isEdit = "";
	private weekdays = [
		{ text: "Sunday", value: "sunday", index: 0 },
		{ text: "Monday", value: "monday", index: 1 },
		{ text: "Tuesday", value: "tuesday", index: 2 },
		{ text: "Wednesday", value: "wednesday", index: 3 },
		{ text: "Thursday", value: "thursday", index: 4 },
		{ text: "Friday", value: "friday", index: 5 },
		{ text: "Saturday", value: "saturday", index: 6 },
	];
	private event = new EventModel();

	get colors() {
		return this.event.color;
	}

	set colors(value) {
		this.event.color = value;
	}

	mounted() {
		this.isEdit = this.$route.params.id;
		if (this.isEdit) {
			this.event = this.events.find((event: any) => {
				return event.id === this.$route.params.id;
			});
		}
	}

	get events() {
		return this.$store.state.scheduling.events;
	}

	get selected() {
		return this.event.days;
	}

	set selected(value) {
		this.event.days = value;
	}

	get monthSelected() {
		return this.event.recurringMonthly;
	}

	set monthSelected(value) {
		this.event.recurringMonthly = value;
	}

	get yearSelected() {
		return this.event.recurringYearly;
	}

	set yearSelected(value) {
		this.event.recurringYearly = value;
	}

	get title() {
		return this.event.title;
	}

	set title(value) {
		this.event.title = value;
	}

	get startTime() {
		return this.event.startTime;
	}

	set startTime(value) {
		this.event.startTime = value;
	}

	get endTime() {
		return this.event.endTime;
	}

	set endTime(value) {
		this.event.endTime = value;
	}

	get people() {
		return this.event.people;
	}

	set people(value) {
		this.event.people = value;
	}

	get location() {
		return this.event.location;
	}

	set location(value) {
		this.event.location = value;
	}

	get bring() {
		return this.event.bring;
	}

	set bring(value) {
		this.event.bring = value;
	}

	get notes() {
		return this.event.notes;
	}

	set notes(value) {
		this.event.notes = value;
	}

	get leaveReminder() {
		return this.event.leaveReminder;
	}

	set leaveReminder(value) {
		this.event.leaveReminder = value;
	}

	get date() {
		return this.event.date;
	}

	set date(value) {
		this.event.date = value;
	}

	saveEvent() {
		if (this.isEdit) {
			try {
				this.$store
					.dispatch("updateEvent", {
						id: this.$route.params.id,
						title: this.event.title,
						startTime: this.event.startTime,
						endTime: this.event.endTime,
						date: this.event.date,
						people: this.event.people,
						location: this.event.location,
						bring: this.event.bring,
						notes: this.event.notes,
						leaveReminder: this.event.leaveReminder,
						recurringMonthly: this.event.recurringMonthly,
						recurringYearly: this.event.recurringYearly,
						days: this.event.days,
						color: this.event.color,
					})
					.then(() => {
						this.$router.replace("/events");
					});
			} catch (error) {
				this.$bvToast.toast(error.message, {
					title: `Error Occured`,
					variant: "danger",
					solid: true,
				});
			}
		} else {
			try {
				this.$store
					.dispatch("addEvent", {
						title: this.event.title,
						startTime: this.event.startTime,
						endTime: this.event.endTime,
						date: this.event.date,
						people: this.event.people,
						location: this.event.location,
						bring: this.event.bring,
						notes: this.event.notes,
						leaveReminder: this.event.leaveReminder,
						recurringMonthly: this.event.recurringMonthly,
						recurringYearly: this.event.recurringYearly,
						days: this.event.days,
						color: this.event.color,
					})
					.then(() => {
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
	}
}
</script>

<style scoped>
.textarea {
	overflow: auto;
}
</style>
