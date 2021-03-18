import SchedulingModel from "./scheduling";

export default class UserModel {
	email: string;
	darkModeOn: boolean;
	calendarStartHour: Date | null;
	mealReminder: number;
	drinkReminder: number;
	sleepReminder: Date | null;
	medReminder: Date | null;

	constructor() {
		this.email = "";
		this.darkModeOn = false;
		this.calendarStartHour = null;
		this.mealReminder = 0;
		this.drinkReminder = 0;
		this.sleepReminder = null;
		this.medReminder = null;
	}
}
