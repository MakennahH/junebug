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
				<div>Time estimate</div>
				<b-form-spinbutton class="mb-2" :formatter-fn="formatHours" size="sm" v-model="maxHours" wrap min="1" max="24"></b-form-spinbutton>
				<b-form-checkbox class="mb-2">Tied to an event</b-form-checkbox>
				<b-form-textarea class="textarea mb-2" v-model="text" placeholder="Extra notes" maxRows="8" no-auto-shrink no-resize></b-form-textarea>
				<b-button @click="addTask" class="btn btn-info mt-2" block>
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

	get maxHours() {
		return this.hours;
	}

	set maxHours(value) {
		this.hours = value;
	}

	formatHours() {
		return this.hours == 1 ? this.hours + " hr" : this.hours + " hrs";
	}

	addTask() {
		// TODO: save the Task
		this.$router.replace("/tasks");
	}
}
</script>
