<template>
	<div class="tasks pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/tasks" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Tasks</div>
			<router-link class="header-button" :to="'/tasks/edit/' + id" replace>
				<b-icon icon="pencil" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<b-card>
					<h3>{{ task.title }}</h3>
					<div class="d-flex justify-content-between">
						<div class="text-secondary" :class="{ 'text-danger': isOverdue }">{{ this.isOverDue ? toNow() : fromNow() }}</div>
						<div class="text-info">{{ prettyTime() }} {{ prettyDate() }}</div>
					</div>
					<div class="pt-2">
						{{ task.notes }}
					</div>
					<b-button @click="deleteTask" variant="danger" class="float-right mt-2"><b-icon-trash></b-icon-trash></b-button>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
@Component({})
export default class ViewTask extends Vue {
	private id = this.$route.params.id;
	private isOverdue = false;
	private loading = true;

	mounted() {
		this.loading = true;
		this.$store.dispatch("getTasks").finally(() => {
			this.loading = false;
			if (moment(this.task.dueDate).add(this.task.dueTime) < moment()) {
				this.isOverdue = true;
			}
		});
	}

	get tasks() {
		return this.$store.state.scheduling.tasks;
	}

	get task() {
		return this.tasks.find((task: any) => {
			return task.id === this.id;
		});
	}

	toNow() {
		return (moment(this.task.dueDate).add(this.task.dueTime)).toNow();
	}

	fromNow() {
		return (moment(this.task.dueDate).add(this.task.dueTime)).fromNow();
	}

	prettyTime() {
		return moment(moment(this.task.dueTime, "h:mmA")).format("h:mmA");
	}

	prettyDate(data: any) {
		return moment(this.task.dueDate).format("dddd M/D/YY");
	}

	deleteTask() {
		this.$store.dispatch("deleteTask", { id: this.$route.params.id }).then(() => {
			this.$router.replace("/tasks");
		});
	}
}
</script>
