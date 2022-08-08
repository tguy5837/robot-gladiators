var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerHealth, playerAttack);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function () {
  window.alert("Welcome to Robot Gladiators!");

  var promptFight = window.prompt(
    "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
  );

  console.log(promptFight);

  if (promptFight === "fight" || promptFight === "FIGHT") {
    // remove enemy's health by subtracting the amoutn set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;

    // Log a resulting message to the console so we know it worked
    console.log(
      playerName +
        " attacked " +
        enemyName +
        ". " +
        enemyName +
        " now has " +
        enemyHealth +
        " health remaining."
    );

    // Check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // remove player's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName +
        " attacked " +
        playerName +
        ". " +
        playerName +
        " now has " +
        playerHealth +
        " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }

    // if player chooses to skip
  } else if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.alert("Are you sure you'd like to quit?");

    // if yes (ture), leave fight
    if (confirmSkip) {
      window.alert(playerName + " has decided to skip this fight. Goodbye!");
      //subtract money from playerMoney for skipping
      playerMoney = playerMoney - 2;
    }

    // if no (false), ask question again by running fight() again
    else {
      fight();
    }
  }
};

fight();
