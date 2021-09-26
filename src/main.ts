import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import {createDirective} from './unit/directive';
import router from './router'
import store from './store'


const app = createApp(App).use(router).use(store);
installElementPlus(app);
createDirective(app);

app.mount('#app');
