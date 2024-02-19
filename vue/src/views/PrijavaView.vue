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
                <label>Adresa</label>
                </b-col>
                <b-col sm="6">
                <b-form-input id="adresa" :state="validnaAdresa" v-model="forma.adresa" rows="4"></b-form-input>
                </b-col>
            </b-row>
        </b-container>
        <br>
        <b-button @click="posalji()" variant="primary">Naruči</b-button>
        </div>
    </div>
  </template>
  
  <script>
  import HeaderC from '@/components/HeaderC.vue'
  import { mapState, mapActions } from 'vuex';
  
  export default {
    name: 'PrijavaView',
    components: {
      HeaderC
    },
    data() {
      return {
        headerTitle: "Naruči opremu",
        statusnaPoruka: null,
        statusnaPorukaTip: null,
        forma: {
            oprema: null,
            user_id: null,
            status_id: "1",
            vreme_narucivanja:new Date(),
            zakazano_vreme: new Date(),
            telefon:"000000000"
        }
      }
    },
    computed:{
        validnaOprema(){
            if(this.forma.oprema == null) return null;
            else if(this.forma.oprema.length > 0) return true
            else return false;
        },
        validnaAdresa(){
            if(this.forma.adresa == null) return null;
            else if(this.forma.adresa.length > 0) return true
            else return false;
        },
      ...mapState([
        'token', 'user'
      ])
    },
    methods:{
        posalji(){
            if(this.validnaOprema && this.validnaAdresa) {
                this.forma.user_id = this.user.userId.toString();
                fetch("http://localhost:9000/narudzbina/", {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
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
        },
      ...mapActions(['getOprema'])
  }
  </script>
  
  <style>
  
  </style>
  