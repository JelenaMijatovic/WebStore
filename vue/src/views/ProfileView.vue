<template>
    <div>
      <HeaderC :title="headerTitle"/>
      <div class="info">
          <h3>Username</h3>
          {{ this.user.user }}
          <h3>Email</h3>
          {{ this.user.email }}
      </div>
    </div>
  </template>
  
  <script>
  import HeaderC from '@/components/HeaderC.vue'
  import { mapState } from 'vuex';
  export default {
    name: 'ProfileView',
    
    components: {
      HeaderC
    },
    data() {
      return {

      }
    },
    computed:{
      ...mapState([
        'token', 'user'
      ])
    },
    methods:{
        
        }
  }
  </script>
  
  <style>
  
  </style>
  