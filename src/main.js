import './assets/main.css'
import './styles.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import toast from 'primevue/toast'
import 'primeicons/primeicons.css';

const app = createApp(App)

app.use(router)

app.use(ToastService);
app.component('AppToast', toast)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false
    }
  }
});

app.mount('#app')
