<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li v-for="i in data.roomSize" :key="i" class="nav-item">
                <router-link :to="{name: `room${i}`, params: {roomNo: i}}" class="nav-link">room{{i}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div>
      {{$store.state.roomName}}
      <table v-html="data.messages" class="table table-striped table-hover"></table>
      <input v-model="data.sendMessage" autocomplete="off" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import config from '../config/config.js';
import {onMounted, reactive} from 'vue';
import io from 'socket.io-client';
import {useStore} from 'vuex';

const ws = io(config.chat_server_url);

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
    const store = useStore();
    const data = reactive({
      roomSize: 1,
      messageList: [],
      sendMessage: '',
      messages: ''
    });

    /**
     * 入室します。
     */
    const joinRoom = (roomName) => {
      console.log(`Call, joinRoom(). Room Name: ${roomName}.`);
      ws.emit('join_room', roomName);
      store.commit('roomName', roomName);
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
      console.log(`Call, sendMessage(). Room Name: ${store.state.roomName}. Message: ${data.sendMessage}.`);
      if (data.sendMessage) {
        ws.emit('send_message', {
          roomName: store.state.roomName,
          userName: store.state.userName,
          message: data.sendMessage
        });
        data.sendMessage = '';
      }
    };

    const refreshShowMassageList = () => {
        data.messages = '';
        data.messageList.forEach((message, index) => {
          console.log(message);
          data.messages += `
            <tr>
              <td class="col-md-2"><div class="float-start">${message.userName}</div></td>
              <td class="col-md-7"><div class="float-start">${message.message}</div></td>
              <td class="col-md-3"><div class="float-end">${message.createAt}</div></td>
            </tr>`;
        });
    };

    onMounted(() => {
      console.log('Call, onMounted().');
      data.roomSize = config.room_size;
      joinRoom(store.state.roomName);

      /**
       * 過去のメッセージを受信します。
       */
      ws.on('show_old_message_list', function(messageList) {
        data.messages = '';
        data.messageList = messageList;
        refreshShowMassageList();
      });

      /**
       * メッセージを受信します。
       */
      ws.on('show_message', function(oneMessage) {
        data.messageList.shift();
        data.messageList.push(oneMessage);
        refreshShowMassageList();
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
