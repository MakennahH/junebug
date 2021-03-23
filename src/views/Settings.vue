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
							<b-form-spinbutton :formatter-fn="formatMealHours" size="sm" v-model="maxMealHours" wrap min="0" max="24"></b-form-spinbutton>
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
							<b-form-spinbutton :formatter-fn="formatDrinkHours" size="sm" v-model="maxDrinkHours" wrap min="0" max="24"></b-form-spinbutton>
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
					<b-list-group-item v-b-toggle.meds-reminder id="meds-list-item">
						<div class="d-flex justify-content-between align-items-center">
							<div>
								<b-icon icon="clipboard-plus" scale="1.5" variant="info" class="mr-2"></b-icon>
								Meds reminders
							</div>
							<b-icon icon="chevron-down"></b-icon>
						</div>
					</b-list-group-item>
					<b-collapse id="meds-reminder">
						<b-card class="form-group-middle">
							<b-form-timepicker size="sm" type="time" v-model="medTime"></b-form-timepicker>
						</b-card>
					</b-collapse>
				</b-list-group>
				<b-list-group class="pt-3">
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
import UserModel from "@/models/user";
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Settings extends Vue {
	private userProfile = new UserModel();

	created() {
		this.$store.dispatch("getCurrentUserProfile").then(() => {
			this.userProfile = this.$store.state.userProfile;
		});
	}

	get email() {
		return this.$store.state.userProfile.email;
	}

	get darkMode() {
		return this.$store.state.userProfile.darkModeOn;
	}

	set darkMode(value) {
		this.$store.dispatch("setDarkMode", value);
	}

	get startTime() {
		return this.userProfile.calendarStartHour;
	}

	set startTime(value: Date | null) {
		this.userProfile.calendarStartHour = value;
	}

	get sleepTime() {
		return this.userProfile.sleepReminder;
	}

	set sleepTime(value) {
		this.userProfile.sleepReminder = value;
	}

	get medTime() {
		return this.userProfile.medReminder;
	}

	set medTime(value) {
		this.userProfile.medReminder = value;
	}

	get maxMealHours() {
		return this.userProfile.mealReminder;
	}

	set maxMealHours(value) {
		this.userProfile.mealReminder = value;
	}

	get maxDrinkHours() {
		return this.userProfile.drinkReminder;
	}

	set maxDrinkHours(value) {
		this.userProfile.drinkReminder = value;
	}

	formatDrinkHours() {
		switch (this.userProfile.drinkReminder) {
			case 0:
				return "No reminders";
			case 1:
				return this.userProfile.drinkReminder + " hr";
			default:
				return this.userProfile.drinkReminder + " hrs";
		}
	}

	formatMealHours() {
		switch (this.userProfile.mealReminder) {
			case 0:
				return "No reminders";
			case 1:
				return this.userProfile.mealReminder + " hr";
			default:
				return this.userProfile.mealReminder + " hrs";
		}
	}

	saveSettings() {
		try {
			this.$store.dispatch("updateUserProfile", {
				calendarStartHour: this.userProfile.calendarStartHour,
				mealReminder: this.userProfile.mealReminder,
				drinkReminder: this.userProfile.drinkReminder,
				sleepReminder: this.userProfile.sleepReminder,
				medReminder: this.userProfile.medReminder,
			});
		} catch (error) {
			this.$bvToast.toast(error.message, {
				title: `Error Occured`,
				variant: "danger",
				solid: true,
			});
		}
	}

	beforeDestroy() {
		this.saveSettings();
	}

	logout() {
		this.$store.dispatch("logout");
	}
}
</script>
<style scoped>
#meds-reminder > div {
	border-radius: 0 0 0.25rem 0.25rem !important;
}
#meds-list-item {
	border-radius: 0 0 0.25rem 0.25rem !important;
}
</style>
