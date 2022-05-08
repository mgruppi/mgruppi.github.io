<script>
import BlogEntry from '../components/BlogEntry.vue'
export default {
    setup() {
        
    },
    components: {
        BlogEntry: BlogEntry
    },
    created() {
        this.getNewsData().then((data) => {
            this.entries = data;
        })  
    },
    data() {
        return {
            entries: [
            ],
            selected: 0,
        }
    },
    methods: {
        async getNewsData() {
            const response = await fetch("https://mgruppi.github.io/blog.json");
            const data = await response.json();
            return data;
        }
    },
    computed: {
        sortedEntries() {
            if (this.entries) {
                const sorted = [...this.entries].sort((a,b) => { return a.date > b.date ? -1 : 1 });
                return sorted;
            }
            else {
                return [];
            }
        }
    }
}
</script>

<template>
    <div class="d-flex mt-4">
        <!-- LEFT COL -->

        <!-- MIDDLE COL -->
        <div class="col-9">
            <div id="blogFeed" class="blog-feed">
                <BlogEntry v-for="e in sortedEntries" :key="e" :entry="e" class="blog-entry"></BlogEntry>
            </div>
        </div>

        <!-- RIGHT COL -->
        <div class="col-3">
            <div class="blog-archive">
                <h5>Archive</h5>
                <ul class="list-group">
                    <li v-for="e in sortedEntries" :key="e" class="list-group-item list-group-item-dark"><div class="d-flex justify-content-between"><span>{{ e.title }}</span> <span>{{ e.date }}</span></div></li>
                </ul>
            </div>
        </div>

    </div>
</template>

<style scoped>

.blog-feed .blog-entry{
    margin-bottom: 8%;
}

</style>