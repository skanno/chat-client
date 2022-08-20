<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link :to="{name: 'room1', params: {roomNo: 1}}" class="nav-link">ルーム1</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'room2', params: {roomNo: 2}}" class="nav-link">ルーム2</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'room3', params: {roomNo: 3}}" class="nav-link">ルーム3</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'room4', params: {roomNo: 4}}" class="nav-link">ルーム4</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'room5', params: {roomNo: 5}}" class="nav-link">ルーム5</router-link>
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
import Chat from './components/Chat.vue'

export default {
  name: 'App',
  components: {
    Chat
  }
}
</script>
