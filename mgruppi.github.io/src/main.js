import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

// Import components
import Home from './components/Home.vue'
import About from './components/About.vue'
import JogoDaMemoriaView from './components/JogoDaMemoriaView.vue'
import Blog from './components/Blog.vue'

// Define the routes
const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home},
  { path: '/about', component: About },
  { path: '/memoria', component: JogoDaMemoriaView},
  { path: '/blog/', component: Blog}
]

// Create router
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App);
app.use(router);
app.mount('#app');
