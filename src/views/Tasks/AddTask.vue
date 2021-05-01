<template>
	<div class="add-task pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/tasks" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>{{ isEdit ? "Edit Task" : "Add a Task" }}</div>
		</div>
		<div class="row has-header">
			<b-form class="col mx-2" @submit.prevent="saveTask">
				<b-form-input class="mb-2" placeholder="Title" :disabled="isSubmitting" v-model="title" required></b-form-input>
				<b-form-datepicker class="mb-2" placeholder="Due date" :disabled="isSubmitting" v-model="dueDate" required></b-form-datepicker>
				<b-form-timepicker class="mb-2" placeholder="Time due" :disabled="isSubmitting" v-model="dueTime" required></b-form-timepicker>
				<div>Color:</div>
				<div class="d-flex justify-content-center my-2"><compact-picker v-model="colors"></compact-picker></div>
				<!-- <div>Estimated time to complete:</div>
				<b-form-spinbutton class="mb-2" :formatter-fn="formatHours" size="sm" v-model="maxHours" wrap min="1" max="24"></b-form-spinbutton> -->
				<!-- <b-form-input class="mb-2" placeholder="Event"></b-form-input> -->
				<!-- <b-form-checkbox v-model="dailyReminder">Remind me daily:</b-form-checkbox>
				<b-form-spinbutton class="mb-2" :formatter-fn="formatDays" size="sm" v-model="maxDays" wrap min="1" max="60"></b-form-spinbutton> -->
				<b-form-textarea v-model="notes" :disabled="isSubmitting" class="textarea mb-2" placeholder="Description" maxRows="8" no-auto-shrink no-resize></b-form-textarea>
				<b-button type="submit" :disabled="isSubmitting" class="btn mt-2" variant="info" block> Save </b-button>
			</b-form>
		</div>
	</div>
</template>

<script lang="ts">
import { TaskModel } from "@/models/scheduling";
import { Component, Vue } from "vue-property-decorator";
import { Compact } from "vue-color";
import moment from "moment";
@Component({
	components: {
		"compact-picker": Compact,
	},
})
export default class AddTask extends Vue {
	private isEdit = "";
	private task = new TaskModel();
	private submitting = false;

	mounted() {
		this.isEdit = this.$route.params.id;
		if (this.isEdit) {
			this.task = this.tasks.find((task: any) => {
				return task.id === this.$route.params.id;
			});
		}
	}

	get isSubmitting() {
		return this.submitting;
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

	get notes() {
		return this.task.notes;
	}

	set notes(value) {
		this.task.notes = value;
	}

	saveTask() {
		this.submitting = true;
		if (this.isEdit) {
			try {
				this.$store
					.dispatch("updateTask", {
						id: this.$route.params.id,
						title: this.task.title,
						dueDate: this.task.dueDate,
						dueTime: this.task.dueTime,
						notes: this.task.notes,
						completed: this.task.completed,
						color: this.task.color,
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
				this.submitting = false;
			}
		} else {
			try {

				this.$store
					.dispatch("addTask", {
						title: this.task.title,
						dueDate: this.task.dueDate,
						dueTime: this.task.dueTime,
						completed: false,
						notes: this.task.notes,
						color: this.task.color,
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
				this.submitting = false;
			}
		}
	}
}
</script>
