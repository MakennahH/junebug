import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import SchedulingModule from "@/stores/scheduling";
import router from "../router/index";
import UserModel from "@/models/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: new UserModel(),
    tab: "none",
  },
  actions: {
    async signup({ dispatch }, data) {
      fb.auth.createUserWithEmailAndPassword(data.email, data.password).then(userCredentials => {
        const user = userCredentials.user;
        fb.usersCollection.doc(user?.uid).set({
          email: data.email,
          darkModeOn: false,
          calendarStartHour: new Date('09:00'),
          mealReminder: 0,
          drinkReminder: 0,
          sleepReminder: null,
          medReminder: null,
        });
        dispatch("fetchUserProfile", user);
        router.push("/login");
      });
    },
    async login({ dispatch }, data) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(data.email, data.password);
      dispatch("fetchUserProfile", user);
      router.push("/today");
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", {});
      router.push("/login");
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());
    },
    async changePassword({ commit }, emailAddress) {
      const auth = fb.auth;

      auth.sendPasswordResetEmail(emailAddress)
        .then(function () {
          // Email sent.
        })
        .catch(function (error) {
          // An error happened.
        });
    },
    async getCurrentUserProfile({ commit }){
      const user = fb.auth.currentUser;
      const userProfile = await fb.usersCollection.doc(user?.uid).get();
      commit("setUserProfile", userProfile.data());
    },
    async changeEmail({ commit }, emailAddress) {
      const user = fb.auth.currentUser;

      user?.updateEmail(emailAddress)
        .then(function () {
          commit("setUserProfile", user);
          router.replace("/settings");
        })
        .catch(function (error) {
          // An error happened.
          console.log(error);
        });
    },
    async updateUserProfile({ commit }, data) {
      const user = fb.auth.currentUser;
      fb.usersCollection.doc(user?.uid).update({
        calendarStartHour: data.calendarStartHour,
        mealReminder: data.mealReminder,
        drinkReminder: data.drinkReminder,
        sleepReminder: data.sleepReminder,
        medReminder: data.medReminder,
      }).then(() => {
        commit("setUserProfile", user);
      });
    },
    async setDarkMode({ commit }, isDark) {
      const user = fb.auth.currentUser;
      fb.usersCollection.doc(user?.uid).update({
        darkModeOn: isDark,
      });
      commit("setDarkMode", isDark);
    },
    async getDarkMode({ commit }) {
      await fb.usersCollection
        .doc(fb.auth.currentUser?.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            commit("setDarkMode", doc.data()?.darkModeOn);
          }
        });
    },
  },
  mutations: {
    setUserProfile(state, value) {
      state.userProfile = value;
    },
    setTab(state, tab: string) {
      state.tab = tab;
    },
    setDarkMode(state, isDark: boolean) {
      state.userProfile.darkModeOn = isDark;

      if (isDark) {
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
      }
    },
  },
  modules: {
    scheduling: SchedulingModule,
  },
});
