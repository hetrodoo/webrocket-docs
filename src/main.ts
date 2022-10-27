import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'prismjs/themes/prism.css';

createApp(App).use(router).mount('#app');
