<template>
    <router-view />
</template>

<script>
import config from './config/config.js';
import Chat from './components/Chat.vue'
import {reactive} from 'vue';

export default {
  name: 'App',
  components: {
    Chat
  },
  setup(props, context) {
    const data = reactive({
      roomSize: config.room_size
    });

    return {
      data
    };
  }
};
</script>
