class Player {
    constructor (id, startingGold, startingWood, isOwnedByPlayer) {
        this.id = id;
        this.gold = startingGold;
        this.wood = startingWood;
        this.isOwnedByPlayer = isOwnedByPlayer;
        this.units = [];

        switch (this.id) {
            case 0: {
                this.color = "red"; 
              break;
            }
            case 1: {
                this.color = "blue";
              break;
            }
            case 2: {
                this.color = "teal";
              break;
            }
            case 3: {
              this.color = "violet";
              break;
            }
            defautl: {
                this.color = "no color";
            }
          }
    }
}