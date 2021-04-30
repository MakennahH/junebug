<template>
	<div class="timelimits pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/timelimits" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Time Limits</div>
			<router-link class="header-button" :to="'/timelimits/edit/' + id" replace>
				<b-icon icon="pencil" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<div class="row d-flex justify-content-end mr-1">
					<h1 v-if="isGoing" class="border rounded text-danger px-2">{{ counter.hour }}:{{ counter.min }}:{{ counter.sec }}</h1>
				</div>
				<b-card>
					<h3>
						{{ timelimit.title }}
					</h3>
					<div class="d-flex justify-content-between">
						<div class="font-weight-light">
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[0] }">Sunday <b-icon icon="check" v-if="timelimit.days[0]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[1] }">Monday <b-icon icon="check" v-if="timelimit.days[1]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[2] }">Tuesday <b-icon icon="check" v-if="timelimit.days[2]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[3] }">Wednesday <b-icon icon="check" v-if="timelimit.days[3]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[4] }">Thursday <b-icon icon="check" v-if="timelimit.days[4]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[5] }">Friday <b-icon icon="check" v-if="timelimit.days[5]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[6] }">Saturday <b-icon icon="check" v-if="timelimit.days[6]"></b-icon></div>
						</div>
						<div class="text-info">{{ formatHours() }}</div>
					</div>
					<b-button @click="deleteTimeLimit" variant="danger" class="mt-2"><b-icon-trash></b-icon-trash></b-button>
					<b-button v-if="isGoing" @click="stopTimeLimit" variant="warning" class="float-right mt-2 d-flex align-items-center"
						><b-icon-clock-history class="mr-1"></b-icon-clock-history>Stop</b-button
					>
					<b-button v-else @click="startTimeLimit" variant="info" class="float-right mt-2 d-flex align-items-center"><b-icon-clock class="mr-1"></b-icon-clock>Start</b-button>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class ViewTimeLimit extends Vue {
	private id = this.$route.params.id;
	private loading = true;
	private going = false;
	private timer = 0;
	private counterFunction = 0;
	private counter: { hour: number; min: number; sec: number } = { hour: 0, min: 0, sec: 0 };

	mounted() {
		this.loading = true;
		this.$store.dispatch("getTimeLimits").finally(() => (this.loading = false));
	}

	get isGoing() {
		return this.going;
	}

	get timelimits() {
		return this.$store.state.scheduling.timelimits;
	}

	get timelimit() {
		return this.timelimits.find((timelimit: any) => {
			return timelimit.id === this.id;
		});
	}

	formatHours() {
		return this.timelimit.duration == 1 ? this.timelimit.duration + " hour" : this.timelimit.duration + " hours";
	}

	deleteTimeLimit() {
		this.$bvModal
			.msgBoxConfirm("Are you sure you want to delete this time limit?", {
				hideHeader: true,
				centered: true,
				okVariant: "info",
			})
			.then(value => {
				if (value) {
					try {
						this.$store.dispatch("deleteTimeLimit", { id: this.$route.params.id }).then(() => {
							this.$router.replace("/timelimits");
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

	startTimeLimit() {
		// 3600000 ms = 1 hr
		this.timer = setTimeout(this.showModal, 3600000 * this.timelimit.duration);
		// this.timer = setTimeout(this.showModal, 5000);
		// ^^ for testing

		// display a countdown
		this.counter = { hour: this.timelimit.duration, min: 0, sec: 0 };
		this.counterFunction = setInterval(() => {
			if (this.counter.min - 1 == -1) {
				this.counter.hour -= 1;
				this.counter.min = 60;
			}
			if (this.counter.sec - 1 == -1) {
				this.counter.min -= 1;
				this.counter.sec = 59;
			} else {
				this.counter.sec -= 1;
			}
			if (this.counter.hour === 0 && this.counter.min === 0 && this.counter.sec == 0) {
				clearInterval(this.counterFunction);
			}
		}, 1000);

		this.going = true;
	}

	stopTimeLimit() {
		clearTimeout(this.timer);
		clearInterval(this.counterFunction);
		this.going = false;
	}

	showModal() {
		this.$bvModal.msgBoxConfirm(`Your time limit ${this.timelimit.title} is over.`, {
			title: "Time's up!",
			headerBgVariant: "info",
			headerTextVariant: "light",
			centered: true,
			okVariant: "info",
			okTitle: "OK",
			cancelTitle: "Snooze",
		});
		this.going = false;
	}
}
</script>
