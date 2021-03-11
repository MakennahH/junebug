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
				<b-card>
					<h3>{{timelimit.title}}</h3>
					<div class="d-flex justify-content-between">
						<div class="font-weight-light">
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[0] }" >Sunday <b-icon icon="check" v-if="timelimit.days[0]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[1] }" >Monday <b-icon icon="check" v-if="timelimit.days[1]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[2] }">Tuesday <b-icon icon="check" v-if="timelimit.days[2]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[3] }">Wednesday <b-icon icon="check" v-if="timelimit.days[3]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[4] }">Thursday <b-icon icon="check" v-if="timelimit.days[4]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[5] }">Friday <b-icon icon="check" v-if="timelimit.days[5]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !timelimit.days[6] }">Saturday <b-icon icon="check" v-if="timelimit.days[6]"></b-icon></div>
						</div>
						<div class="text-info">1 hour</div>
					</div>
					<b-button @click="deleteTimeLimit" variant="danger" class="float-right mt-2"><b-icon-trash></b-icon-trash></b-button>
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

	mounted() {
		this.loading = true;
		this.$store.dispatch("getTimeLimits").finally(() => (this.loading = false));
	}

	get timelimits() {
		return this.$store.state.scheduling.timelimits;
	}

	get timelimit() {
		return this.timelimits.find((timelimit: any) => {
			return timelimit.id === this.id;
		});
	}

	deleteTimeLimit() {
		this.$store.dispatch("deleteTimeLimit", { id: this.$route.params.id }).then(() => {
			this.$router.replace("/timelimits");
		});
	}
}
</script>
