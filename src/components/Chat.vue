<template>
  <div>
    <ul v-html="data.messages"></ul>
    <input v-model="data.sendMessage" autocomplete="off" />
    <button @click="send">Send</button>
  </div>
</template>

<script>
import {onMounted, reactive} from 'vue';
import io from 'socket.io-client';

const ws = io(`http://dev.s-kanno.net:3000`);

export default {
  name: 'Chat',
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
        data.messages += `<li>${msg}</li>`;
      });
    });

    return {
      data,
      send
    };
  }
}
</script>
