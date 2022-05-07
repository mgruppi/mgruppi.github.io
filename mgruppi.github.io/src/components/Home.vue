<script>
import NewsFeed from '../components/NewsFeed.vue'
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
                        "Word Embeddings", "Disinformation", "Information Trust"]
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
                    <div class="d-flex justify-content-center col-sm-12 col-md-2 position-relative profile-image">
                        <img :src="'./me.jpg'">
                    </div>

                    <div class="col-sm-12 col-md-4">
                        <h1> {{ this.name }} </h1>
                        <ul class="list-unstyled mx-1">
                            <li> {{ this.position }}</li>
                            <li> {{ this.field }}</li>
                            <li> {{ this.school }}</li>
                        </ul>
                    </div>

                    <div class="col-sm-12 col-md-5 d-flex align-items-center">
                        <ul class="list-inline">
                            <li class="list-inline-item" v-for="k in this.keywords" :key="k"><span class="badge rounded-pill bgPrimary"> {{ k }}</span></li>
                        </ul>
                    </div>
                </div>

                <div class="d-flex justify-content-center">
                    <div class="d-flex col-md-6 justify-content-evenly flex-wrap rounded-pill bg-dark p-1">
                        <a href="https://twitter.com/GruppiMauricio"><span class="d-flex flex-column align-items-center"><i class="fab fa-twitter h3 m-0"></i>Twitter</span></a>
                        <a href="https://scholar.google.com/citations?user=MHHYhXwAAAAJ"><span class="d-flex flex-column align-items-center"><i class="fab fa-google h3 m-0"></i>Google Scholar</span></a>
                        <a href="https://github.com/mgruppi"><span class="d-flex flex-column align-items-center "><i class="fab fa-github h3 m-0"></i>GitHub</span></a>
                        <a href="https://melalab.github.io/index.html"><span class="d-flex flex-column align-items-center"><span class="mb-1"><i><img :src="'./mela-logo.png'" width="30" height="30"></i></span>MeLa Lab</span></a>
                    </div>
                </div>

                <div id="news-feed" class="card bg-dark news-feed-container pb-2 mt-2">
                    <div class="card-header">
                        <h4> News </h4>
                    </div>
                    <div class="card-body news-feed">
                        <NewsFeed />
                    </div>
                </div>
            </div>

<!--                    RIGHT COLUMN-->
            <!-- <div class="col-sm-0 col-md-3 m-0 px-0">
                <div class="card bg-dark mb-0">
                    <div class="card-body d-flex flex-column align-items-center">
                        <img :src="'./me.jpg'" class="rounded-circle" style="width: 150px; margin-bottom: 4px; border-style: solid; border-width: 2px;">
                    </div>
                    <p class="text-center" style="font-weight:bold; font-size:16pt; margin-bottom: 2px;">
                        Maurício Gruppi
                    </p>
                    <p class="text-center">
                            PhD Candidate <br/>
                            Computer Science <br/>
                            Rensselaer Polytechnic Institute
                    </p>
                        <div class="card-footer">
                        </div>
                </div>
                <div class="card bg-dark">
                    <div class="card-header">
                        <h5> Links </h5>
                    </div>
                    <div class="card-body">
                        <div class="container">
                            <ul class="list-group list-group-flush list-quick-links">
                                <li class="list-group-item bg-dark"><a href="https://twitter.com/GruppiMauricio"><i class="fab fa-twitter"></i>Twitter</a></li>
                                <li class="list-group-item bg-dark"><a href="https://scholar.google.com/citations?user=MHHYhXwAAAAJ"><i class="fas fa-graduation-cap"></i>Google Scholar</a></li>
                                <li class="list-group-item bg-dark"><a href="https://github.com/mgruppi"><i class="fab fa-github"></i>GitHub</a></li>
                                <li class="list-group-item bg-dark"><a href="https://melalab.github.io/index.html"><span><i><img :src="'./mela-logo.png'" width="16" height="16"></i></span>MeLa Lab</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<style scoped>

</style>