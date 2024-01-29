<template>
    <div class="header">
        <h1>{{ title }}</h1>
    </div>
</template>

<script>
export default {
    name: 'HeaderC',
    props: {
        title: String
    }
}
</script>

<style scoped>
.header{
    font-family: 'Roboto', serif;
    text-align: center;
}
</style>
