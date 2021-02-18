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
					<h3>Test Title</h3>
					<div class="d-flex justify-content-between">
						<div class="font-weight-light">
							<div class="text-secondary">Sunday</div>
							<div class="d-flex align-items-center">Monday <b-icon icon="check"></b-icon></div>
							<div>Tuesday</div>
							<div>Wednesday</div>
							<div>Thursday</div>
							<div>Friday</div>
							<div class="text-secondary">Saturday</div>
						</div>
						<div class="text-info">1 hour</div>
					</div>
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
}
</script>
