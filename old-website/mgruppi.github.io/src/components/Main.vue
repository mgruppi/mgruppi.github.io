<script>
// Components
import Navbar from './Navbar.vue'
import Content from './Content.vue'
import Footer from './Footer.vue'

// // Third-party
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap'
// import 'vue-router'

export default {
    setup() {

    },
    data() {
        return {
                darkMode: true
        }
    },
    components: {
        Navbar: Navbar,
        Content: Content,
        Footer: Footer
    },
    methods: {
        toggleDarkMode()
        {
            this.darkMode = !this.darkMode;

            if(this.darkMode){
                document.body.classList.remove('body-light');
            }
            else{
                document.body.classList.add('body-light');
            }
        }
    }
}
</script>

<template>

<div>
    <header>
    <Navbar :darkMode="this.darkMode" @toggleEvent="toggleDarkMode"/>
    </header> 
    <main>
        <Content />
        <Footer />
    </main>

</div>
</template>

