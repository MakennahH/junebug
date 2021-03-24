<template>
	<div v-b-toggle="'event' + index">
		<div v-if="timeToHour(event.startTime) == index + timeToHour(startTime)">
			<b-icon-calendar class="mx-3"></b-icon-calendar>
			{{ event.title }}
			<b-icon icon="chevron-down" class="float-right"></b-icon>
		</div>
		<b-collapse :id="'event' + index">
			<div>
				Location: <span class="font-weight-bold">{{ event.location }}</span>
			</div>
			<div>
				With: <span class="font-weight-bold">{{ event.people }}</span>
			</div>
			<div>
				Bring: <span class="font-weight-bold">{{ event.bring }}</span>
			</div>
			<div>Notes: {{ event.notes }}</div>
		</b-collapse>
	</div>
</template>
<script lang="ts">
import { EventModel } from "@/models/scheduling";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class EventListItem extends Vue {
	@Prop({ required: true })
	public event!: EventModel;

	@Prop({ required: true })
	public index: number | undefined;
}
</script>
