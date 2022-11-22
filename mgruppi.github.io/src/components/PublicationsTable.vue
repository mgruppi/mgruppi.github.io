<script>
export default {
    setup() {
        
    },
    props:{
        data: {type: Object, default: null}
    },
    computed: {
        listPublications() {
            if (!this.data){
                return null;
            }
            else{
                return this.data;
            }
            
        }
    }
}
</script>


<template>
    <div>
        <template v-if="!this.data">
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
                            <th scope="col-1">#</th>
                            <th class="col-9" scope="col">Title</th>
                            <th scope="col-1">Date</th>
                            <th scope="col-1">Links</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item, idx in listPublications" :key="item.title">
                            <td>{{idx+1}}</td>
                            <td>
                                <div>
                                    <div class="pub-title user-select-all">
                                        {{item.title}}
                                    </div>
                                    <div class="pub-authors">
                                        {{item.authors}}
                                    </div>
                                    <div class="pub-venue fst-italic">
                                        {{item.venue}}
                                    </div>
                                </div>
                                
                            </td>
                            <td>{{item.date}}</td>
                            <td>
                                <div class="d-flex flex-wrap">
                                    <ul class="list-inline list-group-horizontal border-0 news-links gap-0">
                                        <li class="list-inline-item news-item-link py-0 px-0 border-0" v-for="(value, key) in item.links" :key="key">
                                            <a class="btn badge bgPrimary" :href="value">{{key}}</a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
    </div>
</template>

<style scoped>
.pub-venue{
    opacity: 80%;
    font-size: 0.8em;
}
.pub-authors{
    opacity: 80%;
    font-size: 0.8em;
}
</style>