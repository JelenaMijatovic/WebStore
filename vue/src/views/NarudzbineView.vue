<template>
    <div>
    <HeaderC title="Narudžbine"/>
    <b-pagination
    v-model="currentPage"
    :total-rows="this.narudzbine.length"
    :per-page="perPage"
    aria-controls="tabelaNarudzbina"
    ></b-pagination>
    <b-table striped hover :items="this.narudzbine" :fields="fields" :per-page="perPage" :current-page="currentPage" id="tabelaNarudzbina"></b-table>
    </div>
    </template>

<script>
    import HeaderC from '@/components/HeaderC.vue'
    import { mapActions, mapState } from 'vuex';
    export default {
    name: 'NarudzbineView',
    components: {
        HeaderC
        },
        data(){
            return{
                perPage:10,
                currentPage: 1,
                fields: [{key: "vreme_narucivanja", sortable:true, label:"Vreme Naručivanja"}, "adresa", {key: "status.naziv", sortable:true, label:"status"}, {key: "user.username", sortable:true, label:"korisnik"}]
            }
        },
        computed:{
                    ...mapState(['narudzbine'])
        },
        methods: {
            ...mapActions(['fetchNarudzbine'])
        },
        mounted(){
            this.fetchNarudzbine();
            console.log(this.narudzbine);
        }
    }
</script>

<style scoped>
.table{
text-align:left;
}
</style>