<template>
	<div class="settings pb-2">
		<div class="base-header text-center">
			<div>Settings</div>
		</div>
		<div class="row has-header">
			<div class="col mx-2">
				<b-list-group>
					<b-list-group-item class="d-flex justify-content-between align-items-center">
						<div>
							<b-icon icon="diamond-half" scale="1.5" variant="info" class="mr-2"></b-icon>
							Dark mode
						</div>
						<toggle-button v-model="darkMode" :width="58" :height="32" switch-color="#FFFFFF" :color="{ checked: '#4EC9A3', unchecked: '#87979A' }" :labels="false" class="m-0" />
					</b-list-group-item>
					<b-list-group-item class="d-flex justify-content-between align-items-center">
						<div>
							<b-icon icon="brightness-alt-high-fill" scale="1.5" variant="info" class="mr-2"></b-icon>
							I start my day at:
						</div>
						<b-form-timepicker size="sm" id="startTime" name="startTime" v-model="startTime"></b-form-timepicker>
					</b-list-group-item>
					<b-list-group-item class="custom d-flex justify-content-between align-items-center" v-b-toggle.meal-reminder>
						<div>
							<b-icon icon="egg-fried" scale="1.5" variant="info" class="mr-2"></b-icon>
							Meal reminders
						</div>
						<b-icon icon="chevron-down"></b-icon>
					</b-list-group-item>
					<b-collapse id="meal-reminder">
						<b-card class="form-group-middle">
							<div>Send reminders every:</div>
							<b-form-spinbutton :formatter-fn="formatMealHours" size="sm" v-model="maxMealHours" wrap min="1" max="8"></b-form-spinbutton>
						</b-card>
					</b-collapse>
					<b-list-group-item class="d-flex justify-content-between align-items-center" v-b-toggle.drink-reminder>
						<div>
							<b-icon icon="cup-straw" scale="1.5" variant="info" class="mr-2"></b-icon>
							Drink reminders
						</div>
						<b-icon icon="chevron-down"></b-icon>
					</b-list-group-item>
					<b-collapse id="drink-reminder">
						<b-card class="form-group-middle">
							<div>Send reminders every:</div>
							<b-form-spinbutton :formatter-fn="formatDrinkHours" size="sm" v-model="maxDrinkHours" wrap min="1" max="24"></b-form-spinbutton>
						</b-card>
					</b-collapse>
					<b-list-group-item class="d-flex justify-content-between align-items-center" v-b-toggle.sleep-reminder>
						<div>
							<b-icon icon="moon" scale="1.5" variant="info" class="mr-2"></b-icon>
							Sleep reminders
						</div>
						<b-icon icon="chevron-down"></b-icon>
					</b-list-group-item>
					<b-collapse id="sleep-reminder">
						<b-card class="form-group-middle">
							<b-form-timepicker size="sm" type="time" v-model="sleepTime"></b-form-timepicker>
						</b-card>
					</b-collapse>
					<b-list-group-item class="d-flex justify-content-between align-items-center" v-b-toggle.meds-reminder>
						<div>
							<b-icon icon="clipboard-plus" scale="1.5" variant="info" class="mr-2"></b-icon>
							Meds reminders
						</div>
						<b-icon icon="chevron-down"></b-icon>
					</b-list-group-item>
					<b-collapse id="meds-reminder">
						<b-card class="form-group-middle">
							<b-form-timepicker size="sm" type="time"></b-form-timepicker>
						</b-card>
					</b-collapse>
					<b-list-group-item to="/editprofile" class="d-flex justify-content-between align-items-center">
						<div>
							<b-icon icon="person" scale="1.5" variant="info" class="mr-2"></b-icon>
							{{ email }}
						</div>
						<div><b-icon-chevron-right /></div>
					</b-list-group-item>
					<b-list-group-item to="/changepassword" class="d-flex justify-content-between align-items-center">
						<div>
							<b-icon icon="asterisk" scale="1.5" variant="info" class="mr-2"></b-icon>
							Change password
						</div>
						<div><b-icon-chevron-right /></div>
					</b-list-group-item>
					<b-list-group-item @click="logout" class="d-flex justify-content-between align-items-center">
						<div>
							<b-icon icon="box-arrow-right" scale="1.5" variant="info" class="mr-2"></b-icon>
							Log out
						</div>
					</b-list-group-item>
				</b-list-group>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Settings extends Vue {
	private starttime = "9:00";
	private sleeptime = "00:00";
	private mealHours = 4;
	private drinkHours = 1;
	private dark = false;
	private email = this.$store.state.userProfile.email;

	get darkMode() {
		return this.$store.state.darkMode;
	}

	set darkMode(value) {
		this.$store.commit("setDarkMode", value);
	}

	get startTime() {
		return this.starttime;
	}
	set startTime(value) {
		this.starttime = value;
	}

	get sleepTime() {
		return this.sleeptime;
	}

	set sleepTime(value) {
		this.sleeptime = value;
	}

	get maxMealHours() {
		return this.mealHours;
	}

	set maxMealHours(value) {
		this.mealHours = value;
	}

	get maxDrinkHours() {
		return this.drinkHours;
	}

	set maxDrinkHours(value) {
		this.drinkHours = value;
	}

	formatDrinkHours() {
		return this.drinkHours == 1 ? this.drinkHours + " hr" : this.drinkHours + " hrs";
	}

	formatMealHours() {
		return this.mealHours == 1 ? this.mealHours + " hr" : this.mealHours + " hrs";
	}

	logout() {
		this.$store.dispatch("logout");
	}
}
</script>
