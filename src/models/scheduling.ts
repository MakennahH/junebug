export default class SchedulingModel {
    notes: NoteModel[];
    alarms: AlarmModel[];
    events: EventModel[];
    tasks: TaskModel[];
    timelimits: TimeLimitModel[];

    constructor(){
        this.notes = [];
        this.alarms = [];
        this.events = [];
        this.tasks = [];
        this.timelimits = [];
    }
}

export class NoteModel{
    id: string;
    contents: string;
    lastEdited: Date;
    prettyLastEdited: string;

    constructor(){
        this.id = "";
        this.contents = "";
        this.lastEdited = new Date();
        this.prettyLastEdited = "";
    }
}

export class AlarmModel{
    id: string;
    time: Date;
    title: string;
    notes: string;
    snoozeInterval: number;
    recurringDaily: boolean;
    recurringMonthly: boolean;
    recurringYearly: boolean;
    days: boolean[];

    constructor(){
        this.id = "";
        this.time = new Date();
        this.title = "";
        this.notes = "";
        this.snoozeInterval = 5;
        this.recurringDaily = false;
        this.recurringMonthly = false;
        this.recurringYearly = false;
        this.days = [false, false, false, false, false, false, false];
    }
}

export class EventModel{
    id: string;
    title: string;
    startTime: Date | null;
    endTime: Date | null;
    people: string;
    location: string;
    bring: string;
    notes: string;
    leaveReminder: boolean;
    recurring: boolean;
    days: Date[];

    constructor(){
        this.id = "";
        this.title = "";
        this.startTime = null;
        this.endTime = null;
        this.people = "";
        this.location = "";
        this.bring = "";
        this.notes = "";
        this.leaveReminder = false;
        this.recurring = false;
        this.days = [];
    }
}

export class TaskModel{
    id: string;
    title: string;
    dueDate: Date | null;
    timeEstimate: number;
    dailyReminder: boolean;
    daysInAdvance: number;
    notes: string;

    constructor(){
        this.id = "";
        this.title = "";
        this.dueDate = null;
        this.timeEstimate = 0;
        this.dailyReminder = false;
        this.daysInAdvance = 0;
        this.notes = "";
    }
}

export class TimeLimitModel{
    id: string;
    title: string;
    days: Date[];
    duration: number;

    constructor(){
        this.id = "";
        this.title = "";
        this.days = [];
        this.duration = 0;
    }
}