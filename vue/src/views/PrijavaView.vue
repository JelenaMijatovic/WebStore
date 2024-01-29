<template>
    <div>
      <HeaderC :title="headerTitle"/>
      <b-alert :variant="statusnaPorukaTip" :show="statusnaPoruka!=null">
        {{ statusnaPoruka }}
       </b-alert>
       <div>
        <b-container fluid>
            <b-row>
                <b-col sm="3">
                <label for="naziv">Naziv</label>
                </b-col>
                <b-col sm="9">
                <b-form-input id="naziv" :state="validanNaziv" v-model="forma.naziv"></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                <label>
                Opišite koje podatke treba promeniti ili dodati
                </label>
                </b-col>
                <b-col sm="9">
                <b-form-textarea id="textarea" :state="validnaPrijava" v-model="forma.prijava" rows="4"></b-form-textarea>
                </b-col>
            </b-row>
        </b-container>
        <b-button @click="posalji()" variant="primary">Pošalji</b-button>
        </div>
    </div>
  </template>
  
  <script>
  import HeaderC from '@/components/HeaderC.vue'
  
  export default {
    name: 'PrijavaView',
    components: {
      HeaderC
    },
    data() {
      return {
        headerTitle: "Prijava promena podataka",
        statusnaPoruka: null,
        statusnaPorukaTip: null,
        forma: {
            naziv: null,
            promena: null
        }
      }
    },
    computed:{
        validanNaziv(){
            if(this.forma.naziv == null) return null;
            else if(this.forma.naziv.length > 2) return true
            else return false;
        },
        validnaPrijava(){
            if(this.forma.prijava == null) return null;
            else if(this.forma.prijava.length > 2) return true
            else return false;
        }
    },
    methods:{
        posalji(){
            if(this.validanNaziv && this.validnaPrijava) {
                fetch("http://alumni.raf.edu.rs/rs/api/prijava-promene", {
                headers: {
                'Content-Type': 'application/json'
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
                    this.statusnaPoruka = "Prijava za promenu podataka je uspešno poslata";
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
  