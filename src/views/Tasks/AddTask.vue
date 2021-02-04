<template>
	<div class="add-task pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/tasks" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Add a Task</div>
		</div>
		<div class="row has-header">
			<form class="col mx-2">
				<b-form-input class="mb-2" placeholder="Title"></b-form-input>
				<b-form-datepicker class="mb-2" placeholder="Due date"></b-form-datepicker>
				<div>Estimated time to complete:</div>
				<b-form-spinbutton class="mb-2" :formatter-fn="formatHours" size="sm" v-model="maxHours" wrap min="1" max="24"></b-form-spinbutton>
				<!-- <b-form-input class="mb-2" placeholder="Event"></b-form-input> -->
				<b-form-checkbox>Remind me daily:</b-form-checkbox>
				<b-form-spinbutton class="mb-2" :formatter-fn="formatDays" size="sm" v-model="maxDays" wrap min="1" max="60"></b-form-spinbutton>
				<b-form-textarea class="textarea mb-2" v-model="text" placeholder="Extra notes" maxRows="8" no-auto-shrink no-resize></b-form-textarea>
				<b-button @click="addTask" class="btn mt-2" variant="info" block>
					Save
				</b-button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddTask extends Vue {
	private hours = 1;
	private days = 1;

	get maxHours() {
		return this.hours;
	}

	set maxHours(value) {
		this.hours = value;
	}

	formatHours() {
		return this.hours == 1 ? this.hours + " hr" : this.hours + " hrs";
	}

	get maxDays() {
		return this.days;
	}

	set maxDays(value) {
		this.days = value;
	}

	formatDays() {
		return this.days == 1 ? this.days + " day in advance" : this.days + " days in advance";
	}

	addTask() {
		// TODO: save the Task
		this.$router.replace("/tasks");
	}
}
</script>
