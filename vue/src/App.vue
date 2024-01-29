<template>
  <div id="app">
    <img src="@/assets/logo.png">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/narudzbine">Narudžbine</router-link> |
      <router-link to="/prijavi-promenu">Prijavi promenu podataka</router-link>
    </nav>
    <router-view/>
  </div>
</template>

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
