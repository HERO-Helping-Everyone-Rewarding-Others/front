import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faHeart as fasHeart, faLink, faShareNodes, faXmark, faUsers, faBars, faBookmark as fasBookmark, faStar as fasStar, faPenToSquare, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faComment, faStar, faUser, faHand, faBookmark as farBookmark, faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTwitter, faFacebookF, faInstagram, fasHeart, farHeart, faComment, faLink, faShareNodes, fasStar, farStar, faUser, faPenToSquare, faXmark, faUsers, faBars, faHand, fasBookmark, farBookmark, faArrowLeft )


const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
