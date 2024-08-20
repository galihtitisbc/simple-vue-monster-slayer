function randomAttackDamage(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currRound: 1,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    healthMonsterBar() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    healthPlayerBar() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    specialAttackEnabled() {
      return this.currRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //player lose
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //monster lose
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.currRound++;
      const attackValue = randomAttackDamage(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage("Player", "Dealing Damage", attackValue);
    },
    attackPlayer() {
      const attackValue = randomAttackDamage(8, 18);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "Dealing Damage", attackValue);
    },
    specialAttackMonster() {
      this.currRound++;
      const attackValue = randomAttackDamage(10, 256);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage(
        "Player",
        "Using Special Attack, Dealing Damage",
        attackValue
      );
    },
    healPlayer() {
      this.currRound++;
      const healValue = randomAttackDamage(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
      this.addLogMessage("Player", "Using Heal", healValue);
    },
    surrender() {
      this.winner = "monster";
      this.playerHealth = 0;
    },
    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currRound = 1;
      this.logMessages = [];
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
app.mount("#game");
