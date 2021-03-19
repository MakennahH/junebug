<template>
	<div class="calendar pb-2">
		<div class="base-header text-center">
			<div>Calendar</div>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<h3>{{ month }}</h3>
				<b-card no-body>
					<div class="d-flex text-center my-1">
						<div class="calendar-day" v-for="(dayOfWeek, key) in daysOfWeek" :key="key">{{ dayOfWeek }}</div>
					</div>
					<div class="d-flex justify-content-start flex-wrap">
						<!-- last few days of previous month -->
						<b-card class="calendar-day bg-depreciated" v-for="(leadingDay, key) of leadingDays" :key="key" :class="{ 'bg-emphasized': key + 1 >= weekStart && key + 1 <= weekEnd }">
							<div class="small position-absolute date-number">{{ lastMonthNumDays - key }}</div>
						</b-card>
						<!-- current month -->
						<b-card class="calendar-day" v-for="(day, key) in days" :key="key" :class="{ 'bg-today': today == key + 1, 'bg-emphasized': key + 1 >= weekStart && key + 1 <= weekEnd }">
							<div class="small position-absolute date-number">{{ key + 1 }}</div>
						</b-card>
						<!-- first few days of next month -->
						<b-card class="calendar-day bg-depreciated" v-for="(trailingDay, key) of trailingDays" :key="key" :class="{ 'bg-emphasized': key + 1 >= weekStart && key + 1 <= weekEnd }">
							<div class="small position-absolute date-number">{{ key + 1 }}</div>
						</b-card>
					</div>
				</b-card>
				<!-- <b-card class="bg-purple mt-2">
					<div>Expanded description of purple dot</div>
				</b-card>
				<b-card class="bg-warning mt-2">
					<div>Expanded description of yellow dot</div>
				</b-card> -->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import moment from "moment";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Calendar extends Vue {
	private month = moment().format("MMMM");
	private daysOfWeek: string[] = [];
	private days = moment().daysInMonth();
	private today = moment().date();
	private leadingDays = moment()
		.startOf("month")
		.day();
	private trailingDays =
		7 -
		moment()
			.startOf("month")
			.add(1, "months")
			.day();
	private lastMonthNumDays = moment()
		.subtract(1, "months")
		.daysInMonth();
	private weekStart = moment()
		.startOf("week")
		.date();
	private weekEnd = moment()
		.endOf("week")
		.date();

	created() {
		for (let i = 0; i < 7; i++) {
			this.daysOfWeek[i] = moment()
				.day(i)
				.format("ddd");
		}
	}
}
</script>

<style scoped>
.calendar-day {
	width: 14.2%;
}
.date-number {
	top: 0;
	left: 0;
}
.dark-mode .calendar-day {
	border-color: #444;
}
.dark-mode .bg-emphasized {
	background: #555 !important;
}
.dark-mode .bg-depreciated {
	background: #111 !important;
}
.dark-mode .bg-today {
	background: #777 !important;
}
.bg-emphasized {
	background: #eeffdb !important;
}
.bg-depreciated {
	background: #eee !important;
}
.bg-today {
	background: #d9ffad !important;
}
</style>
