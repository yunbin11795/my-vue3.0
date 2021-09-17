import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import {createDirective} from './unit/directive';
import router from './router'


const app = createApp(App).use(router);
installElementPlus(app);
createDirective(app);

app.mount('#app');
