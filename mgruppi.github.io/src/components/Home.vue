<script>
import NewsFeed from '../components/NewsFeed.vue'

export default({
    setup() {
        
    },
    data(){
        return {
            name: 'Maurício Gruppi, PhD',
            position: 'Postdoctoral Researcher at <a href="https://idea.rpi.edu/">IDEA</a>',
            field: 'Computer Science',
            school: 'Rensselaer Polytechnic Institute',

            keywords: ["Artificial Intelligence", "Natural Language Processing", "Machine Learning", "Representation Learning",
                        "Computational Sociolinguistics"],
        }
    },
    components: { 
                    NewsFeed: NewsFeed 
                }
})
</script>


<template>
    <div id="content-home" class="">
        <div class="row justify-content-md-center p-0 m-0">

<!--                    MIDDLE COLUMN-->
            <div class="col m-0 mb-2 px-0 pr-2">
                <div class="row my-1">
                    <div class="d-flex justify-content-center align-items-center col-sm-12 col-md-2 position-relative profile-image">
                        <img :src="'/me.jpg'">
                    </div>

                    <div class="col-sm-12 col-md-5">
                        <h1> {{ this.name }} </h1>
                        <ul class="list-unstyled mx-1 m-0">
                            <li> <div v-html="this.position"></div></li>
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
                    <div class="container-fluid list-links d-flex col-md-6 justify-content-evenly flex-wrap rounded-pill p-1">
                        <a href="https://github.com/mgruppi"><span class="d-flex flex-column align-items-center "><i class="fab fa-github h3 m-0"></i>GitHub</span></a>
                        <a href="https://scholar.google.com/citations?user=MHHYhXwAAAAJ"><span class="d-flex flex-column align-items-center"><i class="fab fa-google h3 m-0"></i>Google Scholar</span></a>
                        <a href="https://twitter.com/GruppiMauricio"><span class="d-flex flex-column align-items-center"><i class="fab fa-twitter h3 m-0"></i>Twitter</span></a>
                        <a href="https://www.linkedin.com/in/maur%C3%ADcio-gruppi-8760b362/"><span class="d-flex flex-column align-items-center"><i class="fab fa-linkedin-in h3 m-0"></i>LinkedIn</span></a>
                        <a href="https://melalab.github.io/index.html"><span class="d-flex flex-column align-items-center"><span class="mb-1"><i><img :src="'./mela-logo.png'" width="30" height="30"></i></span>MeLa Lab</span></a>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <div class="intro-pane p-4">
                        <p>I work on Natural Language Processing <b>methods</b> and <b>applications</b> to linguistic shift detection.</p>
                        <p>
                            The focus of my research is to model the linguistic differences that can be inferred from data, 
                            and to leverage them to improve the predictions and domain adaptations of language models. 
                            Such linguistic shifts are driven by contextual differences between sources across time and domain. 
                        </p>
                        <p>    
                            Language intricacies and biases present in a source's data are carried over to the language models trained on them. 
                            This allows us to train or <i>fine tune</i> language models on a source's data to expose the contextual correlations of word usage.
                        </p>
                        <p>
                            I have developed a method to <a href='https://ojs.aaai.org/index.php/AAAI/article/download/17525/17332'><b>improve linguistic shift detection</b></a>, 
                            have shown how these shifts can be <a href='https://www.aaai.org/AAAI22Papers/DEMO-00312-GruppiM.pdf'><b>explained</b></a> through contextual words and 
                            in sentences, 
                            and have discovered that semantic shift can be a <a href='https://arxiv.org/pdf/2205.07970'><b>strong indicator</b></a> of news source reliability.
                        </p>
                        <p>
                            Much of my work is applied to <b>misinformation detection</b> (sometimes called "<i>fake news</i>") with the goal of exposing the linguistic differences between sources of misinformation 
                            from reliable sources.    
                        </p>
                        </div>
                    </div>
                    <div class="col-5">
                        <div id="news-feed" class="card pb-2">
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
.intro-pane a {
    color: var(--primary-text);
}

</style>