export class NoteModel{
    id: string;
    contents: string;
    lastEdited: Date;

    constructor(){
        this.id = "";
        this.contents = "";
        this.lastEdited = new Date();
    }
}

export class AlarmModel{
    id: string;
    time: Date | null;
    title: string;
    notes: string;
    snoozeInterval: number;
    recurring: boolean;
    days: Date[];

    constructor(){
        this.id = "";
        this.time = null;
        this.title = "";
        this.notes = "";
        this.snoozeInterval = 10;
        this.recurring = false;
        this.days = [];
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