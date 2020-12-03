<template>
	<div class="add-timelimit pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/timelimits" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Add a TimeLimit</div>
		</div>
		<div class="row has-header">
			<form class="col mx-2">
				<b-form-input placeholder="Title" class="mb-2"></b-form-input>
				<div>Applies:</div>
				<b-button-group vertical block class="mb-2 w-100">
					<b-button class="text-left" v-for="weekday in weekdays" :key="weekday.value" :pressed.sync="selected[weekday.index]" block>
						{{ weekday.text }}
						<b-icon v-if="selected[weekday.index]" icon="check" class="float-right" variant="light"></b-icon>
					</b-button>
				</b-button-group>
				<div>Duration:</div>
				<b-form-spinbutton :formatter-fn="formatHours" v-model="maxHours" wrap min="1" max="24"></b-form-spinbutton>
				<b-button @click="addTimeLimit" class="btn btn-info mt-2" block>
					Save
				</b-button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddTimeLimit extends Vue {
	private days: boolean[] = [false, false, false, false, false, false, false];
	private weekdays = [
		{ text: "Sunday", value: "sunday", index: 0 },
		{ text: "Monday", value: "monday", index: 1 },
		{ text: "Tuesday", value: "tuesday", index: 2 },
		{ text: "Wednesday", value: "wednesday", index: 3 },
		{ text: "Thursday", value: "thursday", index: 4 },
		{ text: "Friday", value: "friday", index: 5 },
		{ text: "Saturday", value: "saturday", index: 6 },
	];
	private hours = 1;

	addTimeLimit() {
		// TODO: save the TimeLimit
		this.$router.replace("/timelimits");
	}

	get selected() {
		return this.days;
	}

	set selected(value) {
		this.days = value;
	}

	get maxHours() {
		return this.hours;
	}

	set maxHours(value) {
		this.hours = value;
	}

	formatHours() {
		return this.hours == 1 ? this.hours + " hr" : this.hours + " hrs";
	}
}
</script>
