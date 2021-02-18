<template>
	<div class="tasks pb-2">
		<div class="base-header text-center">
			<router-link class="header-button-left" to="/tasks" replace>
				<b-icon icon="chevron-left" variant="light" scale="0.5"></b-icon>
			</router-link>
			<div>Tasks</div>
			<router-link class="header-button" :to="'/tasks/edit/' + id" replace>
				<b-icon icon="pencil" variant="light" scale="0.7"></b-icon>
			</router-link>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<b-card>
					<h3>Test Title</h3>
					<div class="d-flex justify-content-between">
						<div class="text-secondary">&#60; 1 hour</div>
						<div class="text-info">12:00PM 9/9/99</div>
					</div>
					<div class="pt-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut risus ac diam euismod dignissim. Phasellus sem nulla, pellentesque nec lacus non, auctor lobortis felis. Etiam
						consequat sed purus sed mollis. Vivamus quis ex blandit, ullamcorper magna in, pellentesque diam. Donec euismod metus arcu, vestibulum euismod justo consectetur eu. Suspendisse
						vitae ex eu elit tincidunt pulvinar vitae eget est. Nunc sollicitudin a libero semper scelerisque. Praesent a tortor finibus, scelerisque tellus sed, accumsan sem. Aenean odio
						enim, malesuada sollicitudin commodo cursus, porta non risus. Nam enim odio, dignissim eget eleifend vel, semper nec est. Curabitur turpis mauris, egestas et diam sit amet,
						pellentesque efficitur ex. Quisque ultrices eros id nunc imperdiet lacinia. Aliquam id bibendum nulla. Aliquam vestibulum enim non risus dignissim mattis. Maecenas finibus
						sapien vitae nibh pretium, in rhoncus nisl aliquam. Curabitur rhoncus ligula neque, elementum egestas neque elementum vitae. Nunc dui lorem, sagittis eget libero sed,
						vestibulum pharetra nibh. Morbi id augue rhoncus, iaculis ex sed, malesuada ipsum. Vivamus et purus feugiat, porttitor magna eget, facilisis tellus. Cras vestibulum non enim ac
						vulputate.
					</div>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class ViewTask extends Vue {
	private id = this.$route.params.id;
}
</script>
