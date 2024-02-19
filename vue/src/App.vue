<template>
  <div id="app">
    <img src="@/assets/logo.png">
    <nav>
      <router-link to="/">Oprema</router-link> |
      <router-link to="/narudzbine">Narudžbine</router-link> |
      <router-link to="/prijavi-promenu">Naruči</router-link> |
      <router-link v-if="!token" to="/register">Register | </router-link>
      <router-link v-if="!token" to="/login">Log In</router-link>
      <div v-else>
      <router-link to="/profile">Profil</router-link>
      <b-nav-item  @click="logout()"> | Log Out</b-nav-item>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
      ...mapState([
        'token'
      ])
  },
  methods: {
      ...mapMutations([
        'removeToken',
        'setToken'
      ]),
      logout() {
        this.removeToken();
      }
    },
  mounted() {
    if (localStorage.token) {
      this.setToken(localStorage.token);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
