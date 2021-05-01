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
	recurringMonthly: boolean;
	recurringYearly: boolean;
	days: boolean[];
	color: {};

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
		this.date = null;
		this.recurringMonthly = false;
		this.recurringYearly = false;
		this.days = [false, false, false, false, false, false, false];
		this.color = {
			hex: "#17a2b8",
			hex8: "#17a2b8",
			hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
			hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
			rgba: { r: 25, g: 77, b: 51, a: 1 },
			a: 1,
		};
	}
}

export class TaskModel {
	id: string;
	title: string;
	dueDate: Date | null;
	dueTime: Date | null;
	completed: boolean;
	notes: string;
	color: {};

	constructor() {
		this.id = "";
		this.title = "";
		this.dueDate = null;
		this.dueTime = null;
		this.completed = false;
		this.notes = "";
		this.color = {
			hex: "#17a2b8",
			hex8: "#17a2b8",
			hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
			hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
			rgba: { r: 25, g: 77, b: 51, a: 1 },
			a: 1,
		};
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
