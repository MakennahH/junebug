import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        notes: [],
        alarms: [],
        events: [],
        tasks: [],
        timelimits: [],
    },

    actions: {
        async createPost({ state, commit }, note) {
            await fb.notesCollection.add({
                id: 1,
                lastEdited: new Date(),
                contents: note.contents,
            })
        }
    }
});