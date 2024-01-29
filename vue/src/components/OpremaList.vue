<template>
    <div>
        <OpremaSingle v-for="oprema1 in oprema" :key="oprema1.id" :oprema="oprema1"/>
        <hr>
    </div>
</template>

<script>
import OpremaSingle from '@/components/OpremaSingle.vue';
import { mapActions} from 'vuex';

export default {
    name: 'OpremaList',
    components: {
        OpremaSingle
    },
    data() {
        return {
            oprema: []
        }
    },
    props: {
        opremaIDs: Array
    },
    watch: {
        opremaIDs(nVal) {
            this.oprema = [];

            nVal.map( obj => {
                this.getOprema(obj.id).then( oprema1 => this.oprema.push(oprema1))
                });
        }
    },
    mounted() {
        this.opremaIDs.map( obj => {
            this.getOprema(obj.id).then( oprema1 => this.oprema.push(oprema1) );
        });
    },
    methods: {
        ...mapActions(['getOprema'])
    }
}
</script>

<style scoped>
</style>