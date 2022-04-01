<script>
export default({
    setup() {
        
    },
})
</script>

<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-link">Home</router-link>
                    <router-link to="/about" class="nav-link">About</router-link>
                </div>
                </div>
            </div>
        </nav>
    </div>
</template>