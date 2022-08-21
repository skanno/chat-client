import { createStore } from 'vuex';

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
    }
  }
});