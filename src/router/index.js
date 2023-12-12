// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Create from '../views/Create.vue';
import Read from '../views/Read.vue';
import Update from '../views/Update.vue';
import Delete from '../views/Delete.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/create', component: Create },
  { path: '/read', component: Read },
  { path: '/update/:id', component: Update },
  { path: '/delete/:id', component: Delete },
  {
    path: '/api/data', // Replace with your backend API route
    name: 'api-data',
    component: () => import('../views/ApiDataView.vue'), // Create a new view to handle API data
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
