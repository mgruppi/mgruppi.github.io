<script>
import { yaml } from 'js-yaml'
export default {
    setup() {
        
    },
    mounted() {
        cv_data = yaml.load('/cv.yml');
        console.log(cv_data);
    }
}
</script>

<template>
    
</template>

<style scoped>

</style>