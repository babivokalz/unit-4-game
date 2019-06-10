var baseAttack = 0;
var player;
var defender;
var charArray = [];
var playerSelected = false;
var defenderSelected = false;
var playerID;
var defenderID;

function Character(id, name, hp, ap, counter, pic) {
  this.id = id;
  this.name = name;
  this.healthPoints = hp;
  this.attackPower = ap;
  this.counterAttackPower = counter;
  this.pic = pic;
}

function initilizeCharacters() {
  var harry = new Character(
    "harry",
    "Harry Potter",
    150,
    20,
    10,
    "./assets/images/Harry.jpg"
  );
  var draco = new Character(
    "draco",
    "Draco Malfoy",
    130,
    18,
    9,
    "./assets/images/Draco.jpg"
  );
  var bellatrix = new Character(
    "bellatrix",
    "Bellatrix Lestrange",
    140,
    16,
    8,
    "./assets/images/Bellatrix.jpg"
  );
  var voldemort = new Character(
    "voldemort",
    "Voldemort",
    180,
    25,
    15,
    "./assets/images/Voldemort.jpg"
  );
  charArray.push(harry, draco, bellatrix, voldemort);
}
function populateCharacterCards() {
  const myCardContainer = $("#cards");
  $(myCardContainer)
    .children()
    .remove();
  charArray.forEach((cardData, i) => {
    const card = document.createElement("div");
    const cardImage = document.createElement("img");
    $(card).addClass("card");
    $(card).append(cardImage);
    $(card).attr("id", cardData.id);
    $(cardImage).attr("class", "card-img-top");
    $(cardImage).attr("src", cardData.pic);
    $(cardImage).attr("width", 150);
    $(cardImage).addClass("img-thumbnail");
    $(card).append(cardData.name + "<br>");
    $(card).append("HP: " + cardData.healthPoints);
    $(myCardContainer).append(card);
    $(card).on("click", () => {
      $("#yourCharacter").append(card);
      player = cardData;
      charArray.forEach((innerCardData, j) => {
        // move all other cards to opponents area
        if (i !== j) {
          $("#opponents").append($("#" + innerCardData.id)[0]);
        }
        // update the card click handle so that upon second click after the opponents area is populated, it will move the card to the defenderArea.
        $("#" + innerCardData.id).off("click");
        $("#" + innerCardData.id).on("click", () => {
          $("#" + innerCardData.id).off("click");
          defender = innerCardData;
          $("#defenderArea").append($("#" + innerCardData.id)[0]);
          // remove all the other cards
          charArray.forEach((cardToRemove, k) => {
            if (cardToRemove !== player && cardToRemove !== defender) {
              $("#" + cardToRemove.id).remove();
            }
          });
        });
      });
    });
  });
}

Character.prototype.increaseAttack = function() {
  this.attackPower += baseAttack;
};

Character.prototype.attack = function(Obj) {
  Obj.healthPoints -= this.attackPower;
  $("#msg").html(
    "You attacked " + Obj.name + "for " + this.attackPower + " damage points."
  );
  this.increaseAttack();
};

Character.prototype.counterAttack = function(Obj) {
  Obj.healthPoints - +this.counterAttackPower;
  $("#msg").append(
    "<br>" +
      this.name +
      " counter attacked you for " +
      this.counterAttackPower +
      " damage points."
  );
};
function setBaseAttack(Obj) {
  baseAttack = Obj.attackPower;
}
function isAlive(Obj) {
  if (Obj.healthPoints > 0) {
    return true;
  }
  return false;
}

$(document).on("click", "img", function() {
  if (playerSelected && !defenderSelected && this.id != player.name) {
    for (var i = 0; i < charArray.length; i++) {
      if (charArray[i].name == this.id) {
        defender = charArray[i];
        charArray.splice(i, 1);
        defenderSelected = true;
        $("#msg").html("Click on the button to cast a spell and attack!");
      }
    }
    $("#defenderDiv").append(this);
    $("#defenderDiv").append("<br>" + defender.name);
    $("#defenderHealthDiv").append("HP: " + defender.healthPoints);
  }

  $(document).on("click", "#attackBtn", function() {
    if (playerSelected && defenderSelected) {
      if (isAlive(player) && isAlive(defender)) {
        player.attack(defender);
        defender.counterAttack(player);
        $("#playerHealthDiv").html("HP: " + player.healthPoints);
        $("#defenderHealthDiv").html("HP: " + defender.healthPoints);
        if (!isAlive(defender)) {
          $("#defenderHealthDiv").html("Defeated!");
          $("#playerHealthDiv").html("Opponent Defeated!");
          $("#msg").html("Pick another opponent to duel");
        }
        if (!isAlive(player)) {
          $("#playerHealthDiv").html("You have been defeated");
          $("#msg").html("Do you want to try again?");
          $("#attackBtn").html("Restart Duel");
          $(document).on("click", "#attackBtn", function() {
            location.reload();
          });
        }
      }
    }
  });
  if (!playerSelected) {
    for (var i = 0; i < charArray.length; i++) {
      if (charArray[i].name == this.id) {
        player = charArray[i];
        setBaseAttack(player);
        charArray.splice(i, 1);
        playerSelected = true;
      }
    }
  }
  // $(document).on("click", ".card", function() {
  //   if (playerSelected === false) {
  //     $(this).appendTo("#yourCharacter");
  //     $("#characters").appendTo("#opponents");
  //     playerSelected = true;

  //     playerID = getCharacterIndex($(this).attr("id"));
  //   }
  // });
  // if (playerSelected === -1) {
  //   $(this).appendTo("#yourCharacter");
  //   $("#characters").appendTo("#opponents");
  //   playerSelected = getCharacterIndex($(this).attr("id"));
  // }
});
$(document).ready(function() {
  initilizeCharacters();
  populateCharacterCards("cards");
});
