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
        <h1> {{ this.entry.title }} </h1>
        <div class="d-flex gap-2 mt-0"><div class="fw-bold"> {{ this.entry.date }}</div> <div class="" >{{ entry.author }} </div></div>
        <p> {{ this.entry.content }} </p>

        <div class="img-grid d-flex flex-wrap gap-1 mt-2" v-if="entry.images">
            <div class="img-card border rounded shadow" v-for="i in entry.images" :key="i">
                <img :src="i" class="img-fluid" />
            </div>
        </div>
    </div>
</template>

<style scoped>

.img-card img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    position: relative;
    border-color: #555;
    border-radius: 2%;
}

h2 {
    margin-bottom: 0;
}

p {
    margin-top: 1%;
}
</style>