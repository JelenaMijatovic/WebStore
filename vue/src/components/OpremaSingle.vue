<template>
  <div class="oprema" @click="kliknutaOprema(oprema.id)">
    <h3>{{ oprema.naziv }}</h3>
  </div>
</template>

<script>
export default {
  name: 'OpremaSingle',
  props: {
    oprema: Object
  },
  methods:{
    kliknutaOprema(id){
      this.$router.push({ name: 'OpremaView', params: { id: id }
      });
    }
  }
}
</script>

<style scoped>
.oprema{
    width:300px; 
    display:inline-block;
    margin:10px;
    vertical-align: top;
}
.oprema p{
    height:150px;
    margin:0;
    background-color:silver;
    text-align:center;
}
</style>