import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    narudzbine: [],
    oprema: [],
    svaOpremaIDs: []
  },
  getters: {
  },
  mutations: {
    addNarudzbine(state, narudzbine) {
      state.narudzbine = narudzbine
    },
    addOprema(state, oprema1){
      state.oprema[oprema1.id] = oprema1;
    },
    addSvaOpremaIDs(state, niz){
      state.svaOpremaIDs = niz;
    }
  },
  actions: {
    async fetchNarudzbine({commit}) {
      fetch(`http://localhost:9000/narudzbina/`)
      .then( res=>res.json() )
      .then( data => commit('addNarudzbine', data) );
    },
    async getOprema({commit, state}, opremaID){
      return new Promise((resolve)=>{
        if(state.oprema[opremaID]){
          resolve(state.oprema[opremaID]);
        }
        else{
          fetch(`http://localhost:9000/oprema/${opremaID}`)
            .then( res=>res.json() )
            .then( data=> {
            commit('addOprema', data)
            resolve(data);
          });
        }
      });
    },
    async fetchSvaOprema({commit}){
      fetch("http://localhost:8000/admin/oprema/")
      .then( res=>res.json() )
      .then( data=> commit('addSvaOpremaIDs', data) );
      }
} ,
  modules: {
  }
})
