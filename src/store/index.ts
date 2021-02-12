import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tab: "none",
    darkMode: false,
    // notes: new NotesModel();
  },
  mutations: {
    setTab(state, tab: string){
      state.tab = tab;
    },
    setDarkMode(state, isDark: boolean){
      state.darkMode = isDark;

      if(isDark){
        document.documentElement.classList.add("dark-mode");
      }
      else{
        document.documentElement.classList.remove("dark-mode");
      }
    }
  },
  actions: {},
  modules: {}
});
