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
			<div class="col">
				<b-list-group v-if="tasks.length > 0" class="mx-2">
					<!-- closest deadlines bubble to the top, within 12 hours timestamp is blue, overdue timestamp is red -->
					<b-list-group-item v-for="task in tasks" :key="task.id" :to="'tasks/view/' + task.id" replace>
						<div class="d-flex justify-content-between">
							<strong>{{ task.title }}</strong>
							<div :class="{ 'text-danger': prettyDate(task.dueDate).isOverDue, 'text-info': prettyDate(task.dueDate).isDueSoon }">{{ prettyDate(task.dueDate).date }} {{ prettyTime(task.dueTime) }}</div>
						</div>
						<div class="text-truncate">{{ task.desc }}</div>
					</b-list-group-item>
				</b-list-group>
				<b-card v-else class="card-secondary text-center mx-2">
					<b-card-text>You have no tasks saved.</b-card-text>
				</b-card>
			</div>
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

	prettyTime(time: any) {
		return moment(time, "h:mmA").format("h:mmA");
	}

	prettyDate(data: any) {
		var isOverDue = false;
		var isDueSoon = false;
		if (moment(data) < moment()) {
			isOverDue = true;
		} else if (moment(data).diff(moment()) < 43200000) {
			// roughly 12 hours
			isDueSoon = true;
		}
		return { date: moment(data).format("M/D/YY"), isOverDue: isOverDue, isDueSoon: isDueSoon };
	}

	mounted() {
		this.loading = true;
		this.$store.dispatch("getTasks").finally(() => (this.loading = false));
	}
}
</script>
