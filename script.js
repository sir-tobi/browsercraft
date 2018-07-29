// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

//  __    __     __    ||    ||   _   ___    _      __   _     _     __   ____
// || )) || \\  // \\  ||    || (( \ ||    || \\  //   || \\ // \\ ||    | || |
// ||=)  ||_// ((   )) \\ /\ //  \\  ||==  ||_// ((    ||_// ||=|| ||==    ||  
// ||_)) || \\  \\_//   \V/\V/  \_)) ||___ || \\  \\__ || \\ || || ||      ||  

// ---------------------------------------------------------------------------------------------------------- 
// ----------------------------------------------------------------------------------------------------------


// ---------------------------------------------- Declarations ----------------------------------------------
// Define Map and Constants
let playingArea = document.getElementById("playingArea");
const frames = 8;
const numberOfPlayers = 2;
const startingGold = 300;
const startingWood = 0;
var selectedElements = playingArea.getElementsByClassName("selected");
var unitsAndBuildings = [];
var units = [];
var environmentObjects = [];
var players = [];

// Create Map
var map = new Map();
map.intialize();
const mapComposition = map.getMapComposition();

const buttonQ = document.getElementById("q");
const buttonW = document.getElementById("w");
const buttonE = document.getElementById("e");

buttonQ.style.visibility = "hidden";
buttonW.style.visibility = "hidden";
buttonE.style.visibility = "hidden";

// Event listeners
buttonQ.addEventListener("click", qClicked);
buttonW.addEventListener("click", wClicked);
buttonE.addEventListener("click", eClicked);
playingArea.addEventListener("contextmenu", setTargetOfSelectedUnit);
playingArea.addEventListener('click', selectElement);

for (var i = 0; i < numberOfPlayers; i++) {
  if (i === 0) {
    players.push(new Player(i, startingGold, startingWood, true));
  } else {
    players.push(new Player(i, startingGold, startingWood, false));
  }
}

for (var i = 0; i < mapComposition.length; i++) {
  for (var j = 0; j < mapComposition[i].length; j++) {
      const pos_x = j*(map.width / mapComposition[i].length);
      const pos_y = i*(map.height / mapComposition[i].length);
      if (mapComposition[i].charAt(j) === "T") {
          createEnvironmentObject("Tree", pos_x, pos_y);
      }
      if (mapComposition[i].charAt(j) === "Z") {
        createEnvironmentObject("WillowYellow", pos_x, pos_y);
      }
      if (mapComposition[i].charAt(j) === "1") {
        createUnit(players[0].color, "Townhall", pos_x, pos_y);
      }
      if (mapComposition[i].charAt(j) === "2") {
        createUnit(players[1].color, "Townhall", pos_x, pos_y);
      }
      if (mapComposition[i].charAt(j) === "3") {
        createUnit(players[3].color, "Townhall", pos_x, pos_y);
      }
      if (mapComposition[i].charAt(j) === "4") {
        createUnit(players[4].color, "Townhall", pos_x, pos_y);
      }
    }
}

createUnit(players[1].color, "Footman", 200, 400);

// ---------------------------------------------- Game Loop ----------------------------------------------
setInterval(gameLoop, frames);
function gameLoop () {
  if (selectedElements.length > 0) {
      document.getElementById("unitDetails").style.visibility = "visible";
      document.getElementById("unitIcon").style.visibility = "visible";
      document.getElementById("unitNameAndNumbers").style.visibility = "visible";

      checkActiveButtons();
      showUnitDetails(getUnitOfDomElement(selectedElements[0]));
  } else {
    document.getElementById("unitDetails").style.visibility = "hidden";
    document.getElementById("unitIcon").style.visibility = "hidden";
    document.getElementById("unitNameAndNumbers").style.visibility = "hidden";

    buttonQ.style.visibility = "hidden";
    buttonW.style.visibility = "hidden";
    buttonE.style.visibility = "hidden";
  }

  var collisionObjects = unitsAndBuildings.concat(environmentObjects);

  for (var i=0; i<units.length; i++) {
    var didMoveThisFrame = false;
    var didAttackThisFrame = false;
    for (var j=0; j<collisionObjects.length; j++) {
      if (i!==j) {
        /*
        // Attacking
        if (units[i].canAttack && (units[i].player !== collisionObjects[j].player) && !units[i].isAttacking 
        && units[i].isAlive && collisionObjects[j].isAlive 
        && !collisionObjects[j].isEnvironmentObejct 
        && (units[i].checkRange(collisionObjects[j]) <= units[i].attackRange)) {
          // clearInterval(unitsAndBuildings[i].attackInterval);
          // unitsAndBuildings[i].attackInterval = 0;
          units[i].attackInterval = setInterval (attackLoop, frames, units[i], collisionObjects[j]);
          didAttackThisFrame = true;
        } */

        
        // Movement v2
        if (!(units[i].doesCollide(collisionObjects[j].domElement))) {
          if (!didMoveThisFrame && !didAttackThisFrame && units[i].canMove) {
            // console.log(unitsAndBuildings[i].player + " " + unitsAndBuildings[i].name + " coll with " + collisionObjects[j].player + " " + collisionObjects[j].name);
            if (parseInt(units[i].target_pos_x) !== parseInt(units[i].domElement.style.left)
            || parseInt(units[i].target_pos_y) !== parseInt(units[i].domElement.style.top)) {
              units[i].isMoving = true;
              units[i].move();
              units[i].isMoving = false;
              didMoveThisFrame = true;
              // console.log(unitsAndBuildings[i].player + " " + unitsAndBuildings[i].name + " moved");
            } 
          }
        } else {
          units[i].didCollideWithObject();
        }

        /*if ((units[i].doesCollide(collisionObjects[j].domElement))) {
          units[i].didCollideWithObject();
        } else {
          if (parseInt(unitsAndBuildings[i].target_pos_x) !== parseInt(unitsAndBuildings[i].domElement.style.left)
          || parseInt(unitsAndBuildings[i].target_pos_y) !== parseInt(unitsAndBuildings[i].domElement.style.top)) {
            units[i].isMoving = true;
            units[i].move();
            didMoveThisFrame = true;
          } else {
            units[i].isMoving = false;
          }
        }*/

        /*
        // Movement
        if (!(unitsAndBuildings[i].doesCollide(collisionObjects[j].domElement))) {
          if (!didMoveThisFrame && unitsAndBuildings[i].canMove) {
            // console.log(unitsAndBuildings[i].player + " " + unitsAndBuildings[i].name + " coll with " + collisionObjects[j].player + " " + collisionObjects[j].name);
            if (parseInt(unitsAndBuildings[i].target_pos_x) !== parseInt(unitsAndBuildings[i].domElement.style.left) ||
              parseInt(unitsAndBuildings[i].target_pos_y) !== parseInt(unitsAndBuildings[i].domElement.style.top)) {
              unitsAndBuildings[i].move();
              didMoveThisFrame = true;
              // console.log(unitsAndBuildings[i].player + " " + unitsAndBuildings[i].name + " moved");
            }
          }
        } else if (unitsAndBuildings[i].isAlive && collisionObjects[j].isAlive) {
          // console.log(units[i].player + " " + unitsAndBuildings[i].name + " did coll with " + collisionObjects[j].player + " " + collisionObjects[j].name);
          unitsAndBuildings[i].didCollideWithObject();
        } */
      } 
    }
  }
}

function attackLoop (attackingUnit, targetUnit) {
  if (!attackingUnit.isMoving && attackingUnit.checkRange(targetUnit) <= attackingUnit.attackRange && attackingUnit.isAlive && targetUnit.isAlive)  {
    attackingUnit.isAttacking = true;
    attackingUnit.attackUnit(targetUnit);
  } else {
    attackingUnit.isAttacking = false;
    attackingUnit.attackInterval = 0;
    clearInterval(attackingUnit.attackInterval);
  }
}

// ---------------------------------------------- Game Functions ----------------------------------------------

function checkActiveButtons () {
  switch (getUnitOfDomElement(selectedElements[0]).name) {
    case "Townhall": {
      buttonQ.innerHTML = "Create Footman";
      buttonQ.style.visibility = "visible";
      buttonW.innerHTML = "Create Peasant";
      buttonW.style.visibility = "visible";
      break;
    }
    default: {
      buttonQ.style.visibility = "hidden";
      buttonW.style.visibility = "hidden";
      buttonE.style.visibility = "hidden";
      break;
    }
  }
}

function qClicked () {
  selectedUnit = getUnitOfDomElement(selectedElements[0]);
  switch (selectedUnit.name) {
    case "Townhall": {
      createUnit(selectedUnit.player, "Footman", getPosition(selectedUnit.domElement)[0], getPosition(selectedUnit.domElement)[1] + selectedUnit.height);
    }
  }
}

function wClicked () {
  selectedUnit = getUnitOfDomElement(selectedElements[0]);
  switch (selectedUnit.name) {
    case "Townhall": {
      createUnit(selectedUnit.player, "Peasant", getPosition(selectedUnit.domElement)[0], getPosition(selectedUnit.domElement)[1] + selectedUnit.height);
    }
  }
}

function eClicked () {
  selectedUnit = getUnitOfDomElement(selectedElements[0]);
  switch (selectedUnit.name) {}
}

function createUnit (player, unit, opt_pos_x, opt_pos_y) {
  var createdUnit;
  switch (unit) {
    case "Footman": {
      createdUnit = new Footman(player, document.createElement(unit));
      break;
    }
    case "Peasant": {
      createdUnit = new Peasant(player, document.createElement(unit));
      break;
    }
    case "Townhall": {
      createdUnit = new Townhall(player, document.createElement(unit));
      break;
    }
    default: {
      console.log("Unit type unknown. Unable to create unit.");
      break;
    }
  }
  createdUnit.domElement.setAttribute("class", player + " unit");
  playingArea.appendChild(createdUnit.domElement);

  if (createdUnit.isUnit) {
    units.push(createdUnit); 
  }
  unitsAndBuildings.push(createdUnit);
  spawnElement (createdUnit.domElement, opt_pos_x, opt_pos_y);
}

function createEnvironmentObject (objectName, opt_pos_x, opt_pos_y) {
  var createdObject;
  switch (objectName) {
    case "Tree": {
      createdObject = new Tree (document.createElement(objectName));
      break;
    }
    case "WillowYellow": {
      createdObject = new WillowYellow (document.createElement(objectName));
      break;
    }
    default: {
      console.log("EnvironmentObject type unknown. Unable to create.");
      break;
    }
  }
  createdObject.domElement.setAttribute("class", createdObject.player + " envObject");

  playingArea.appendChild(createdObject.domElement);
  environmentObjects.push(createdObject);
  createdObject.domElement.style.left = opt_pos_x + "px";
  createdObject.domElement.style.top = opt_pos_y + "px";
}

// Generic game functions
function getPosition (element) {
  var el2 = element;
  var curtop = 0;
  var curleft = 0;
  if (document.getElementById || document.all) {
      do  {
          curleft += element.offsetLeft-element.scrollLeft;
          curtop += element.offsetTop-element.scrollTop;
          element = element.offsetParent;
          el2 = el2.parentNode;
          while (el2 != element) {
              curleft -= el2.scrollLeft;
              curtop -= el2.scrollTop;
              el2 = el2.parentNode;
          }
      } while (element.offsetParent);

  } else if (document.layers) {
      curtop += element.y;
      curleft += element.x;
  }
  return [curtop, curleft];
};

function spawnElement (element, x_pos, y_pos) {
  var x = x_pos;
  var y = y_pos;

  // Create a dummy element for testing available space
  var dummy = document.createElement("dummy");
  playingArea.appendChild(dummy);
  dummy.style.position = "absolute";
  dummy.style.left = x + "px";
  dummy.style.top = y + "px";

  // Test if space to move is available
  const collisionObjects = unitsAndBuildings.concat(environmentObjects);
  var hasSpace = true;
  for (var j=0; j<collisionObjects.length; j++) {
    if (collisionObjects[j].doesCollide(dummy)) {
      hasSpace = false;
    }
  }

  dummy.remove();

  if (hasSpace) {
    // Move Element
    element.style.position = "absolute";
    element.style.left = x + "px";
    element.style.top = y + "px";
    getUnitOfDomElement(element).target_pos_x = x;
    getUnitOfDomElement(element).target_pos_y = y;
  } else {
    // Recursively try again to find space
    spawnElement (element, x_pos + getUnitOfDomElement(element).width, y_pos);
  }
}

function selectElement (e) {
  var target = e.target;
  // if selected a unit or building
  if (target.classList.contains(players[0].color) && (target.classList.contains("unit") || target.classList.contains("building"))) {
    target.classList.toggle("selected");
  }
  else {
    // clicked somewhere else (target is no unit or building)
    deselectAllElements();
  }
}

// recursively removes "selected" from elements
function deselectAllElements() {
  if (selectedElements.length > 0) {
    selectedElements[0].classList.remove('selected')
  if (selectedElements[0]) deselectAllElements()
  }
}

function setTargetOfSelectedUnit (e) {
  for (var i=0;i<selectedElements.length;i++) {
    var element = document.getElementsByClassName("selected")[i];
    getUnitOfDomElement(selectedElements[i]).isMoving = true;
    if (element.classList.contains("unit")) {
      getUnitOfDomElement(element).target_pos_x = event.clientX - playingArea.getBoundingClientRect().left - (element.clientWidth / 2) - (i*50);
      getUnitOfDomElement(element).target_pos_y = event.clientY - playingArea.getBoundingClientRect().top - (element.clientHeight / 2) - (i*50);
    }
  }
}

function getUnitOfDomElement (domElement) {
  for (var i=0; i<unitsAndBuildings.length; i++) {
    if (unitsAndBuildings[i].domElement === domElement) {
      return unitsAndBuildings[i];
    }
  }
}

function showUnitDetails (unit) {
  var showHp = document.getElementById("hp");
  var showHpBar = document.getElementById("hpBar");
  var showAttack = document.getElementById("attack");
  var showDefense = document.getElementById("defense");
  var showUnitName = document.getElementById("unitName");
  var showNumberOfSelectedUnits = document.getElementById("numberOfUnits");

  showHp.innerHTML = unit.currentHp + " / " + unit.hp;
  showHpBar.style.width = (unit.currentHp / unit.hp) * 300 + "px";
  showHpBar.style.backgroundColor = "hsl(" + (unit.currentHp/unit.hp)*100 + ",100%,30%)";

  
  showDefense.innerHTML = "Defense: " + unit.defense;
  if (selectedElements.length > 1) {
    showNumberOfSelectedUnits.innerHTML = "(" + selectedElements.length + ")";
  } else {
    showNumberOfSelectedUnits.innerHTML = "";
  }
  document.getElementById("unitIcon").style.backgroundImage = "url('res/icons_units/" + unit.name.toLowerCase() + ".png')";
  showUnitName.innerHTML = unit.name;
  if (unit.canAttack) {
    showAttack.innerHTML = "Attack: " + unit.attack;
  } else {
  showAttack.innerHTML = "";
  }
}

function isVictory () {
  
}

// Hotkeys
window.onkeydown = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  if (code === 81 && buttonQ.style.visibility !== 'hidden') { // Q
      qClicked();
  } else if (code === 87 && buttonW.style.visibility !== 'hidden') { // W
      wClicked();
  }
  else if (code === 69 && buttonE.style.visibility !== 'hidden') { // E
      eClicked();
  }
};