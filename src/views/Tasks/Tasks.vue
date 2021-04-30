<template>
	<div class="tasks pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/planner" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Tasks</div>
			<router-link class="header-button-right" to="/tasks/add" replace>
				<b-icon icon="plus" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col" v-if="!isLoading">
				<h3 class="m-2">Upcoming</h3>
				<b-list-group v-if="incompletedTasks.length > 0" class="mx-2">
					<!-- closest deadlines bubble to the top, within 12 hours timestamp is blue, overdue timestamp is red -->
					<b-list-group-item v-for="task in incompletedTasks" :key="task.id" :to="'tasks/view/' + task.id" replace>
						<div class="d-flex justify-content-between">
							<strong :style="{ color: task.color ? task.color.hex + '!important' : '#17a2b8' }">{{ task.title }}</strong>
							<div :class="{ 'text-danger': prettyDate(task.dueDate, task.dueTime).isOverDue, 'text-info': prettyDate(task.dueDate, task.dueTime).isDueSoon }">
								{{ prettyDate(task.dueDate, task.dueTime).date }} {{ prettyTime(task.dueTime) }}
							</div>
						</div>
						<div class="text-truncate">{{ task.notes }}</div>
					</b-list-group-item>
				</b-list-group>
				<b-card v-else class="card-secondary text-center mx-2">
					<b-card-text>Nothing coming up! Sit back and relax.</b-card-text>
				</b-card>
				<h3 class="m-2 mt-4" v-if="completedTasks.length > 0" v-b-toggle="'showPast'">
					Completed Tasks <b-icon icon="chevron-down" class="float-right mr-2" v-if="completedTasks.length > 0"></b-icon>
				</h3>
				<b-collapse :id="'showPast'">
					<b-list-group class="mx-2">
						<b-list-group-item v-for="task in completedTasks" :key="task.id" :to="'tasks/view/' + task.id" class="bg-depreciated" replace>
							<div class="d-flex justify-content-between">
								<strong :style="{ color: task.color ? task.color.hex + '!important' : '#17a2b8' }">{{ task.title }}</strong>
								<div class="text-secondary">{{ prettyDate(task.dueDate, task.dueTime).date }} {{ prettyTime(task.dueTime) }}</div>
							</div>
							<div class="text-truncate text-secondary">{{ task.notes }}</div>
						</b-list-group-item>
					</b-list-group>
				</b-collapse>
				<b-card v-if="tasks.length == 0" class="card-secondary text-center mx-2">
					<b-card-text>You have no tasks saved.</b-card-text>
				</b-card>
			</div>
			<b-spinner v-else class="m-auto" variant="info" label="Spinning"></b-spinner>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
@Component({})
export default class Tasks extends Vue {
	private loading = true;

	get isLoading() {
		return this.loading;
	}

	get tasks() {
		return this.$store.state.scheduling.tasks;
	}

	get incompletedTasks() {
		return this.tasks.filter((task: any) => !task.completed);
	}

	get completedTasks() {
		return this.tasks.filter((task: any) => task.completed);
	}

	prettyTime(time: any) {
		return moment(time, "h:mmA").format("h:mmA");
	}

	prettyDate(date: any, time: any) {
		let isOverDue = false;
		let isDueSoon = false;

		if (moment(date).add(time) < moment()) {
			isOverDue = true;
		} else if (
			moment(date)
				.add(time)
				.diff(moment()) < 43200000
		) {
			// roughly 12 hours
			isDueSoon = true;
		}
		return { date: moment(date).format("M/D/YY"), isOverDue: isOverDue, isDueSoon: isDueSoon };
	}

	mounted() {
		this.loading = true;
		this.$store.dispatch("getTasks").finally(() => (this.loading = false));
	}
}
</script>
