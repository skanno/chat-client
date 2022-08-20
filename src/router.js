import config from './config/config.js';
import { createRouter, createWebHistory } from 'vue-router';
import Chat from './components/Chat.vue';

let routes = [];
routes.push({
  path: '/',
  redirect: '/room1'
});
for (let i = 1; i <= config.room_size; i++) {
  routes.push({
    path: `/room${i}`,
    name: `room${i}`,
    component: Chat,
    props: true
  });
}

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
});
