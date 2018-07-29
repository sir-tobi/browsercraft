class Map {
    constructor () {
        // General
        this.name = "Alpha Forest";
        this.version = 0.1;
        this.description = "A player map used for alpha testing."
        this.numberOfPlayers = 2;

        // Map size
        this.width = 1500;
        this.height = 1000;

        // Textures and Tiles
        this.ground = "url(res/textures/grass.jpg)";
        this.spawnedObjects = "";
        
        this.composition =
        [
            "  T   T T                          T    ",
            "  T       T                  Z       T  ",
            "T                                     Z ",
            " Z                                   T  ",
            "                                     T  ",
            "                  T                   T ",
            "      1            Z                    ",
            "                  Z                     ",
            "                                        ",
            "                                        ",
            "                                        ",
            "                                        ",
            " T                                      ",
            "T                                       ",
            "T                                       ",
            "Z                                       ",
            " Z                                      ",
            "                                     Z  ",
            "T                                       ",
            "                                    Z T ",
            " Z                                    T ",
            "                                 2      ",
            "                                      T ",
            "                                      T ",
            "                                     T  ",
            "      Z                 T T          T  ",
            "   T               Z   T            T   ",
   
        ]

        /*
        =======================================
        Legend for Map Creation
        =======================================
        
        T = Primary Tree
        Z = Secondary Tree
        R = Rock
        1 = Player 1 starting Position
        2 = Player 2 starting Position
        3 = Player 3 starting Position
        4 = Player 4 starting Position

        =======================================
        Only change stuff until here.

        */
    }

    getMapSize () {
        return [this.width, this.height];
    }

    getMapComposition () {
        return this.composition;
    }

    intialize () {
        document.getElementById("playingArea").style.background = this.ground;
        document.height = this.height + "px";
        document.width = this.width + "px";
        document.getElementById("playingArea").style.width = this.width + "px";
        document.getElementById("playingArea").style.height = this.height + "px";
    }
}