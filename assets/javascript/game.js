var baseAttack = 0;
var player;
var defender;
var charArray = [];
var playerSelected = false;
var defenseSelected = false;

function Character(name, hp, ap, counter, pic) {
  this.name = name;
  this.healthPoints = hp;
  this.attackPower = ap;
  this.counterAttackPower = counter;
  this.pic = pic;
}

function initilizeCharacters() {
  var harry = new Character(
    "Harry Potter",
    150,
    20,
    10,
    "./assets/images/Harry.jpg"
  );
  var draco = new Character(
    "Draco Malfoy",
    130,
    18,
    9,
    "./assets/images/Draco.jpg"
  );
  var bellatrix = new Character(
    "Bellatrix Lestrange",
    140,
    16,
    8,
    "./assets/images/Bellatrix.jpg"
  );
  var voldemort = new Character(
    "Voldemort",
    180,
    25,
    15,
    "./assets/images/Voldemort.jpg"
  );
  charArray.push(harry, draco, bellatrix, voldemort);
}

function characterCards(divID) {
    $('divID').children().remove();
    for (var i = 0, i < charArray.length; i++) {
        $(divID).append('<div />');
        $(divID + ' div: last-child').addClass('card');
        $(divID + ' div: last-child').append('<img />');
        $(divID + ' img: last-child').attr('id', charArray[i].name);
        $(divID + ' img: last-child').attr('class', 'card-img-top');
        $(divID + ' img: last-child').attr('src', charArray[i].pic);
        $(divID + ' img: last-child').attr('width', 150);
        $(divID + ' img: last-child').addClass('img-thumbnail');
        $(divID + ' div:last-child').append(charArray[i].name + '<br>');
        $(divID + ' div:last-child').append('HP: ' + charArray[i].healthPoints);
        $(divID + ' div:last-child').append();
    }
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


// let divTag1 = $("<div>");

// divTag1.attr("class", "card");
// divTag1.css("width", "18rem");

// let divTag2 = $("<div>");
// divTag1.attr("class", "card-body");

// let hTag = $("<h2>");
// hTag.attr("class", "card-body");
// hTag.text("Char Name");

// let pTag = $("<p>");
// pTag.attr("class", "card-text");
// pTag.text("some text here");

// divTag2.append(hTag, pTag);
// divTag1.append(divTag2);

// $("#cards").append(divTag1);

// {
//   <div class="card" style="width: 18rem;">
//       <div class="card-body">
//         <h2 class="card-title">Card title</h2>
//         <img src="https://via.placeholder.com/155x155"></img>
//         <h3 class="card-subtitle mb-2 text-muted">Card subtitle</h3>
//         <p class="card-text">
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </p>
//       </div>
//     </div> 
// }
