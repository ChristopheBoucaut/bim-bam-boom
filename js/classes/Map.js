(function () {
    'use strict';

    class Map {
        constructor(size, walls) {
            this.size = size;
            this.walls = walls;
        }
    }

    window.BimBamBoom.Map = Map;
    window.BimBamBoom.maps = {};
})();
