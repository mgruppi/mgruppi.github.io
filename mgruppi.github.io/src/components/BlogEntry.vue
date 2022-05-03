<script>
export default {
    setup() {
        
    },
    data() {
        return {
        
        }
    },
    props: {
        entry: {required: true}
    }
}
</script>

<template>
    <div class="px-2">
        <h2> {{ this.entry.title }}</h2>
        <div class="d-flex gap-2 mt-0"><div class="fw-bold"> {{ this.entry.date }}</div> <div class="badge bg-info text-dark" >{{ entry.author }} </div></div>
        <p> {{ this.entry.content }} </p>
    </div>
</template>

<style scoped>
h2 {
    margin-bottom: 0;
}

p {
    margin-top: 1%;
}
</style>