<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li v-for="i in data.roomSize" :key="i" class="nav-item">
                <router-link :to="{name: `room${i}`, params: {roomNo: i}}" class="nav-link">ルーム{{i}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div><router-view></router-view></div>
  </div>
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
