import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

// Use v-calendar, v-date-picker & v-popover components
Vue.use(VCalendar, {
  firstDayOfWeek: 2,  // Monday
})

Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyB4ujoWOVtd6xHKeHN-dMqOhz2K5uukiVY",
  authDomain: "contingency-2097a.firebaseapp.com",
  databaseURL: "https://contingency-2097a.firebaseio.com",
  projectId: "contingency-2097a",
  storageBucket: "contingency-2097a.appspot.com",
  messagingSenderId: "644722750435"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
