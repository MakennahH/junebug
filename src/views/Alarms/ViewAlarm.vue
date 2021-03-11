<template>
	<div class="alarms pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/alarms" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Alarms</div>
			<router-link class="header-button" :to="'/alarms/edit/' + id" replace>
				<b-icon icon="pencil" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<b-card>
					<h3>{{alarm.title}}</h3>
					<div class="d-flex justify-content-between">
						<div class="font-weight-light">
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !alarm.days[0] }" >Sunday <b-icon icon="check" v-if="alarm.days[0]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !alarm.days[1] }" >Monday <b-icon icon="check" v-if="alarm.days[1]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !alarm.days[2] }">Tuesday <b-icon icon="check" v-if="alarm.days[2]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !alarm.days[3] }">Wednesday <b-icon icon="check" v-if="alarm.days[3]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !alarm.days[4] }">Thursday <b-icon icon="check" v-if="alarm.days[4]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !alarm.days[5] }">Friday <b-icon icon="check" v-if="alarm.days[5]"></b-icon></div>
							<div class="d-flex align-items-center" :class="{ 'text-secondary': !alarm.days[6] }">Saturday <b-icon icon="check" v-if="alarm.days[6]"></b-icon></div>
						</div>
						<div class="text-info">
							<div>{{ prettyTime() }}</div>
							<b-button @click="deleteAlarm" variant="danger" class="position-absolute" id="delete"><b-icon-trash></b-icon-trash></b-button>
						</div>
					</div>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
@Component({})
export default class ViewAlarm extends Vue {
	private id = this.$route.params.id;
	private loading = true;

	mounted() {
		this.loading = true;
		this.$store.dispatch("getAlarms").finally(() => (this.loading = false));
	}

	get alarms() {
		return this.$store.state.scheduling.alarms;
	}

	get alarm() {
		return this.alarms.find((alarm: any) => {
			return alarm.id === this.id;
		});
	}

	prettyTime() {
		return moment(moment(this.alarm.time, "h:mm A")).format("h:mm A");
	}

	deleteAlarm() {
		this.$store.dispatch("deleteAlarm", { id: this.$route.params.id }).then(() => {
			this.$router.replace("/alarms");
		});
	}
}
</script>

<style scoped>
#delete{
	bottom: 0;
	right: 0;

	margin: 20px;
}
</style>