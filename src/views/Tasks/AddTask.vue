<template>
	<div class="add-task pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/tasks" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>{{ isEdit ? "Edit Task" : "Add a Task" }}</div>
		</div>
		<div class="row has-header">
			<form class="col mx-2">
				<b-form-input class="mb-2" placeholder="Title" v-model="title"></b-form-input>
				<b-form-datepicker class="mb-2" placeholder="Due date" v-model="dueDate"></b-form-datepicker>
				<b-form-timepicker class="mb-2" placeholder="Time due" v-model="dueTime" required></b-form-timepicker>
				<div>Color:</div>
				<div class="d-flex justify-content-center my-2"><compact-picker v-model="colors"></compact-picker></div>
				<!-- <div>Estimated time to complete:</div>
				<b-form-spinbutton class="mb-2" :formatter-fn="formatHours" size="sm" v-model="maxHours" wrap min="1" max="24"></b-form-spinbutton> -->
				<!-- <b-form-input class="mb-2" placeholder="Event"></b-form-input> -->
				<!-- <b-form-checkbox v-model="dailyReminder">Remind me daily:</b-form-checkbox>
				<b-form-spinbutton class="mb-2" :formatter-fn="formatDays" size="sm" v-model="maxDays" wrap min="1" max="60"></b-form-spinbutton> -->
				<b-form-textarea v-model="notes" class="textarea mb-2" placeholder="Description" maxRows="8" no-auto-shrink no-resize></b-form-textarea>
				<b-button @click="saveTask" class="btn mt-2" variant="info" block> Save </b-button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { TaskModel } from "@/models/scheduling";
import { Component, Vue } from "vue-property-decorator";
import { Compact } from "vue-color";
@Component({
	components: {
		"compact-picker": Compact,
	},
})
export default class AddTask extends Vue {
	private isEdit = "";
	private task = new TaskModel();

	mounted() {
		this.isEdit = this.$route.params.id;
		if (this.isEdit) {
			this.task = this.tasks.find((task: any) => {
				return task.id === this.$route.params.id;
			});
		}
	}
	get colors() {
		return this.task.color;
	}

	set colors(value) {
		this.task.color = value;
	}

	get tasks() {
		return this.$store.state.scheduling.tasks;
	}

	get title() {
		return this.task.title;
	}

	set title(value) {
		this.task.title = value;
	}

	get dueDate() {
		return this.task.dueDate;
	}

	set dueDate(value) {
		this.task.dueDate = value;
	}

	get dueTime() {
		return this.task.dueTime;
	}

	set dueTime(value) {
		this.task.dueTime = value;
	}

	get dailyReminder() {
		return this.task.dailyReminder;
	}

	set dailyReminder(value) {
		this.task.dailyReminder = value;
	}

	get notes() {
		return this.task.notes;
	}

	set notes(value) {
		this.task.notes = value;
	}

	get maxHours() {
		return this.task.timeEstimate;
	}

	set maxHours(value) {
		this.task.timeEstimate = value;
	}

	formatHours() {
		return this.task.timeEstimate == 1 ? this.task.timeEstimate + " hr" : this.task.timeEstimate + " hrs";
	}

	get maxDays() {
		return this.task.daysInAdvance;
	}

	set maxDays(value) {
		this.task.daysInAdvance = value;
	}

	formatDays() {
		return this.task.daysInAdvance == 1 ? this.task.daysInAdvance + " day in advance" : this.task.daysInAdvance + " days in advance";
	}

	saveTask() {
		if (this.isEdit) {
			try {
				this.$store
					.dispatch("updateTask", {
						id: this.$route.params.id,
						title: this.task.title,
						dueDate: this.task.dueDate,
						dueTime: this.task.dueTime,
						timeEstimate: this.task.timeEstimate,
						dailyReminder: this.task.dailyReminder,
						daysInAdvance: this.task.daysInAdvance,
						notes: this.task.notes,
						color: this.task.color
					})
					.then(() => {
						this.$router.replace("/tasks");
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
					.dispatch("addTask", {
						title: this.task.title,
						dueDate: this.task.dueDate,
						dueTime: this.task.dueTime,
						timeEstimate: this.task.timeEstimate,
						dailyReminder: this.task.dailyReminder,
						daysInAdvance: this.task.daysInAdvance,
						notes: this.task.notes,
						color: this.task.color
					})
					.then(() => {
						this.$router.replace("/tasks");
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
