import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faSun, faCircleInfo, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)
library.add(faSun)
library.add(faCircleInfo)
library.add(faPlus)

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')