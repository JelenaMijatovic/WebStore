<template>
  <div id="home">
    <HeaderC :title="headerTitle"/>
    <div>
      <button @click="prev()">Prethodno</button>
      ...
      <button @click="next()">Sledeće</button>
    </div>
    <OpremaList v-if="svaOpremaIDs" :opremaIDs="svaOpremaIDs.slice(current*10, current*10+10)"/>
    <p v-else>Lista još nije spremna</p>
  </div>
</template>

<script>
import HeaderC from '@/components/HeaderC.vue'
import OpremaList from '@/components/OpremaList.vue'
import { mapActions, mapState } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    HeaderC, OpremaList
  },
  data(){
    return{
      headerTitle: "Baza audio opreme",
      current: 0
    }
  },
  computed:{
    ...mapState(['svaOpremaIDs'])
  },
  methods:{
    ...mapActions(['fetchSvaOprema']),
    next(){
      if( this.current * 10 < this.svaOpremaIDs.length ){
        this.current++;
      }
    },
    prev(){
      if( this.current > 0){
        this.current--;
      }
    }
  },
  mounted(){
    this.fetchSvaOprema();
  }
}
</script>

<style>

</style>
