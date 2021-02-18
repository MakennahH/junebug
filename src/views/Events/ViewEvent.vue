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
					<h3>Test Title</h3>
					<div class="d-flex justify-content-between">
						<div class="text-secondary">Madison Square Garden</div>
						<div class="text-info">12-2PM 9/9/99</div>
					</div>
					<div class="pt-2 pr-2">
						<span class="font-weight-bold">With: </span>
						<span class="font-weight-light">Tina, Justin, Matt</span>
					</div>
					<div class="pt-2">
						<span class="font-weight-bold">Bring: </span>
						<span class="font-weight-light">Laptop, waterbottle</span>
					</div>

					<div class="pt-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut risus ac diam euismod dignissim. Phasellus sem nulla, pellentesque nec lacus non, auctor lobortis felis. Etiam
						consequat sed purus sed mollis. Vivamus quis ex blandit, ullamcorper magna in, pellentesque diam. Donec euismod metus arcu, vestibulum euismod justo consectetur eu. Suspendisse
						vitae ex eu elit tincidunt pulvinar vitae eget est. Nunc sollicitudin a libero semper scelerisque.
					</div>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class ViewEvent extends Vue {
	private id = this.$route.params.id;
}
</script>
