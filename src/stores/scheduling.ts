import SchedulingModel from '@/models/scheduling'
import firebase from 'firebase'
import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'


Vue.use(Vuex)

export default({
    state: new SchedulingModel(),

    actions: {
        async addNote({ commit }: any, data: any) {
            await fb.notesCollection.add({
                lastEdited: data.lastEdited,
                contents: data.contents,
            })
            
            commit('updateNotes', data);
        },

        async getNotes({ commit }: any){
            fb.notesCollection.get().then((querySnapshot) => {
                const newNotes: any = [];
                querySnapshot.forEach((doc) => {
                    newNotes.push(doc.data());
                });
                commit('updateNotes', newNotes);
            });
        }
    },

    mutations: {
        updateNotes(state: SchedulingModel, notes: any[]){
            state.notes = notes;
        }
    },
    
    getters: {

    }
});