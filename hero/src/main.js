import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faHeart as fasHeart, faLink, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTwitter, faFacebookF, faInstagram, fasHeart, farHeart, faComment, faLink, faShareNodes)


const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
