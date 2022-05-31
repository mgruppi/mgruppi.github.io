<script>
import NewsFeed from '../components/NewsFeed.vue'
import profilePic from '../assets/img/me.jpg'
export default({
    setup() {
        
    },
    data(){
        return {
            name: 'Maurício Gruppi',
            position: 'PhD Candidate',
            field: 'Computer Science',
            school: 'Rensselaer Polytechnic Institute',

            keywords: ["Artificial Intelligence", "Natural Language Processing", "Machine Learning", "Language Representation",
                        "Word Embedding", "Disinformation", "Information Trust"]
        }
    },
    components: { NewsFeed: NewsFeed }
})
</script>


<template>
    <div id="content-home" class="">
        <div class="row justify-content-md-center p-0 m-0">

<!--                    MIDDLE COLUMN-->
            <div class="colm-0 mb-2 px-0 pr-2">
                <div class="row my-1">
                    <div class="d-flex justify-content-center align-items-center col-sm-12 col-md-2 position-relative profile-image">
                        <img :src="'/me.jpg'">
                    </div>

                    <div class="col-sm-12 col-md-4">
                        <h1> {{ this.name }} </h1>
                        <ul class="list-unstyled mx-1 m-0">
                            <li> {{ this.position }}</li>
                            <li> {{ this.field }}</li>
                            <li> {{ this.school }}</li>
                        </ul>
                    </div>

                    <div class="list-tags col-sm-12 col-md-5 d-flex align-items-center">
                        <ul class="list-inline">
                            <li class="list-inline-item" v-for="k in this.keywords" :key="k"><span class="badge rounded-pill bgPrimary"> {{ k }}</span></li>
                        </ul>
                    </div>
                </div>

                <div class="d-flex justify-content-center">
                    <div class="container-fluid list-links d-flex col-md-6 justify-content-evenly flex-wrap rounded-pill bg-dark p-1">
                        <a href="https://github.com/mgruppi"><span class="d-flex flex-column align-items-center "><i class="fab fa-github h3 m-0"></i>GitHub</span></a>
                        <a href="https://scholar.google.com/citations?user=MHHYhXwAAAAJ"><span class="d-flex flex-column align-items-center"><i class="fab fa-google h3 m-0"></i>Google Scholar</span></a>
                        <a href="https://twitter.com/GruppiMauricio"><span class="d-flex flex-column align-items-center"><i class="fab fa-twitter h3 m-0"></i>Twitter</span></a>
                        <a href="https://melalab.github.io/index.html"><span class="d-flex flex-column align-items-center"><span class="mb-1"><i><img :src="'./mela-logo.png'" width="30" height="30"></i></span>MeLa Lab</span></a>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div id="news-feed" class="card bg-dark news-feed-container pb-2 mt-3">
                            <div class="card-header py-0">
                                <h4 class="m-0"> News </h4>
                            </div>
                            <div class="card-body news-feed">
                                <NewsFeed />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>