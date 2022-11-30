import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as scormJS from './helpers/scormFunctions';

import App from './App.vue'

import './assets/main.css'

scormJS.Initialize();
const app = createApp(App)

app.use(createPinia())

app.mount('#app')
