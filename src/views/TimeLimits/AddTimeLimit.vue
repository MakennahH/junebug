<template>
	<div class="add-timelimit pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/timelimits" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>{{ isEdit ? "Edit Time Limit" : "Add a Time Limit" }}</div>
		</div>
		<div class="row has-header">
			<form class="col mx-2">
				<b-form-input placeholder="Title" v-model="title" class="mb-2"></b-form-input>
				<div>Applies:</div>
				<b-button-group vertical block class="mb-2 w-100">
					<b-button variant="outline-secondary" class="text-left" v-for="weekday in weekdays" :key="weekday.value" :pressed.sync="selected[weekday.index]" block>
						{{ weekday.text }}
						<b-icon v-if="selected[weekday.index]" icon="check" class="float-right" variant="light"></b-icon>
					</b-button>
				</b-button-group>
				<div>Duration:</div>
				<b-form-spinbutton :formatter-fn="formatHours" v-model="maxHours" wrap min="1" max="24"></b-form-spinbutton>
				<b-button @click="saveTimeLimit" class="btn mt-2" variant="info" block> Save </b-button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { TimeLimitModel } from "@/models/scheduling";
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddTimeLimit extends Vue {
	private isEdit = this.$route.params.id;
	private weekdays = [
		{ text: "Sunday", value: "sunday", index: 0 },
		{ text: "Monday", value: "monday", index: 1 },
		{ text: "Tuesday", value: "tuesday", index: 2 },
		{ text: "Wednesday", value: "wednesday", index: 3 },
		{ text: "Thursday", value: "thursday", index: 4 },
		{ text: "Friday", value: "friday", index: 5 },
		{ text: "Saturday", value: "saturday", index: 6 },
	];
	private timelimit = new TimeLimitModel();

	mounted() {
		this.isEdit = this.$route.params.id;
		if (this.isEdit) {
			this.timelimit = this.timelimits.find((timelimit: any) => {
				return timelimit.id === this.$route.params.id;
			});
		}
	}

	get timelimits() {
		return this.$store.state.scheduling.timelimits;
	}

	saveTimeLimit() {
		if (this.isEdit) {
			this.$store
				.dispatch("updateTimeLimit", {
					id: this.$route.params.id,
					title: this.timelimit.title,
					days: this.timelimit.days,
					duration: this.timelimit.duration,
				})
				.then(() => {
					this.$router.replace("/timelimits");
				});
		} else {
			this.$store
				.dispatch("addTimeLimit", {
					title: this.timelimit.title,
					days: this.timelimit.days,
					duration: this.timelimit.duration,
				})
				.then(() => {
					this.$router.replace("/timelimits");
				});
		}
	}

	get selected() {
		return this.timelimit.days;
	}

	set selected(value) {
		this.timelimit.days = value;
	}

	get maxHours() {
		return this.timelimit.duration;
	}

	set maxHours(value) {
		this.timelimit.duration = value;
	}

	get title() {
		return this.timelimit.title;
	}

	set title(value) {
		this.timelimit.title = value;
	}

	formatHours() {
		return this.timelimit.duration == 1 ? this.timelimit.duration + " hr" : this.timelimit.duration + " hrs";
	}
}
</script>
