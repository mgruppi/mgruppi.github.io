<script>
import PublicationsTable from '../components/PublicationsTable.vue';
export default {
    setup() {
        
    },
    created() {
        this.getPublications().then((data) => {
            this.data = data;
        })     
    },
    data() {
        return{
            data: null
        }
    },
    components: {
        PublicationsTable: PublicationsTable
    },
    methods:  {
        async getPublications() {
            const response = await fetch("https://mgruppi.github.io/publications.json");
            const data = await response.json();
            return data;
        }
    },
    computed: {

    }
}
</script>

<template>
    <div>
        <div class="px-4 py-2">
            <h1>Publications</h1>
        </div>

        <template v-if="!this.data">
                <div class="d-flex align-items-center justify-content-center">
                        <div class="spinner-grow text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
        </template>
        <template v-else>
            <h3>Peer-reviewed</h3>
            <PublicationsTable :data="this.data['peer-reviewed']"></PublicationsTable>
        
            <h3>Other (non-peer-reviewed or non-archival)</h3>
            <PublicationsTable :data="this.data['other']"></PublicationsTable>
      
            <h3>Patent</h3>
            <PublicationsTable :data="this.data['patent']"></PublicationsTable>
        </template>

        <!-- <template v-if="!this.data">
            <div class="d-flex align-items-center justify-content-center">
                    <div class="spinner-grow text-white" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
        </template>
        <template v-else>
        <div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Date</th>
                        <th scope="col">Links</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, idx in listPublications" :key="item.title">
                        <td>{{idx+1}}</td>
                        <td>
                            <div>
                                <div class="pub-title">
                                    {{item.title}}
                                </div>
                                <div class="pub-venue">
                                    {{item.venue}}
                                </div>
                            </div>
                            
                        </td>
                        <td>{{item.date}}</td>
                        <td>
                            <ul class="list-group list-group-horizontal border-0 news-links gap-1">
                                <li class="list-group-item news-item-link py-0 px-0 border-0" v-for="(value, key) in item.links" :key="key">
                                    <a class="btn badge bgPrimary" :href="value">{{key}}</a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </template> -->

    </div>
</template>

<style scoped>
</style>