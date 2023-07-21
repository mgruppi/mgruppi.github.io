<script>
export default({
    setup() {

    },
    methods:{
        toggleColor(){
            console.log(document.getElementById('color-switch').checked)
        },

        toggleDarkMode(){
            this.$emit("toggleEvent");
        }
    },
    props: {
        darkMode: Boolean
    }
})
</script>

<template>
    <div class="container p-0">
        <nav class="navbar navbar-expand-lg">
              <div class="container-fluid">
                <div class="navbar navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <!-- <span class="navbar-toggler-icon" style="stroke:'red'"></span> -->
                    <i class="fas fa-bars"></i>
                </div>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <router-link to="/" class="nav-link">Home</router-link>
                        <router-link to="/publications" class="nav-link">Publications</router-link>
                        <router-link to="/about" class="nav-link">About</router-link>
                    </div>
                </div>
                <div class="darkModeButton d-flex flex-grow-1 justify-content-end px-2 mb-4" @click="toggleDarkMode()">
                        <Transition>
                            <i v-if="this.darkMode" class="fas fa-moon position-absolute"></i>
                            <i v-else class="fas fa-sun position-absolute"></i>
                        </Transition>
                </div>
            </div>
        </nav>

    </div>
</template>

<style scoped>
.router-link-active {
    background-color: var(--primary);
    border-radius: 5%;
}

@media (prefers-color-scheme: dark){
    a:focus{
        color: var(--text-light);
    }
}

@media (prefers-color-scheme: light) {
    a:focus {
        color: var(--text-dark);
    }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>