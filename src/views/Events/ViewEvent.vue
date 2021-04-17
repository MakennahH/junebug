<template>
	<div class="events pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/events" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Events</div>
			<router-link class="header-button" :to="'/events/edit/' + id" replace>
				<b-icon icon="pencil" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<b-card>
					<h3>{{ event.title }}</h3>
					<div class="d-flex justify-content-between">
						<div class="font-weight-bold">{{ prettyDate(event.date) }}</div>
						<div class="text-info">{{ prettyTime(event.startTime) }} - {{ prettyTime(event.endTime) }}</div>
						<div class="text-secondary">{{ event.location }}</div>
					</div>
					<div class="pt-2 pr-2" v-if="event.people != ''">
						<span class="font-weight-bold">With: </span>
						<span class="font-weight-light">{{ event.people }}</span>
					</div>
					<div class="pt-2" v-if="event.bring != ''">
						<span class="font-weight-bold">Bring: </span>
						<span class="font-weight-light">{{ event.bring }}</span>
					</div>
					<div class="pt-2" v-if="event.notes != ''">
						{{ event.notes }}
					</div>
					<b-button @click="deleteEvent" variant="danger" class="float-right mt-2"><b-icon-trash></b-icon-trash></b-button>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
@Component({ })
export default class ViewEvent extends Vue {
	private id = this.$route.params.id;
	private loading = true;

	mounted() {
		this.loading = true;
		this.$store.dispatch("getEvents").finally(() => (this.loading = false));
	}

	get events() {
		return this.$store.state.scheduling.events;
	}

	get event() {
		return this.events.find((event: any) => {
			return event.id === this.id;
		});
	}

	prettyTime(data: any) {
		return moment(moment(data, "h:mm A")).format("h:mm A");
	}

	prettyDate(data: any) {
		return moment(data).format("ddd, MMM Do 'YY");
	}

	deleteEvent() {
		this.$bvModal
			.msgBoxConfirm("Are you sure you want to delete this event?", {
				hideHeader: true,
				centered: true,
				okVariant: "info",
			})
			.then(value => {
				if (value) {
					try {
						this.$store.dispatch("deleteEvent", { id: this.$route.params.id }).then(() => {
							this.$router.replace("/events");
						});
					} catch (error) {
						this.$bvToast.toast(error.message, {
							title: `Error Occured`,
							variant: "danger",
							solid: true,
						});
					}
				}
				// else do nothing
			});
	}
}
</script>