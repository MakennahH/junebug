import SchedulingModel from "./scheduling";

export default class UserModel {
    email: string;
    darkModeOn: boolean;
    calendarStartHour: Date;
    reminderTimes: Date[];
    scheduling: SchedulingModel;

    constructor(){
        this.email =  "";
        this.darkModeOn = false;
        this.calendarStartHour = new Date();
        this.reminderTimes = [];
        this.scheduling = new SchedulingModel();
    }
}