<script>
import BlogArticle from '../components/BlogArticle.vue'

export default {
    setup() {        
    },
    created() {
        this.getArticles().then((data) => this.handleArticles(data));
    },
    data() {
        return {
            articles: [],
        }
    },
    mounted() {

    },
    updated() {
    },
    components: {
        BlogArticle
    },
    methods: {
        async getArticles() {
            const response = await fetch("/articles/");
            const data = await response.json();
            return data;
        },

        handleArticles(data) {
            for(let i = 0; i < data.length; ++i)
            {
                        const a = {'data': data[i]}
                        this.articles.push(a);
            }
        },

        scrollTo(elementId) {
            // Scroll to element in page 
            // This is necessary if the app router uses WebHashHistory as #<elementId> will not work in that case
            const top = document.getElementById(elementId).offsetTop;
            window.scrollTo(0, top);
        }
    },
    computed: {
        sortedArticles() {
            // data.sort((a, b) => { return a['mtime'] < b['mtime'] ? 1 : -1});  // Sort by date `mtime`
            const sorted = [...this.articles].sort((a,b) => {return a['data']['mtime'] < b['data']['mtime'] ? 1 : -1});
            return sorted;
        }
    }
}
</script>

<template>
    <div id="article-feed" class="p-2 mt-4">
        <BlogArticle v-for="a in sortedArticles" :key="a['data']['mtime']" 
                                                :filename="a['data']['name']"
                     />
    </div>
    
</template>

<style scoped>
    html {
        scroll-behavior: smooth;
    }

</style>