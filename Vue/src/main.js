import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as scormJS from './helpers/scormFunctions';

import App from './App.vue'
import router from './router'

import './assets/main.css'

scormJS.Initialize();
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
