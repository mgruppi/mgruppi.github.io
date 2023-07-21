<script>
import AnimationGroup from '../components/AnimationGroup.vue'
import IconCatPaw from '../components/icons/IconCatPaw.vue'

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default {
    setup() {
        
    },
    components: {
        AnimationGroup: AnimationGroup,
        IconCatPaw: IconCatPaw
    },
    data() {
        return {
            game: {
                selected: new Set(),
                turn_count: 0,
                matches: 0,
            },
            cards: [
                {
                    name: "cafecito_assistindo",
                    src: "./images/cafecito_assistindo.jpg"
                },
                {
                    name: "cafecito_largado",
                    src: "./images/cafecito_largado.jpeg"
                },
                {
                    name: "cafecito_wings",
                    src: "./images/cafecito_wings.jpg"
                },
                {
                    name: "cafecito_abraco",
                    src: "./images/cafecito_abraco.jpg"
                },
                {
                    name: "maricita_flores",
                    src: "./images/maricita_flores.jpg"
                },
                {
                    name: "maricita_princesa",
                    src: "./images/maricita_princesa.jpg"
                },
                {
                    name: "maricita_janelinha",
                    src: "./images/maricita_janelinha.jpg"
                },
                {
                    name: "maricita_sonim",
                    src: "./images/maricita_sonim.jpg"
                },
            ],
            items: new Array()
        }
    },
    created() {
        this.initBoard();
    },
    methods: {
        initBoard() {
            this.board_size = Math.pow(this.cards.length, 2);
            this.items = Array();
            for(var i in this.cards){
                this.items.push({idx: i, reveal: false, locked: false, correct: false})
                this.items.push({idx: i, reveal: false, locked: false, correct: false})
            }
            this.items = shuffle(this.items);
        },
        revealItem(item, position){
            
            if(item.locked)
            {
                return;
            }

            if (this.game.selected.size < 2 && !item.reveal)
            {
                item.reveal = true;
                item.locked = true;
                this.game.selected.add(position);   
            }
            else if(item.reveal)
            {
                item.reveal = false;
                this.game.selected.delete(position);
            }
        },
        checkSelectedPair() {
            if(this.game.selected.size == 2) {
                let arr = Array.from(this.game.selected);
                this.items[arr[0]].locked = this.items[arr[1]].locked = true;                
                if(this.items[arr[0]].idx == this.items[arr[1]].idx)
                {
                    this.game.selected = new Set();
                    this.game.matches++;
                    // document.getElementById("popupPanel").classList.add("d-flex");

                    // setTimeout(() => {
                    //     document.getElementById("popupPanel").classList.remove("d-flex");
                    // }, 2000);

                    setTimeout(() => {
                        this.items[arr[0]].correct = this.items[arr[1]].correct = true;
                        this.game.turn_count++;

                    }, 100); // Only answer correct after a delay

                    return true;
                }
                else{ // Wrong pair
                    setTimeout(() => {
                            this.game.selected = new Set();
                            this.items[arr[0]].reveal = this.items[arr[1]].reveal = false;
                            this.items[arr[0]].locked = this.items[arr[1]].locked = false;
                        
                            this.game.turn_count++;
                        }, 
                        1500);
                }
            }
            return false;
        }
    },
    watch: {
        'game.selected.size': { // Watch no. of selected cards
            handler(newSize, oldSize)
            {
                if(newSize > oldSize) {
                    // New card selected
                    if(this.checkSelectedPair())
                    {
                    }
                }
            },
            deep: true
        },
        'game.matches': {
            handler(newValue, oldValue) {
                if (newValue < 8){
                    document.getElementById("popupPanel").classList.add("d-flex");
                    setTimeout(() => {
                        document.getElementById("popupPanel").classList.remove("d-flex");
                    }, 2000);
                }
                else if(newValue == 8)
                {
                    document.getElementById("popupVenceu").classList.add("d-flex");
                }
            }
            
        }
    }
}
</script>

<template>
    <div class="container-fluid m-0 p-0">
        <h1>Memória</h1>
        <h3>Turnos: <span id="turnCountText" class="displayCounter"> {{ this.game.turn_count }}</span> | <span><IconCatPaw v-for="i in this.game.matches" :key="i" /></span></h3>
        <div class="position-relative">
            <div class="container game-grid d-flex justify-content-center flex-wrap gap-1 mb-4 p-0 position-relative">
                <div v-for="(item, position) in this.items" :key="item" class="grid-item" @click="revealItem(item, position)">
                        <div :class="{'pointer-disabled': item.locked}" class="goto-position flip-card shadow-sm user-select-none" :style="{'animation-delay': 200*position+'ms'}">
                            <div class="flip-card-inner">
                            <Transition name="flip">
                                <div v-if="item.reveal" class="card-front" :class="{ bouncy: item.correct }">
                                    <img :src="this.cards[item.idx].src"/>
                                </div>
                            </Transition>
                            <Transition name="flip-back">
                                <div v-if="!item.reveal" class="card-back">
                                    <div class="back-overlay"></div>
                                    <img :src="'/images/cats.png'">
                                </div>
                            </Transition>
                            </div>
                        </div>
                </div>
                <div class="popup" id="popupPanel">
                    <!-- <AnimationGroup :duration="'1.5s'" :animation="'bounce-in'" :text="'ACERTOU!'"/> -->
                    <IconCatPaw class='drop-in' style='display: inline-block'/>
                </div>
                <div class="popup" id="popupVenceu" style="color: coral;">
                    <AnimationGroup :duration="'2s'" :animation="'snake'" :text="'FIM DE JOGO'" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.game-grid {
    position: relative;
    max-width: 900px;
}

.grid-item {
    flex: 1 0 21%;
    aspect-ratio: 1;
}

.displayCounter {
    display: inline-block;
}

.popup {
    position: absolute;
    width: 100%;
    height: 100%;
    display: none;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    color: gold;
    font-size: 96px;
    font-weight: bold;
    text-shadow: 2px 2px 8px #000000;
    user-select: none;
}

.drop-in {
    animation-name: dropin;
    animation-timing-function: ease-out;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

@keyframes dropin{
    0% {
        transform: translate(-50vw, -100vh);
    }
    20% {
        transform: translate(-25vw, -80vh);
    }

    60% {
        transform: translate(-2%, 15%) rotate(360deg) scale(1.1, 0.75);
    }

    80% {
        transform: translate(0) rotate(360deg);
    }

    100% {
        transform: translate(0) rotate(360deg);
    }
}

.pointer-disabled {
    pointer-events: none;
}

.flip-card{
  background-color: transparent;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* For 3d effect */
  transition: transform 0.2s;
}

.flip-card:hover{
    transform: scale(1.05);
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: inherit;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.card-front, .card-back{
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
}

.card-back {
    background: rgb(2,0,36);
    background: linear-gradient(107deg, rgba(2,0,36,1) 0%, rgba(252,252,251,1) 52%, rgba(255,154,0,1) 100%);
    border: 2px solid black;
}

.back-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
}

.flip-card img{
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: inherit;
    object-fit: cover;
}

.revealed {
    transform: scale(1.02);
    transition: transform 2s;
}

.flip-back-enter-active {
    animation: flip-in .5s;
}

.flip-back-leave-active {
    animation: flip-out .5s;
}

.flip-enter-active {
    animation: flip-in .5s;
}

.flip-leave-active {
    animation: flip-out .5s;
}

@keyframes flip-out{
    0% {
        transform: rotateY(0);
    }
    25% {
        transform: rotateY(-90deg);
    }
    100% {
        transform: rotateY(-180deg);
    }
}

@keyframes flip-in{
    0% {
        transform: rotateY(180deg);
    }
    25% {
        transform: rotateY(90deg);
    }
    100% {
        transform: rotateY(0);
    }
}

.goto-position{
    transform: translate(-120vw, 50vh);
    animation-name: goto;
    animation-timing-function: ease-out;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

@keyframes goto {
    0% {
        transform: translate(-120vw, 50vh);
    }

    90% {
        transform: translate(0);
    }
    100% {
        transform: translate(0);
    }
}


.bouncy {
    animation-name: pulse;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-delay: 0.5s;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    12% {
        transform: scale(0.9);
    }
    25% {
        transform: scale(1.1);
    }
    50% {
        transform: scale(1);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes bounce{
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.075);
    }
}
</style>