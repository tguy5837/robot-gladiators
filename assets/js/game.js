var fightOrSkip = function () {
  var promptFight = window.prompt(
    "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
  );

  promptFight = promptFight.toLowerCase();
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  } else if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(
        playerInfo.name + " has decided to skip this fight. Goodbye!"
      );
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      return true;
    }
  }
};

// fight function (now with parameter for enemy's name)
var fight = function (enemy) {

  var isPlayerTurn = true;

  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      if (fightOrSkip()) {
        break;
      }
    }

    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);

    console.log(
      playerInfo.name +
      " attacked " +
      enemy.name +
      ". " +
      enemy.name +
      " now has " +
      enemy.health +
      " health remaining."
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }

    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);

    console.log(
      enemy.name +
      " attacked " +
      playerInfo.name +
      ". " +
      playerInfo.name +
      " now has " +
      playerInfo.health +
      " health remaining."
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(
        playerInfo.name + " still has " + playerInfo.health + " health left."
      );

    } // end of while loop
  }
  isPlayerTurn = !isPlayerTurn;
}; // end of fight function

var startGame = function () {
  // reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // pick new enemy to fight based on the index of the enemy.names array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);

      // if we aren't at the last enemy array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask the player if they want to use the store before next round
        var storeConfirm = window.confirm(
          "The fight is over, visit the store before your next round?"
        );

        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }
    // if player isn't alive, stop the game
  }
  endGame();
};

var endGame = function () {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
      playerInfo.money +
      "."
    );
  } else {
    window.alert("You've lost your robot in battle.");
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function () {
  // ask the player what they would like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, OR 3 to LEAVE."
  );

  // use switch array to carry out action
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;

    case 2:
      playerInfo.upgradeAttack();
      break;

    case 3:
      window.alert("Leaving the store.");

      // do nothing, so function will end

      break;

    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to enforce player to pick a valid option
      shop();

      break;
  }
};

// function to generate a random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1)) + min;

  return value;
};

// function to set name
var getPlayerName = function () {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for $7.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.prompt("Upgrading player's attack by 6 for $7.");
      this.attack + -6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  },
];

// start game when the page loads
startGame();
