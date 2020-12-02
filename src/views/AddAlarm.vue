<template>
	<div class="add-alarm">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/alarms" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Add an Alarm</div>
		</div>
		<div class="row has-header">
			<form class="col mx-2">
				<b-button @click="addAlarm" class="btn btn-info mt-2" block>
					Save
				</b-button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AddAlarm extends Vue {
	addAlarm() {
		// TODO: save the Alarm
		this.$router.replace("/alarms");
	}
}
</script>
