/**
 * @file-overview This file configures and exports the Vue Router for the application.
 * It defines the application's routes, including a default redirect and a dynamic
 * route for the folder pages.
 */
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import DevicePage from '../views/DevicePage.vue';

/**
 * Defines the application's routes.
 * @type {Array<RouteRecordRaw>}
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Inbox'
  },
  {
    path: '/folder/:id',
    component: () => import('../views/FolderPage.vue')
  },
  {
    path: '/device',
    component: DevicePage
  }
];

/**
 * Creates the Vue Router instance.
 * @returns {Router} The configured router instance.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
