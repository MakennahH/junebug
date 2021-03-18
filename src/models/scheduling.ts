export default class SchedulingModel {
	notes: NoteModel[];
	alarms: AlarmModel[];
	events: EventModel[];
	tasks: TaskModel[];
	timelimits: TimeLimitModel[];

	constructor() {
		this.notes = [];
		this.alarms = [];
		this.events = [];
		this.tasks = [];
		this.timelimits = [];
	}
}

export class NoteModel {
	id: string;
	contents: string;
	lastEdited: Date;
	prettyLastEdited: string;

	constructor() {
		this.id = "";
		this.contents = "";
		this.lastEdited = new Date();
		this.prettyLastEdited = "";
	}
}

export class AlarmModel {
	id: string;
	time: Date | null;
	title: string;
	notes: string;
	snoozeInterval: number;
	date: Date | null;
	recurringMonthly: boolean;
	recurringYearly: boolean;
	days: boolean[];

	constructor() {
		this.id = "";
		this.time = null;
		this.title = "";
		this.notes = "";
		this.snoozeInterval = 5;
		this.date = null;
		this.recurringMonthly = false;
		this.recurringYearly = false;
		this.days = [false, false, false, false, false, false, false];
	}
}

export class EventModel {
	id: string;
	title: string;
	startTime: Date | null;
	endTime: Date | null;
	date: Date | null;
	people: string;
	location: string;
	bring: string;
	notes: string;
	leaveReminder: boolean;
	recurringMonthly: boolean;
	recurringYearly: boolean;
	days: boolean[];

	constructor() {
		this.id = "";
		this.title = "";
		this.startTime = null;
		this.endTime = null;
		this.date = null;
		this.people = "";
		this.location = "";
		this.bring = "";
		this.notes = "";
		this.leaveReminder = false;
		this.date = null;
		this.recurringMonthly = false;
		this.recurringYearly = false;
		this.days = [false, false, false, false, false, false, false];
	}
}

export class TaskModel {
	id: string;
	title: string;
	dueDate: Date | null;
	dueTime: Date | null;
	timeEstimate: number;
	dailyReminder: boolean;
	daysInAdvance: number;
	notes: string;

	constructor() {
		this.id = "";
		this.title = "";
		this.dueDate = null;
		this.dueTime = null;
		this.timeEstimate = 1;
		this.dailyReminder = false;
		this.daysInAdvance = 1;
		this.notes = "";
	}
}

export class TimeLimitModel {
	id: string;
	title: string;
	days: boolean[];
	duration: number;

	constructor() {
		this.id = "";
		this.title = "";
		this.days = [false, false, false, false, false, false, false];
		this.duration = 1;
	}
}
