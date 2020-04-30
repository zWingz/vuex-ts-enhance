import App from './App'
import Vue from 'vue'
import {store} from './store'
new Vue({
  render(h) {
    return h(App) 
  },
  store
}).$mount('#app')
