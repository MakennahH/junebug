<template>
	<div class="timelimits pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/timelimits" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Time Limits</div>
			<router-link class="header-button" to="/timelimits/edit" replace>
				<b-icon icon="pencil" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				Time Limit contents
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class ViewTimeLimit extends Vue {
}
</script>
