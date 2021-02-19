<template>
	<div class="calendar pb-2">
		<div class="base-header text-center">
			<div>Calendar</div>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<h3>{{month}}</h3>
				<b-card no-body>
					{{day}}
					<div class="d-flex text-center my-1">
						<div class="calendar-day">Sun</div>
						<div class="calendar-day">Mon</div>
						<div class="calendar-day">Tue</div>
						<div class="calendar-day">Wed</div>
						<div class="calendar-day">Thu</div>
						<div class="calendar-day">Fri</div>
						<div class="calendar-day">Sat</div>
					</div>
					<div class="d-flex justify-content-start flex-wrap">
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card no-body class="calendar-day bg-emphasized py-3"></b-card>
						<b-card no-body class="calendar-day bg-emphasized bg-today py-3">
							<b-icon icon="square-fill" class="mx-auto purple"> </b-icon>
							<b-icon icon="square-fill" class="mx-auto mt-2" variant="warning"> </b-icon>
						</b-card>
						<b-card no-body class="calendar-day bg-emphasized py-3">
							<b-icon icon="square-fill" class="mx-auto dark-blue"> </b-icon>
						</b-card>
						<b-card no-body class="calendar-day bg-emphasized py-3"></b-card>
						<b-card no-body class="calendar-day bg-emphasized py-3"></b-card>
						<b-card no-body class="calendar-day bg-emphasized py-3">
							<b-icon icon="square-fill" class="mx-auto light-blue"> </b-icon>
						</b-card>
						<b-card no-body class="calendar-day bg-emphasized py-3"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
						<b-card class="calendar-day"></b-card>
					</div>
				</b-card>
				<b-card class="bg-purple mt-2">
					<div>Expanded description of purple dot</div>
				</b-card>
				<b-card class="bg-warning mt-2">
					<div>Expanded description of yellow dot</div>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import moment from "moment";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Calendar extends Vue {
	private month = moment().format('MMMM');
	private day = moment().format('Do');

	mounted() {
		// TODO: display info
	}
}
</script>

<style scoped>
.calendar-day {
	width: 14.2%;
}
.dark-mode .calendar-day {
	border-color: #444;
}
.dark-mode .bg-emphasized {
	background: #555 !important;
}
.dark-mode .bg-today {
	background: #777 !important;
}
.bg-emphasized {
	background: #eeffdb !important;
}
.bg-today {
	background: #d9ffad !important;
}
</style>
