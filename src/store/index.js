import { createStore } from 'vuex';
import users from "../lib/user";
import _ from "lodash"
import moment from 'moment'
import axios from 'axios'

const db = "https://nexus-app.dev.netlands.de/db/Parser.php"; 

export default createStore({
  state: { 
    initialized : false,
    loggedIn: false,
    loggedInUser : {},
    selectedDate: moment(),
    theme: 'darkmode',
    db: [],
  }, 
  
  mutations: {

    loginUser(state, { userId, password }){
      const user = users.find(user => {
        return (user.id == userId && user.password == password);
      });
      state.loggedIn = user!=null
      if(state.loggedIn) {
        state.loggedInUser = _.clone(user)
        localStorage.setItem('knumber', userId);
      }
    },

    logoutUser(state){
      state.loggedIn = false
      state.loggedInUser = null
      localStorage.clear();
    },

    init(state){
      
      let userId = localStorage.getItem('knumber')      
      if(!userId) {
        state.initialized = true;
      }
      const user = users.find(user => {
        return user.id == userId;
      });
      state.loggedIn = user!=null
      if(state.loggedIn) {
        state.loggedInUser = _.clone(user)
      } 
      state.initialized = true;
    },

    async db(state) {
      let parser = await axios.get(db);
      state.db = parser.data;
    },

    date(state, date){
      state.selectedDate = date;
    },

    themeSwitch(state){
      if(state.theme == 'darkmode'){
        state.theme = ''
        localStorage.setItem('theme', 'darkmode');
      }else{
        state.theme = 'darkmode';
        localStorage.removeItem("theme");
      }      
    },
    busy(state, busy) {
      state.busy = busy;
    }
  },

  actions: { 
    
  },

  getters: {
    storeInitialized(state) { 
      return state.initialized 
    },
    loggedIn(state){
      return state.loggedIn
    },
    loggedInUser(state){
      return state.loggedInUser
    },
    userBadges(state) {
      if(state.loggedInUser) {
        return state.loggedInUser.badges || []
      }
      else {
        return []
      }
    },
    selectedDate(state){
      return state.selectedDate;
    },
    theme(state){
      return state.theme;
    },
    dbItems(state){
      return state.db.items;
    },
    dbSlides(state){
      return state.db.slides;
    },
  },

})