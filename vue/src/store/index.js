import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    narudzbine: [],
    oprema: [],
    svaOpremaIDs: [],
    token: [],
    user: []
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
    },
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async fetchNarudzbine({commit, state}) {
      console.log(state.token);
      fetch(`http://localhost:9000/narudzbina/`, {headers:{'Authorization': `Bearer ${state.token}`}})
      .then( res=>res.json() )
      .then( data => commit('addNarudzbine', data) );
    },
    async getOprema({commit, state}, opremaID){
      return new Promise((resolve)=>{
        if(state.oprema[opremaID]){
          resolve(state.oprema[opremaID]);
        }
        else{
          fetch(`http://localhost:9000/oprema/${opremaID}`, {headers:{'Authorization': `Bearer ${state.token}`}})
            .then( res=>res.json() )
            .then( data=> {
            commit('addOprema', data)
            resolve(data);
          });
        }
      });
    },
    async fetchSvaOprema({commit, state}){
      fetch("http://localhost:9000/oprema/", {headers:{'Authorization': `Bearer ${state.token}`}})
      .then( res=>res.json() )
      .then( data=> commit('addSvaOpremaIDs', data) );
      },
      register({ commit }, obj) {
        fetch('http://127.0.0.1:9001/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
        }).then( res => res.json() )
          .then( data => commit('setToken', data.token) );
      },
      login({ commit }, obj) {
        fetch('http://127.0.0.1:9001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( data => {
          if (data.msg) {
            alert(data.msg);
          } else {
            commit('setToken', data.token);
            commit('setUser', data.user)
          }
        });
      }
} ,
  modules: {
  }
})
