<script>
export default {
    props: {
        newsitem: Object
    }
}
</script>

<template>
    <li class="list-group-item border-0 border-bottom news-item">
        <p class="date">
            {{ newsitem.date }}
        </p>
        <p class="news" id="field-text" v-html="newsitem.text">
        </p>
        <ul class="list-group list-group-horizontal border-0 news-links gap-1">
            <li class="list-group-item news-item-link py-0 px-0 border-0" v-for="(value, key) in newsitem.links" :key="key">
                <a class="btn badge bgPrimary" :href="value">{{key}}</a>
            </li>
        </ul>
    </li>
</template>
