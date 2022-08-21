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
    <div>
      ルーム{{roomNo ?? '1'}}
      <ul class="list-group text-left" v-html="data.messages"></ul>
      <input v-model="data.sendMessage" autocomplete="off" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import config from '../config/config.js';
import {onMounted, reactive} from 'vue';
import io from 'socket.io-client';

const ws = io(config.ws_url);

export default {
  name: 'Chat',
  props: {
    roomNo: String
  },
  beforeRouteLeave(to, from, next) {
    console.log('Call, beforeRouteLeave().');
    this.leaveRoom(from.name);
    this.joinRoom(to.name);
    next();
  },
  setup(props, context) {
    const data = reactive({
      roomSize: 1,
      sendMessage: '',
      roomName: 'room1',
      messages: ''
    });

    /**
     * 入室します。
     */
    const joinRoom = (roomName) => {
      console.log(`Call, joinRoom(). Room Name: ${roomName}.`);
      ws.emit('join_room', roomName);
      data.roomName = roomName;
    };

    /**
     * 退室します。
     */
    const leaveRoom = (roomName) => {
      console.log(`Call, leaveRoom(). Room Name: ${roomName}.`);
      ws.emit('leave_room', roomName);
      data.messages = '';
    };

    /**
     * メッセージを送信します。
     */
    const sendMessage = () => {
      console.log(`Call, sendMessage(). Room Name: ${data.roomName}. Message: ${data.sendMessage}.`);
      if (data.sendMessage) {
        ws.emit('message', {roomName: data.roomName, body: data.sendMessage});
        data.sendMessage = '';
      }
    };

    onMounted(() => {
      console.log('Call, onMounted().');

      data.roomSize = config.room_size;
      joinRoom(data.roomName);

      /**
       * メッセージを受信します。
       */
      ws.on('message', function(msg) {
        data.messages += `<li class="list-group-item">${msg}</li>`;
      });
    });

    return {
      data,
      joinRoom,
      leaveRoom,
      sendMessage
    };
  }
}
</script>
