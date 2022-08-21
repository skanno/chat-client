<template>
  <div>
    <h1 class="h3 mb-3 fw-normal">Chat</h1>
    <div class="form-floating">
      <input type="text" class="form-control" id="loginName" v-model="$store.state.loginName" v-on:change="$store.commit('checkJoinButtonDisabled')" placeholder="ログイン名">
      <label for="loginName">ログイン名</label>
    </div>
    <div class="form-floating">
      <select class="form-select" id="roomName" v-model="$store.state.roomName" v-on:change="$store.commit('checkJoinButtonDisabled')">
        <option  v-for="i in data.roomSize" :key="i" v-bind:value="`room${i}`">
          ルーム{{i}}
        </option>
      </select>
    </div>
    <button class="w-100 btn btn-lg btn-primary" v-bind:disabled="$store.state.joinButtonDisabled">入室</button>
  </div>
</template>

<script>
import config from '../config/config.js';
import {onMounted, reactive} from 'vue';

export default {
  name: 'Join',
  props: {
    roomNo: String
  },
  setup(props, context) {
    const data = reactive({
      roomSize: 1
    });

    onMounted(() => {
      data.roomSize = config.room_size;
    });

    return {
      data
    };
  }
}
</script>
