// Class definitions
class Object {
  constructor(player) {
    this.isAlive = true;
    this.selected = false;
    this.player = player;
    this.attackInterval = 0; // never change
    
    // Movement
    this.currentDirection = "down";
    this.isMoving = false;
    this.target_pos_x = 0;
    this.target_pos_y = 0;

    // Combat
    this.isAttacking = false;
  }

  doesCollide (otherElement) {
    var detectCollision = (function () {
      function getPositions( elem ) {
          var pos, width, height;
          pos = $( elem ).position();
          width = $( elem ).width() / 2;
          height = $( elem ).height();
          return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
      }
    
      function comparePositions( p1, p2 ) {
          var r1, r2;
          r1 = p1[0] < p2[0] ? p1 : p2;
          r2 = p1[0] < p2[0] ? p2 : p1;
          return r1[1] > r2[0] || r1[0] === r2[0];
      }
    
      return function ( a, b ) {
          var pos1 = getPositions( a ),
              pos2 = getPositions( b );
          return comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] );
      };
    })();
    return detectCollision(this.domElement, otherElement);
    }

  didCollideWithObject () {
    if (this.currentDirection === "right") {
      this.domElement.style.left = parseInt(this.domElement.style.left) - this.movementSpeed + "px";
    } else if (this.currentDirection ==="down") {
      this.domElement.style.top = parseInt(this.domElement.style.top) - this.movementSpeed + "px";
    } else if (this.currentDirection === "up") {
      this.domElement.style.top = parseInt(this.domElement.style.top) + this.movementSpeed + "px";
    } else if (this.currentDirection === "left") {
      this.domElement.style.left = parseInt(this.domElement.style.left) + this.movementSpeed + "px";
    }
  }
}

class Unit extends Object {
  constructor(player) {
    super(player);
    // General
    this.isUnit = true;
    this.isBuilding = false;

    // Movement
    this.canMove = true;

    // Combat
    this.attackRange = 150; // Melee

    // Animation
    this.movementFrame = 0;
    this.movementFrameMax = 80;
    this.attackFrame = 0;
    this.attackFrameMax = 100;
    this.deadSpritePosition = 510;
  }

  move () {
    // right
    if (parseInt(this.target_pos_x) > parseInt(this.domElement.style.left)) {
      this.domElement.style.left = parseInt(this.domElement.style.left) + this.movementSpeed + "px";
      this.currentDirection = "right";
      this.animateMovement();
      console.log("moving right");
    }
    // left
    else if (parseInt(this.target_pos_x) < parseInt(this.domElement.style.left)) {
      this.domElement.style.left = parseInt(this.domElement.style.left) - this.movementSpeed + "px";
      this.currentDirection = "left";
      this.animateMovement();
      console.log("moving left");
    }
    // down
    else if (parseInt(this.target_pos_y) > parseInt(this.domElement.style.top)) {
      this.domElement.style.top = parseInt(this.domElement.style.top) + this.movementSpeed + "px";
      this.currentDirection = "down";
      this.animateMovement();
      console.log("moving down");
    }
    // up
    else if (parseInt(this.target_pos_y) < parseInt(this.domElement.style.top)) {
      this.domElement.style.top = parseInt(this.domElement.style.top) - this.movementSpeed + "px";
      this.currentDirection = "up";
      this.animateMovement();
      console.log("moving up");
    }
  }

  animateMovement () {
    this.isMoving = true;
    switch (this.currentDirection) {
        case "right": {
            if (this.movementFrame < this.movementFrameMax/4 *1) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-2) + "px " + this.height * (-1) + "px";
              } else if (this.movementFrame < this.movementFrameMax/4 *2) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-2) + "px " + this.height * (-2) + "px";
              }
              else if (this.movementFrame < this.movementFrameMax/4 *3) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-2) + "px " + this.height * (-3) + "px";
              }
              else if (this.movementFrame < this.movementFrameMax/4 *4) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-2) + "px " + this.height * (-4) + "px";
              }
              break;
        }
        case "left": {
            if (this.movementFrame < this.movementFrameMax/4 *1) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-7) + "px " + this.height * (-1) + "px";
              } else if (this.movementFrame < this.movementFrameMax/4 *2) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-7) + "px " + this.height * (-2) + "px";
              }
              else if (this.movementFrame < this.movementFrameMax/4 *3) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-7) + "px " + this.height * (-3) + "px";
              }
              else if (this.movementFrame < this.movementFrameMax/4 *4) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-7) + "px " + this.height * (-4) + "px";
              }
              break;
        }
        case "down": {
            if (this.movementFrame < this.movementFrameMax/4 *1) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-4) + "px " + this.height * (-1) + "px";
            } else if (this.movementFrame < this.movementFrameMax/4 *2) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-4) + "px " + this.height * (-2) + "px";
            }
            else if (this.movementFrame < this.movementFrameMax/4 *3) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-4) + "px " + this.height * (-3) + "px";
            }
            else if (this.movementFrame < this.movementFrameMax/4 *4) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-4) + "px " + this.height * (-4) + "px";
            }
            break;
        }
        case "up": {
            if (this.movementFrame < this.movementFrameMax/4 *1) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-0) + "px " + this.height * (-1) + "px";
              } else if (this.movementFrame < this.movementFrameMax/4 *2) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-0) + "px " + this.height * (-2) + "px";
              }
              else if (this.movementFrame < this.movementFrameMax/4 *3) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-0) + "px " + this.height * (-3) + "px";
              }
              else if (this.movementFrame < this.movementFrameMax/4 *4) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-0) + "px " + this.height * (-4) + "px";
              }
              break;
        }
    }
    if (this.movementFrame < this.movementFrameMax) {
        this.movementFrame++;
      }
      else {
        this.movementFrame = 0;
      }
  }
  animateAttack () {
    switch (this.currentDirection) {
        case "right": {
            if (this.attackFrame < this.attackFrameMax/4 *0.5) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-2) + "px " + (this.height * (-4) + this.atkHeight * (-1)) + "px";
              } else if (this.attackFrame < this.attackFrameMax/4 *1) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-2) + "px " + (this.height * (-4) + this.atkHeight * (-2)) + "px";
              }
              else if (this.attackFrame < this.attackFrameMax/4 *1.5) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-2) + "px " + (this.height * (-4) + this.atkHeight * (-3)) + "px";
              }
              else if (this.attackFrame < this.attackFrameMax/4 *2.5) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-2) + "px " + (this.height * (-4) + this.atkHeight * (-4)) + "px";
              }
              break;
        }
        case "left": {
            if (this.attackFrame < this.attackFrameMax/4 *0.5) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-7) + "px " + (this.height * (-4) + this.atkHeight * (-1)) + "px";
              } else if (this.attackFrame < this.attackFrameMax/4 *1) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-7) + "px " + (this.height * (-4) + this.atkHeight * (-2)) + "px";
              }
              else if (this.attackFrame < this.attackFrameMax/4 *1.5) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-7) + "px " + (this.height * (-4) + this.atkHeight * (-3)) + "px";
              }
              else if (this.attackFrame < this.attackFrameMax/4 *2.5) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-7) + "px " + (this.height * (-4) + this.atkHeight * (-4)) + "px";
              }
              break;
        }
        case "down": {
            if (this.attackFrame < this.attackFrameMax/4 *0.5) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-4) + "px " + (this.height * (-4) + this.atkHeight * (-1)) + "px";
            } else if (this.attackFrame < this.attackFrameMax/4 *1) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-4) + "px " + (this.height * (-4) + this.atkHeight * (-2)) + "px";
            }
            else if (this.attackFrame < this.attackFrameMax/4 *1.5) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-4) + "px " + (this.height * (-4) + this.atkHeight * (-3)) + "px";
            }
            else if (this.attackFrame < this.attackFrameMax/4 *2.5) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-4) + "px " + (this.height * (-4) + this.atkHeight * (-4)) + "px";
            }
            break;
        }
        case "up": {
            if (this.attackFrame < this.attackFrameMax/4 *0.5) {
              this.domElement.style.background = this.spritemap +  " " + this.width * (-0) + "px " + (this.height * (-4) + this.atkHeight * (-1)) + "px";
              } else if (this.attackFrame < this.attackFrameMax/4 *1) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-0) + "px " + (this.height * (-4) + this.atkHeight * (-2)) + "px";
              }
              else if (this.attackFrame < this.attackFrameMax/4 *1.5) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-0) + "px " + (this.height * (-4) + this.atkHeight * (-3)) + "px";
              }
              else if (this.attackFrame < this.attackFrameMax/4 *2.5) {
                this.domElement.style.background = this.spritemap +  " " + this.width * (-0) + "px " + (this.height * (-4) + this.atkHeight * (-4)) + "px";
              }
              break;
        }
    }
    if (this.attackFrame < this.attackFrameMax) {
        this.attackFrame++;
      }
      else {
        this.attackFrame = 0;
      }
  }

  checkRange (targetUnit) {
    var a = parseInt(this.domElement.style.left) - parseInt(targetUnit.domElement.style.left);
    var b = parseInt(this.domElement.style.top) - parseInt(targetUnit.domElement.style.top);
    return parseInt(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
  }

  attackUnit (targetUnit) {
    if (this.canAttack && !this.isMoving) {
      this.animateAttack();
      if (this.attackFrame === this.attackFrameMax-1) {
        this.dealDamage(targetUnit);
        if (targetUnit.canAttack && !targetUnit.isAttacking) {
            targetUnit.target_pos_x = targetUnit.target_pos_x - (parseInt(targetUnit.domElement.style.left) - parseInt(this.domElement.style.left));
            targetUnit.target_pos_y = targetUnit.target_pos_y - (parseInt(targetUnit.domElement.style.top) - parseInt(this.domElement.style.top));
        }
      }
    }
  }

  dealDamage (targetUnit) {
    targetUnit.currentHp = targetUnit.currentHp - (this.attack - targetUnit.defense);
    if (targetUnit.currentHp <= 0) {
      targetUnit.isDying();
    }
  }

  isDying () {
    this.currentHp = 0;
    this.isAlive = false;
    this.canMove = false;
    this.canAttack = false;
    this.domElement.style.background = this.spritemap +  " " + this.width * (-4) + "px " + (-this.deadSpritePosition) + "px";
  }
}

class Building extends Object {
  constructor(player) {
    super();
    // General
    this.isUnit = false;
    this.isBuilding = true;

    // Movement
    this.canMove = false;
  }
}

class EnvironmentObject extends Object {
  constructor (player, domElement) {
    super();
    this.player = player;
    this.isEnvironmentObejct = true;
  }
}

class Tree extends EnvironmentObject {
  constructor (domElement) {
    super("neutral", domElement);
    // Genereal
    this.name = "Tree";
    this.numberOfVariants = 8;
    this.variant = Math.floor(Math.random() * 8) +1;
    this.defaultBackground = "url(res/environment_objects/tree_green_leaf/var" + this.variant + ".png)";
    this.width = 103;
    this.height = 142;
    this.domElement = domElement;
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.background = this.defaultBackground;
    this.domElement.style.backgroundSize = this.width + "px " + this.height + "px";

    // Stats
    this.hp = 50;
    this.currentHp = this.hp;
    this.attack = 0;
    this.defense = 0;
    this.canAttack = false;
    this.canMove = false;
  }
}

class WillowYellow extends EnvironmentObject {
  constructor (domElement) {
    super("neutral", domElement);
    // Genereal
    this.name = "Willow";
    this.numberOfVariants = 8;
    this.variant = Math.floor(Math.random() * 8) +1;
    this.defaultBackground = "url(res/environment_objects/willow_yellow/var" + this.variant + ".png)";
    this.width = 100;
    this.height = 123;
    this.domElement = domElement;
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.background = this.defaultBackground;
    this.domElement.style.backgroundSize = this.width + "px " + this.height + "px";

    // Stats
    this.hp = 50;
    this.currentHp = this.hp;
    this.attack = 0;
    this.defense = 0;
    this.canAttack = false;
    this.canMove = false;
  }
}

class Peasant extends Unit {
  constructor(player, domElement) {
    super(player);
    // Genereal
    this.name = "Peasant";
    this.spritemap = "url(res/units/peasant.png)";
    this.defaultBackground = "url(res/units/peasant.png) 0 0";
    this.width = 37;
    this.height = 38;
    this.domElement = domElement;
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.background = this.defaultBackground;

    // Stats
    this.hp = 50;
    this.currentHp = this.hp;
    this.attack = 0;
    this.defense = 0;
    this.canAttack = false;

    // Movement
    this.movementSpeed = 1;
  }
}

class Footman extends Unit {
  constructor(player, domElement) {
    super(player);
    // Genereal
    this.name = "Footman";
    this.spritemap = "url(res/units/footman.png)";
    this.defaultBackground = "url(res/units/footman.png) 0 0";
    this.width = 74;
    this.height = 53;
    this.domElement = domElement;
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.background = this.defaultBackground;

    // Stats
    this.hp = 100;
    this.currentHp = this.hp;
    this.attack = 25;
    this.defense = 0;
    this.canAttack = true;

    // Movement
    this.movementSpeed = 1;
    
    // Animation
    this.atkHeight = 57;
  }
}
  
class Townhall extends Building{
  constructor(player, domElement) {
    super(player);
    // General
    this.name = "Townhall";
    this.width = 128;
    this.height = 129;
    this.defaultBackground = "url(res/units/buildings_human.png) 0 -129px";
    this.domElement = domElement;
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.background = this.defaultBackground;
    
    // Stats
    this.hp = 500;
    this.currentHp = 500;
    this.defense = 1;
    this.player = player;
  }
}

class Goldmine extends Building {
  constructor(player, domElement) {
    super(player);
    // General
    this.name = "Goldmine";
    this.width = 128;
    this.height = 129;
    this.defaultBackground = "url(res/units/buildings_neutral.png) 0 0px";
    this.domElement = domElement;
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.background = this.defaultBackground;
    
    // Stats
    this.hp = 2000;
    this.currentHp = 2000;
    this.defense = 50;
    this.player = "neutral";
    this.maxGold = 2000;
    this.currentGold = 2000;
  }
}