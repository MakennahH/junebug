<template>
	<div class="home pb-2">
		<div class="base-header text-center">
			<div>Home</div>
		</div>
		<div class="row has-header">
			<div class="col mx-2" v-if="!isLoading">
				<div class="d-flex justify-content-between align-items-center">
					<h3>Today:</h3>
					<b-form-checkbox switch>I took my meds today</b-form-checkbox>
				</div>
				<div v-for="event in events" :key="event.id">
					{{event.title}}
				</div>
				<div v-for="task in tasks" :key="task.id">
					{{task.title}}
				</div>
				<div v-for="alarm in alarms" :key="alarm.id">
					{{alarm.title}}
				</div>
				<b-list-group class="w-100 text-left">
					<b-list-group-item> 9:00am <b-icon icon="alarm"></b-icon> wake up</b-list-group-item>
					<b-list-group-item class="bg-info text-light" v-b-toggle.10am>
						10:00am Operating Systems
						<b-icon icon="chevron-down" class="float-right"></b-icon>
					</b-list-group-item>
					<b-collapse id="10am">
						<div class="p-2 bg-info text-light">
							<div>Location: <span class="font-weight-bold">JSC 312</span></div>
							<div>With: <span class="font-weight-bold">Professor Ocean</span></div>
							<div>Bring: <span class="font-weight-bold">Laptop, water bottle, Raspberry Pi</span></div>
							<div>Notes: Dude's like CRAZY tall... like SCARY tall</div>
						</div>
					</b-collapse>
					<b-list-group-item> 11:00am </b-list-group-item>
					<b-list-group-item class="bg-danger text-light">
						12:00pm Doctor's Appt
						<b-icon icon="chevron-down" class="float-right"></b-icon>
					</b-list-group-item>
					<b-list-group-item> 1:00pm </b-list-group-item>
					<b-list-group-item> 2:00pm </b-list-group-item>
					<b-list-group-item class="bg-success text-light">
						3:00pm Go grocery shopping
						<b-icon icon="chevron-down" class="float-right"></b-icon>
					</b-list-group-item>
					<b-list-group-item> 4:00pm <b-icon icon="alarm"></b-icon> feed lizard</b-list-group-item>
					<b-list-group-item> 5:00pm </b-list-group-item>
					<b-list-group-item> 6:00pm </b-list-group-item>
					<b-list-group-item> 7:00pm </b-list-group-item>
				</b-list-group>
				<h3 class="my-2">Upcoming:</h3>
				<b-card class="card-secondary text-center">
					<b-card-text>Nothing coming up! Sit back and relax.</b-card-text>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
@Component({})
export default class Today extends Vue {
	private loading = true;
	
	mounted() {
		this.$store.dispatch("getAlarms").then(() => {
			this.$store.dispatch("getEvents").then(() => {
				this.$store.dispatch("getTasks").then(() => {
					this.loading = false
				});
			});
		});
	}

	get isLoading(){
		return this.loading;
	}

	get alarms(){
		return this.$store.state.scheduling.alarms.filter((alarm: any) =>  moment(alarm.time) >= moment().startOf('date') && moment(alarm.time) <= moment().endOf('date'));
	}

	get events(){
		return this.$store.state.scheduling.events.filter((event: any) =>  moment(event.date).add(event.startTime) >= moment().startOf('date') && moment(event.date).add(event.endTime) <= moment().endOf('date'));
	}

	get tasks(){
		return this.$store.state.scheduling.tasks.filter((task: any) =>  moment(task.dueDate) >= moment().startOf('date') && moment(task.dueDate).add(task.dueTime) <= moment().endOf('date'));
	}
}
</script>
