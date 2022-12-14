function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      disableBtn: false,
    }
  },
  computed: {
    monsterHealthStyle() {
      return {
        width: this.monsterHealth + '%',
      }
    },
    playerHealthStyle() {
      return { width: this.playerHealth + '%' }
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw game
      } else if (value < 0) {
        // Player lost
      }
    },
    monsterHealth() {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw game
      } else if (value < 0) {
        // Monster  lost
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++
      const attackValue = getRandomValue(5, 12)
      this.monsterHealth -= attackValue
      this.attackPlayer()
      if (this.playerHealth < 0) {
        // player lost
      }
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15)
      this.playerHealth -= attackValue
    },
    spacialAttack() {
      const attackValue = getRandomValue(10, 25)
      this.monsterHealth -= attackValue
      this.currentRound++
      this.attackPlayer()
    },
    healPlayer() {
      const healValue = getRandomValue(8, 20)
      this.playerHealth += healValue
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100
      } else {
        this.playerHealth += healValue
      }
      this.attackPlayer()
    },
  },
})

app.mount('#game')
