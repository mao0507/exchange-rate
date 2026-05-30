import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import VueGtag from 'vue-gtag-next'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
if (import.meta.env.VITE_GA_ID) {
  app.use(VueGtag, {
    property: {
      id: import.meta.env.VITE_GA_ID,
    },
  })
}
