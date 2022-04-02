<script>
export default {
    props: {
        newsitem: Object
    }
}
</script>

<template>
    <li class="list-group-item bg-dark">
        <p class="date">
            {{ newsitem.date }}
        </p>
        <p class="news" id="field-text" v-html="newsitem.text">
        </p>
        <ul class="list-group list-group-horizontal border-0 news-links">
            <li class="list-group-item bg-dark py-0 px-1 border-0" v-for="(value, key) in newsitem.links" :key="key">
                <a class="btn btn-sm btn-primary" :href="value">{{key}}</a>
            </li>
        </ul>
    </li>
</template>