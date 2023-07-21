<script>
// import { marked } from 'marked'
// import DOMPurify from 'dompurify'
// import hljs from 'highlight.js'
// import 'highlight.js/styles/base16/solar-flare.css'

export default {
    setup() {
        
    },
    props: {
        filename: {type: String, required: true},
    },
    created() {
        marked.setOptions({
            gfm: true,
            sanitizer: DOMPurify.sanitize
        });
    },
    data() {
        return {
            display_html: ""
        }
    },
    mounted() {
        const response = fetch("/articles/"+this.filename).then((r) => {
            const md = r.text().then((markdown) => {
                    const html = marked.parse(markdown);
                    this.display_html = html;
            });
        });
    },
    updated() {
        hljs.highlightAll();
    }
}
</script>

<template>
    <div>
        <div class="blogArticle mb-2" v-html="this.display_html">
            
        </div>
        <hr class="articleLine">
    </div>
</template>

<style scoped>
    .articleLine {
        border: 4px solid var(--primary);
        border-radius: 5px;
        opacity: 75%;
        width: 50%;
        margin: 0 auto;
        margin-bottom: 4em;
    }
</style>