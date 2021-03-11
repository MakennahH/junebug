import SchedulingModel from '@/models/scheduling'
import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'

Vue.use(Vuex)

export default ({
    state: new SchedulingModel(),

    actions: {

        // NOTES ACTIONS ------------------------------------------------------------------------------------------------

        async addNote({ commit }: any, data: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('notes').add({
                id: null,
                contents: data.contents,
                lastEdited: data.lastEdited,
                prettyLastEdited: data.prettyLastEdited
            }).then((docRef) => {
                const newId = docRef.id;
                fb.usersCollection.doc(user?.uid).collection('notes').doc(docRef.id).update({ id: newId })
            }).then(() => {
                commit('updateNotes', data);
            })

        },

        async getNotes({ commit }: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('notes').orderBy('lastEdited', 'desc').get().then((querySnapshot) => {
                const newNotes: any = [];
                querySnapshot.forEach((doc) => {
                    newNotes.push(doc.data());
                });
                commit('updateNotes', newNotes);
            });
        },

        async updateNote({ commit }: any, note: any,) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('notes').doc(note.id).update({
                contents: note.contents,
                lastEdited: note.lastEdited,
                prettyLastEdited: note.prettyLastEdited,
            }).then(() => {
                this.getNotes;
            })
        },

        async deleteNote({ commit }: any, note: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('notes').doc(note.id).delete().then(() => {
                this.getNotes;
            }).catch((error) => {
                console.error("There was a problem" + error);
            });
        },

        // ALARMS ACTIONS ------------------------------------------------------------------------------------------------

        async addAlarm({ commit }: any, data: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('alarms').add({
                id: null,
                time: data.time,
                title: data.title,
                notes: data.notes,
                snoozeInterval: data.snoozeInterval,
                date: data.date,
                recurringMonthly: data.recurringMonthly,
                recurringYearly: data.recurringYearly,
                days: data.days
            }).then((docRef) => {
                const newId = docRef.id;
                fb.usersCollection.doc(user?.uid).collection('alarms').doc(docRef.id).update({ id: newId })
            }).then(() => {
                commit('updateAlarms', data);
            })

        },

        async getAlarms({ commit }: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('alarms').orderBy('time').get().then((querySnapshot) => {
                const newAlarms: any = [];
                querySnapshot.forEach((doc) => {
                    newAlarms.push(doc.data());
                });
                commit('updateAlarms', newAlarms);
            });
        },

        async updateAlarm({ commit }: any, alarm: any,) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('alarms').doc(alarm.id).update({
                time: alarm.time,
                title: alarm.title,
                notes: alarm.notes,
                snoozeInterval: alarm.snoozeInterval,
                date: alarm.date,
                recurringMonthly: alarm.recurringMonthly,
                recurringYearly: alarm.recurringYearly,
                days: alarm.days
            }).then(() => {
                this.getAlarms;
            })
        },

        async deleteAlarm({ commit }: any, alarm: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('alarms').doc(alarm.id).delete().then(() => {
                this.getAlarms;
            }).catch((error) => {
                console.error("There was a problem" + error);
            });
        },

        // EVENTS ACTIONS ------------------------------------------------------------------------------------------------

        async addEvent({ commit }: any, data: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('events').add({
                id: null,
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                date: data.date,
                people: data.people,
                location: data.location,
                bring: data.bring,
                notes: data.notes,
                leaveReminder: data.leaveReminder,
                recurringMonthly: data.recurringMonthly,
                recurringYearly: data.recurringYearly,
                days: data.days,
            }).then((docRef) => {
                const newId = docRef.id;
                fb.usersCollection.doc(user?.uid).collection('events').doc(docRef.id).update({ id: newId })
            }).then(() => {
                commit('updateEvents', data);
            })

        },

        async getEvents({ commit }: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('events').orderBy('startTime').get().then((querySnapshot) => {
                const newEvents: any = [];
                querySnapshot.forEach((doc) => {
                    newEvents.push(doc.data());
                });
                commit('updateEvents', newEvents);
            });
        },

        async updateEvent({ commit }: any, event: any,) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('events').doc(event.id).update({
                title: event.title,
                startTime: event.startTime,
                endTime: event.endTime,
                date: event.date,
                people: event.people,
                location: event.location,
                bring: event.bring,
                notes: event.notes,
                leaveReminder: event.leaveReminder,
                recurringMonthly: event.recurringMonthly,
                recurringYearly: event.recurringYearly,
                days: event.days,
            }).then(() => {
                this.getEvents;
            })
        },

        async deleteEvent({ commit }: any, event: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('events').doc(event.id).delete().then(() => {
                this.getEvents;
            }).catch((error) => {
                console.error("There was a problem" + error);
            });
        },

        // TASKS ACTIONS ------------------------------------------------------------------------------------------------

        async addTask({ commit }: any, data: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('tasks').add({
                id: null,
                title: data.title,
                dueDate: data.dueDate,
                dueTime: data.dueTime,
                timeEstimate: data.timeEstimate,
                dailyReminder: data.dailyReminder,
                daysInAdvance: data.daysInAdvance,
                notes: data.notes,
            }).then((docRef) => {
                const newId = docRef.id;
                fb.usersCollection.doc(user?.uid).collection('tasks').doc(docRef.id).update({ id: newId })
            }).then(() => {
                commit('updateTasks', data);
            })

        },

        async getTasks({ commit }: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('tasks').orderBy('dueDate').get().then((querySnapshot) => {
                const newTasks: any = [];
                querySnapshot.forEach((doc) => {
                    newTasks.push(doc.data());
                });
                commit('updateTasks', newTasks);
            });
        },

        async updateTask({ commit }: any, task: any,) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('tasks').doc(task.id).update({
                title: task.title,
                dueDate: task.dueDate,
                dueTime: task.dueTime,
                timeEstimate: task.timeEstimate,
                dailyReminder: task.dailyReminder,
                daysInAdvance: task.daysInAdvance,
                notes: task.notes
            }).then(() => {
                this.getTasks;
            })
        },

        async deleteTask({ commit }: any, task: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('tasks').doc(task.id).delete().then(() => {
                this.getTasks;
            }).catch((error) => {
                console.error("There was a problem" + error);
            });
        },

        // TIME LIMIT ACTIONS ------------------------------------------------------------------------------------------------

        async addTimeLimit({ commit }: any, data: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('timelimits').add({
                id: null,
                title: data.title,
                days: data.days,
                duration: data.duration,
            }).then((docRef) => {
                const newId = docRef.id;
                fb.usersCollection.doc(user?.uid).collection('timelimits').doc(docRef.id).update({ id: newId })
            }).then(() => {
                commit('updateTimeLimits', data);
            })

        },

        async getTimeLimits({ commit }: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('timelimits').get().then((querySnapshot) => {
                const newTimeLimits: any = [];
                querySnapshot.forEach((doc) => {
                    newTimeLimits.push(doc.data());
                });
                commit('updateTimeLimits', newTimeLimits);
            });
        },

        async updateTimeLimit({ commit }: any, timelimit: any,) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('timelimits').doc(timelimit.id).update({
                title: timelimit.title,
                days: timelimit.days,
                duration: timelimit.duration,
            }).then(() => {
                this.getTimeLimits;
            })
        },

        async deleteTimeLimit({ commit }: any, timelimit: any) {
            const user = fb.auth.currentUser;
            await fb.usersCollection.doc(user?.uid).collection('timelimits').doc(timelimit.id).delete().then(() => {
                this.getTimeLimits;
            }).catch((error) => {
                console.error("There was a problem" + error);
            });
        },
    },

    mutations: {
        updateNotes(state: SchedulingModel, notes: any[]) {
            state.notes = notes;
        },
        updateAlarms(state: SchedulingModel, alarms: any[]) {
            state.alarms = alarms;
        },
        updateEvents(state: SchedulingModel, events: any[]) {
            state.events = events;
        },
        updateTasks(state: SchedulingModel, tasks: any[]) {
            state.tasks = tasks;
        },
        updateTimeLimits(state: SchedulingModel, timelimits: any[]) {
            state.timelimits = timelimits;
        },
    },

    getters: {

    }
});