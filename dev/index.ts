import App from './App.vue'
import Vue from 'vue'
import {store} from './store'
new Vue({
  render(h) {
    return h(App) 
  },
  store
}).$mount('#app')
