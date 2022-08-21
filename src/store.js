import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export const store = createStore({
  state () {
    return {
      loginName: '',
      roomName: '',
      joinButtonDisabled: true
    };
  },
  mutations: {
    checkJoinButtonDisabled: (state) => {
      if (state.loginName !== '' && state.roomName !== '') {
        state.joinButtonDisabled = false;
      }
    },
    roomName: (state, roomName) => {
      state.roomName = roomName;
    },
  },
  plugins: [
    createPersistedState()
  ]
});