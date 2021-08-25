import { createApp } from 'vue'
import {ElButton, ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification, ElRadio,} from 'element-plus';
import './theme.scss';
import App from './App.vue';

const components = [
    ElButton, ElRadio,
];
const plugins = [
    ElInfiniteScroll,
    ElLoading,
    ElMessage,
    ElMessageBox,
    ElNotification,
];

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
});

plugins.forEach(plugin => {
    app.use(plugin)
});
app.mount('#app');
