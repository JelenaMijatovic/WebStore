<template>
    <div>
      <HeaderC :title="headerTitle"/>
      <b-alert :variant="statusnaPorukaTip" :show="statusnaPoruka!=null">
        {{ statusnaPoruka }}
       </b-alert>
       <div>
        <b-container fluid>
            <b-row>
                <b-col sm="4">
                <label for="oprema">Oprema</label>
                </b-col>
                <b-col sm="6">
                <b-form-input id="oprema" :state="validnaOprema" v-model="forma.oprema"></b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="4">
                <label>Komada</label>
                </b-col>
                <b-col sm="6">
                <b-form-input id="textarea" :state="validniKomadi" v-model="forma.komadi" rows="4"></b-form-input>
                </b-col>
            </b-row>
        </b-container>
        <br>
        <b-button @click="posalji()" variant="primary">Naruci</b-button>
        </div>
    </div>
  </template>
  
  <script>
  import HeaderC from '@/components/HeaderC.vue'
  import { mapState } from 'vuex';
  
  export default {
    name: 'PrijavaView',
    components: {
      HeaderC
    },
    data() {
      return {
        headerTitle: "Naruci opremu",
        statusnaPoruka: null,
        statusnaPorukaTip: null,
        forma: {
            oprema: null,
            promena: null
        }
      }
    },
    computed:{
        validnaOprema(){
            if(this.forma.oprema == null) return null;
            else if(this.forma.oprema.length > 0) return true
            else return false;
        },
        validniKomadi(){
            if(this.forma.komadi == null) return null;
            else if(this.forma.komadi.length == this.forma.oprema.length) return true
            else return false;
        },
        computed: {
      ...mapState([
        'token'
      ])
  },
    },
    methods:{
        posalji(token){
            if(this.validnaOprema && this.validniKomadi) {
                fetch("http://localhost:9000/narudzbina/", {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify(this.forma)
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                if(res.error){
                    this.statusnaPoruka = res.error;
                    this.statusnaPorukaTip = 'danger';
                } else {
                    this.statusnaPoruka = "Narudzbina je uspešno poslata";
                    this.statusnaPorukaTip = 'success';
                }
            });
            }
            else{
                return;
            }
            }
        }
  }
  </script>
  
  <style>
  
  </style>
  