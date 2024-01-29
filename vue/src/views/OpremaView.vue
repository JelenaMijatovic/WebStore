<template>
    <div>
      <div v-if="oprema">
        <HeaderC :title="oprema.naziv"/>
        <div class="info">
          <h3>Kategorija</h3>
          {{ oprema.kategorija_id }}
          <h3>Cena</h3>
          {{ oprema.cena }}
          <h3>Tagovi</h3>
          <div class="tagovi" v-for="tag in oprema.tags" :key="tag.id" :zaposlenje="tag">
            <b>{{tag.naziv}}</b>
          </div>
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </template>
  
  <script>
  import HeaderC from '@/components/HeaderC.vue'
  import { mapActions } from 'vuex';
  
  export default {
    name: 'OpremaView',
    components: {
      HeaderC
    },
    data() {
      return{
        oprema: null
      }
    },
    mounted() {
      this.getOprema(this.$route.params.id)
        .then( res => {
          this.oprema = res;
        });
    },
    methods: {
      ...mapActions(['getOprema'])
    }
  }
  </script>
  
  <style scoped>
  .slika{
  float:left; margin-right:20px; margin-bottom:20px;
  width:200px;
  }
  .student{
  text-align:left;
  }
  .info{
  overflow:auto;
  }
  .zaposlenje{
  margin-bottom:20px;
  }
  .zaposlenje .period{
  font-size: 80%;
  }
  </style>
  