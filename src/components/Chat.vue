<template>
  <div>
    ルーム{{roomNo ?? '1'}}
    <ul class="list-group text-left" v-html="data.messages"></ul>
    <input v-model="data.sendMessage" autocomplete="off" />
    <button @click="send">Send</button>
  </div>
</template>

<script>
import {onMounted, reactive} from 'vue';
import io from 'socket.io-client';
import config from '../config/config.js';

const ws = io(config.ws_url);

export default {
  name: 'Chat',
  props: {
    roomNo: String
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  setup(props, context) {
    const data = reactive({
      sendMessage: '',
      messages: ''
    });

    const send = () => {
      if (data.sendMessage) {
        ws.emit('message', data.sendMessage);
        data.sendMessage = '';
      }
    };

    onMounted(() => {
      ws.on('message', function(msg) {
        data.messages += `<li class="list-group-item">${msg}</li>`;
      });
    });

    return {
      data,
      send
    };
  }
}
</script>
