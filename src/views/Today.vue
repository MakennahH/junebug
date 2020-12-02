<template>
	<div class="home pb-2">
		<div class="base-header text-center">
			<div>Home</div>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<div class="d-flex justify-content-between align-items-center">
					<h3>Today:</h3>
					<!-- <b-form-checkbox switch>I took my meds today</b-form-checkbox> -->
				</div>
				<b-list-group class="w-100 text-dark text-left">
					<b-list-group-item> 9:00am </b-list-group-item>
					<b-list-group-item class="bg-info text-light">
						10:00am Class
					</b-list-group-item>
					<b-list-group-item> 11:00am </b-list-group-item>
					<b-list-group-item class="bg-warning">
						12:00pm Doctor's Appt
					</b-list-group-item>
					<b-list-group-item> 1:00pm </b-list-group-item>
					<b-list-group-item> 2:00pm </b-list-group-item>
					<b-list-group-item class="bg-success">
						3:00pm Go grocery shopping
					</b-list-group-item>
					<b-list-group-item> 4:00pm </b-list-group-item>
					<b-list-group-item> 5:00pm </b-list-group-item>
					<b-list-group-item> 6:00pm </b-list-group-item>
					<b-list-group-item> 7:00pm </b-list-group-item>
				</b-list-group>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Today extends Vue {
	mounted() {
		// TODO: display info
	}
}
</script>
