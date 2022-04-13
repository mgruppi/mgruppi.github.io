<script>
import AnimationGroup from '../components/AnimationGroup.vue'

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
    data() {
        return {
            game: {
                selected: new Set(),
                turn_count: 1,
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
    components: {
        AnimationGroup: AnimationGroup
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
    <div class>
        <h1>Memória</h1>
        <h3>Turno: <span id="turnCountText" class="displayCounter"> {{ this.game.turn_count }}</span> | Corretos: <span>{{ this.game.matches }}</span></h3>
        <div class="position-relative">
            <div class="game-grid d-flex flex-wrap gap-3 mb-4 position-relative">
                <div v-for="(item, position) in this.items" :key="item" class="" @click="revealItem(item, position)">
                        <div :class="{'pointer-disabled': item.locked}" class="flip-card shadow-sm user-select-none">
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
                    <AnimationGroup :duration="'1.5s'" :animation="'bounce-in'" :text="'ACERTOU!'"/>
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
    width: 900px;
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

.pointer-disabled {
    pointer-events: none;
}

.flip-card{
  background-color: transparent;
  border-radius: 8px;
  width: 200px;
  height: 200px;
  max-width: 200px;
  max-height: 200px;
  cursor: pointer;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
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

.grid-item {
    max-width: 25%;
}

.flip-card img{
    position: relative;
    width: 200px;
    height: 200px;
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