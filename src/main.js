// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ActionsView from './views/ActionsView.vue';
const request = require('postman-request');

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { md1 } from 'vuetify/blueprints';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md1,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

// Attach postman-request to the global properties
app.config.globalProperties.$postmanRequest = request;

app.use(router);
app.use(vuetify);
app.component('CrudComponent', CrudComponent);

app.mount('#app');
