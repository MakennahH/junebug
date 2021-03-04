import Vue from "vue";
import Vuex from "vuex";
import * as fb from '../firebase'
import SchedulingModule from "@/stores/scheduling";
import router from '../router/index'
import SchedulingModel from "@/models/scheduling";
import UserModel from "@/models/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: new UserModel(),
    tab: "none",
    darkMode: false,
  },
  actions: {
    async signup({ dispatch }, data) {
      fb.auth.createUserWithEmailAndPassword(data.email, data.password).then((userCredentials) => {
        var user = userCredentials.user;
        // fb.usersCollection.doc(user?.uid).set({
        //   email: data.email,
        //   darkModeOn: false,
        //   calendarStartHour: null,
        //   reminderTimes: [],
        //   scheduling: { notes: [], alarms: [], events: [], tasks: [], timelimits: [] }
        // });
        // dispatch('fetchUserProfile', user);
        router.push('/login');
      });

    },
    async login({ dispatch }, data) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(data.email, data.password);
      dispatch('fetchUserProfile', user);
      router.push('/today');
    },
    async logout({ commit }) {
      await fb.auth.signOut()

      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      router.push('/login')
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())
    },
    async changePassword({ commit }, emailAddress) {
      var auth = fb.auth;

      auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
      }).catch(function (error) {
        // An error happened.
      });
    },
    async changeEmail({ commit }, emailAddress) {
      var user = fb.auth.currentUser;

      user?.updateEmail(emailAddress).then(function () {
        // Update successful.
      }).catch(function (error) {
        // An error happened.
      });
      //TO DO: KEEP TRACK OF SESSION
    }
  },
  mutations: {
    setUserProfile(state, value) {
      state.userProfile = value
    },
    setTab(state, tab: string) {
      state.tab = tab;
    },
    setDarkMode(state, isDark: boolean) {
      state.darkMode = isDark;

      if (isDark) {
        document.documentElement.classList.add("dark-mode");
      }
      else {
        document.documentElement.classList.remove("dark-mode");
      }
    }
  },
  modules: {
    scheduling: SchedulingModule,
  }
});
