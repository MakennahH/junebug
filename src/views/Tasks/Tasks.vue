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
					<!-- closest deadlines bubble to the top, within 12 hours timestamp is red --> 
					<b-list-group-item v-for="(task, key) in tasks" :key="key" :to="'tasks/view/' + key" replace>
						<div class="d-flex justify-content-between">
							<strong>{{ task.title }}</strong>
							<div class="text-info">{{ task.dueDate }} {{ task.dueTime }}</div>
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
@Component({})
export default class Tasks extends Vue {
	private tasks = [
		{
			title: "Test task",
			dueDate: "Jan 9",
			dueTime: "11:59PM",
			desc: "This is a very long description that should trail off right about now",
		},
	];
	mounted() {
		// TODO: display info
	}
}
</script>
