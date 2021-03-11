<template>
	<div class="events pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/planner" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Events</div>
			<router-link class="header-button-right" to="/events/add" replace>
				<b-icon icon="plus" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col">
				<b-list-group v-if="events.length > 0" class="mx-2">
					<b-list-group-item v-for="event in events" :key="event.id" :to="'events/view/' + event.id" replace>
						<div class="d-flex justify-content-between">
							<strong>{{ event.title }}</strong>
							<div class="font-weight-light">{{prettyDate(event.date)}} <span class="small text-info">{{ prettyTime(event.startTime) }}-{{ prettyTime(event.endTime) }}</span></div>
						</div>
						<div>{{ event.location }}</div>
						<div>{{ event.whatToBring }}</div>
					</b-list-group-item>
				</b-list-group>
				<b-card v-else class="card-secondary text-center mx-2">
					<b-card-text>You have no events saved.</b-card-text>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";

@Component({})
export default class Events extends Vue {
	private loading = true;

	get isLoading(){
		return this.loading;
	}

	get events(){
		return this.$store.state.scheduling.events;
	}

	prettyTime(data: any) {
		return moment(moment(data, "h:mmA")).format("hA");
	}

	prettyDate(data: any){
		return moment(data).format("M/D/YY");
	}
	
	mounted() {
		this.loading = true;
		this.$store.dispatch("getEvents").finally(() => (this.loading = false));
	}
}
</script>
