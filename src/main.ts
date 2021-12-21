import { createApp } from 'vue'
import App from './App.vue'
import {createDirective} from './unit/directive';
import router from './router'
import store from './store'
import {setSentry} from './unit/sentry';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App).use(router).use(store).use(ElementPlus);

createDirective(app);
setSentry(app);


app.mount('#app');
