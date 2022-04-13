<script>
export default {
    setup() {
        
    },
    props: {
        text: {
            type: String,
            default: null
        },
        animation: {
            type: String,
            default: null
        },
        delay: {
            type: Number,
            default: 0.15
        },
        duration: {
            type: String,
            default: "2s"
        }
    }
}
</script>

<template>
    <div class="animation-group">
        <span v-for="(c, idx) in text" :key="idx" :style="{'animation-delay': (delay*idx) + 's', 'animation-duration': duration}" :class="animation" class="m-1 animation-item"> {{ c }}</span>
    </div>
</template>

<style scoped>
.animation-group {
    font-size: 64px;
    font-weight: bold;
}

.animation-item {
    display: inline-block;
}

.snake {
    animation-name: snake;
    animation-timing-function: linear;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

@keyframes snake {
    0% {
        transform: translateY(0);
    }
    33% {
        transform: translateY(-25%);
        animation-timing-function: ease-in;
    }
    66% {
        transform: translateY(25%);
        animation-timing-function: ease-in;
    }
    100% {
        transform: translateY(0);
        animation-timing-function: linear;
    }
}


.spinning-linear {
    animation-name: spinning;
    animation-timing-function: linear;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

.bouncy {
    animation-name: bounce;
    animation-timing-function: ease;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    transform-origin: bottom;
}

@keyframes spinning {
    0% {
        transform: rotate(0)
    }
    100% {
        transform: rotate(360deg)
    }
}


@keyframes bounce {
    0% {
        transform: translate(0);
    }
    7% {
        transform: translate(0) scale(1.02, 0.98);
    }
    25% {
        transform: translate(0,-25%) scale(0.93, 1.07);
    }
    50% {
        transform: translate(0, 0);
        animation-timing-function: ease;
    }
    50% {
        transform: scale(1.1, 0.9);
        animation-timing-function: ease;
    }
    100% {
        transform: translate(0) scale(1);
    }
}

.bounce-in{
    animation-name: bounce-in;
    animation-timing-function: linear;
    animation-duration: 4s;
    animation-iteration-count: 1;
    transform-origin: bottom;
    opacity: 0%;
    animation-fill-mode: forwards;
}

@keyframes bounce-in {
    0% {
        transform: translateY(-200%);
        opacity: 100%;
    }
    20% {
        transform: translateY(5%);
    }
    25% {
        transform: translateY(-5%);
    }
    27% {
        transform: translateY(1%);
    }
    32% {
        transform: translateY(-1%);
    }
    35% {
        transform: translateY(0);
    }
    100% {
        opacity: 100%;
    }
}

</style>