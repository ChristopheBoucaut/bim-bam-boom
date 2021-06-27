(function () {
    'use strict';

    var Wall = window.BimBamBoom.Wall;

    class Map {
        constructor(size, walls) {
            this.size = size;
            this.walls = walls;
        }
    }

    var map1 = new window.BimBamBoom.Map(20,
        {
            1: {
                2: new Wall()
            },
            2: {
                2: new Wall()
            },
            3: {
                2: new Wall()
            },
            4: {
                2: new Wall(),
                3: new Wall(true),
                4: new Wall()
            },
        }
    );

    window.BimBamBoom.maps['map1'] = map1;
})();
