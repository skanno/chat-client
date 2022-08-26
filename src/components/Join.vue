<template>
  <div>
    <h1 class="h3 mb-3 fw-normal">Chat</h1>
    <div class="form-floating">
      <input type="text" class="form-control" id="userName" v-model="$store.state.userName" v-on:change="$store.commit('checkJoinButtonDisabled')" placeholder="Login Name">
      <label for="userName">Login Name</label>
    </div>
    <div class="form-floating">
      <select class="form-select" id="roomName" v-model="$store.state.roomName" v-on:change="$store.commit('checkJoinButtonDisabled')">
        <option  v-for="i in data.roomSize" :key="i" v-bind:value="`room${i}`">
          room{{i}}
        </option>
      </select>
    </div>
    <button class="w-100 btn btn-lg btn-primary" v-on:click="join" v-bind:disabled="$store.state.joinButtonDisabled">Join</button>
  </div>
</template>

<script>
import config from '../config/config.js';
import {onMounted, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

export default {
  name: 'Join',
  props: {
    roomNo: String
  },
  setup(props, context) {
    const router = useRouter();
    const store = useStore();

    const data = reactive({
      roomSize: 1
    });

    const join = () => {
      router.push({name: store.state.roomName});
    };

    onMounted(() => {
      data.roomSize = config.room_size;
    });

    return {
      data,
      join
    };
  }
}
</script>
