<script>
import NewsItem from '../components/NewsItem.vue'

export default({
    setup() {
        
    },
    created() {
        this.getNewsData().then((data) => {
            this.news_items = data;
        })     
    },
    data () {
        return {
            news_items: null
        }
    },
    components: { NewsItem: NewsItem },
    methods:{
        async getNewsData() {
            const response = await fetch("https://mgruppi.github.io/news/news.json");
            const data = await response.json();
            return data;
        }
    }

})
</script>

<template>
    <div>
        <ul class="list-group" id="news-list">
            <template v-if="!news_items">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="spinner-grow text-white" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </template>
            <template v-else><NewsItem v-for="item in news_items" :key="item.date" :newsitem="item"></NewsItem></template>

        </ul>
    </div>
</template>