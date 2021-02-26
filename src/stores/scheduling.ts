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
                id: null,
                contents: data.contents,
                lastEdited: data.lastEdited,
                prettyLastEdited: data.prettyLastEdited
            }).then((docRef) => {
                const newId = docRef.id;
                fb.notesCollection.doc(docRef.id).update({id: newId})
            }).then(() => {
                commit('updateNotes', data);
            })
            
        },

        async getNotes({ commit }: any){
            await fb.notesCollection.orderBy('lastEdited', 'desc').get().then((querySnapshot) => {
                const newNotes: any = [];
                querySnapshot.forEach((doc) => {
                    newNotes.push(doc.data());
                });
                commit('updateNotes', newNotes);
            });
        },

        async updateNote({ commit }: any, note: any, ){
            await fb.notesCollection.doc(note.id).update({
                contents: note.contents,
                lastEdited: note.lastEdited,
                prettyLastEdited: note.prettyLastEdited,
            }).then(() => {
                this.getNotes;
            })
        },

        async deleteNote({ commit }: any, note: any){
            await fb.notesCollection.doc(note.id).delete().then(() => {
                this.getNotes;
            }).catch((error) => {
                console.error("There was a problem" + error);
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