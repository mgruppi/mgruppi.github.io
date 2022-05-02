<script>
import NewsFeed from '../components/NewsFeed.vue'
export default({
    setup() {
        
    },
    components: { NewsFeed: NewsFeed }
})
</script>



<template>
    <div id="content-home" class="">
        <div class="row justify-content-md-center p-0 m-0">

<!--                    MIDDLE COLUMN-->
            <div class="col-md-9 m-0 mb-2 px-0 pr-2">
                <div id="news-feed" class="card bg-dark news-feed-container pb-2">
                    <div class="card-header">
                        <h2> News </h2>
                    </div>
                    <div class="card-body news-feed">
                        <NewsFeed />
                    </div>
                </div>
            </div>

<!--                    RIGHT COLUMN-->
            <div class="col-sm-0 col-md-3 m-0 px-0">
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
                                <li class="list-group-item bg-dark"><a href="https://twitter.com/GruppiMauricio" target="_blank"><i class="fab fa-twitter"></i>Twitter</a></li>
                                <li class="list-group-item bg-dark"><a href="https://scholar.google.com/citations?user=MHHYhXwAAAAJ" target="_blank"><i class="fas fa-graduation-cap"></i>Google Scholar</a></li>
                                <li class="list-group-item bg-dark"><a href="https://github.com/mgruppi" target="_blank"><i class="fab fa-github"></i>GitHub</a></li>
                                <li class="list-group-item bg-dark"><a href="https://melalab.github.io/index.html" target="_blank"><span><i><img :src="'./mela-logo.png'" width="16" height="16"></i></span>MeLa Lab</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
a:hover{
    color: var(--color6);
}
</style>