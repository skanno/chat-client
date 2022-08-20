import { createRouter, createWebHistory } from 'vue-router';
import Chat from './components/Chat.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'room1',
      component: Chat,
      props: true
    },
    {
      path: '/room2',
      name: 'room2',
      component: Chat,
      props: true
    },
    {
      path: '/room3',
      name: 'room3',
      component: Chat,
      props: true
    },
    {
      path: '/room4',
      name: 'room4',
      component: Chat,
      props: true
    },
    {
      path: '/room5',
      name: 'room5',
      component: Chat,
      props: true
    },
  ]
});
