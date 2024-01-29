<template>
    <div id="app">
      <Header subtitle="Create account"/>
      <b-form @submit="onSubmit">
        <b-form-group label="Email address:" label-for="email">
          <b-form-input id="email" v-model="form.email" type="email"
  placeholder="Enter email" required></b-form-input>
        </b-form-group>
        <b-form-group label="User Name:" label-for="username">
          <b-form-input id="username" v-model="form.username" 
  placeholder="Enter name" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="password">
          <b-form-input id="password" v-model="form.password" 
  type="password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Register</b-button>
      </b-form>
    </div>
  </template>

  <script>
    import Header from '@/components/HeaderC.vue';
    import { mapActions } from 'vuex';
    export default {
      name: 'RegisterView',
      components: {
        Header
      },
      data() {
        return {
          form: {
            email: '',
            username: '',
            password: '',
          }
        }
      },
      methods: {
        ...mapActions([
          'register'
        ]),
        onSubmit(e) {
          e.preventDefault();
          this.register(this.form);
          this.$router.push({ name: 'home' });
        }
      }
    }
  </script>

  <style scoped>
  </style>
  