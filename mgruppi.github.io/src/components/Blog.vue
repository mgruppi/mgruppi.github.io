<script>
import BlogEntry from '../components/BlogEntry.vue'
export default {
    setup() {
        
    },
    components: {
        BlogEntry: BlogEntry
    },
    data() {
        return {
            entries: [
                {
                    date: '2022-01-01',
                    title: 'Latest Entry',
                    content: 'Lorem Ipsum...',
                    author: 'Maurício',
                },
                {
                    date: '2021-12-01',
                    title: 'First Entry',
                    content: 'Lorem Ipsum Lorem...',
                    author: 'Maurício',
                }
            ],
            selected: 0,
        }
    },
}
</script>

<template>
    <div class="d-flex mt-4">
        <!-- LEFT COL -->

        <!-- MIDDLE COL -->
        <div class="col-9">
            <div id="blogFeed" class="blog-feed">
                <BlogEntry v-for="e in this.entries" :key="e" :entry="e" class="blog-entry"></BlogEntry>
            </div>
        </div>

        <!-- RIGHT COL -->
        <div class="col-3">
            <div class="blog-archive">
                <h5>Archive</h5>
                <ul class="list-group">
                    <li v-for="e in entries" :key="e" class="list-group-item list-group-item-dark"><div class="d-flex justify-content-between"><span>{{ e.title }}</span> <span>{{ e.date }}</span></div></li>
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