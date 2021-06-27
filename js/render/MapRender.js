(function () {
    'use strict';

    var Character = window.BimBamBoom.Character;

    class MapRender {
        constructor() {
            this.container = document.querySelector('main');
            this.map = null;
            this.cells = {};
            this.characters = [];
            this.controllers = {};

            var that = this;
            document.addEventListener('keydown', function (e) {
                if (!that.controllers[e.code]) {
                    return;
                }
                var character = that.controllers[e.code];
                character.triggerControl(e.code, true);
                if (character.intervalId === null) {
                    character.intervalId = setInterval(function () {
                        that.refreshCharacterState(character);
                    }, 200);
                }
            });
            document.addEventListener('keyup', function (e) {
                if (!that.controllers[e.code]) {
                    return;
                }
                that.controllers[e.code].triggerControl(e.code, false);
            });
        }

        render(map) {
            this.clear();
            this.map = map;
            var mapEl = document.createElement('div');
            mapEl.classList.add('map');
            var cellSize = 100 / map.size;
            mapEl.style.gridTemplateColumns = 'repeat('+map.size+', '+cellSize+'vh)';
            mapEl.style.gridTemplateRows = 'repeat('+map.size+', '+cellSize+'vh)';
            mapEl.style.fontSize = (cellSize/2)+'vh';
            for (var i = 1; i <= map.size; i++) {
                this.cells[i] = {};
                for (var j = 1; j <= map.size; j++) {
                    var cellEl = document.createElement('div');
                    if (map.walls[i] && map.walls[i][j]) {
                        cellEl.classList.add('wall');
                        if (!map.walls[i][j].weak) {
                            cellEl.classList.add('invincible');
                        }
                    }
                    this.cells[i][j] = cellEl;
                    mapEl.append(cellEl);
                }
            }
            for (var i = 0; i < this.characters.length; i++) {
                this.cells[this.characters[i].y][this.characters[i].x].classList.add(this.characters[i].getClass());
            }

            this.container.append(mapEl);
        }

        addCharacter(character) {
            for (var code in character.controllers) {
                this.controllers[code] = character;
            }
            this.characters.push(character);
        }

        putBomb(x, y) {
            var that = this;
            var currentCell = this.cells[y][x];
            currentCell.classList.add('bomb');
            setTimeout(function() {
                currentCell.classList.remove('bomb');
                that.explosion(currentCell);
                var distanceSpread = 3;
                // left
                var leftCells = [];
                for (var i = 1; i <= distanceSpread; i++) {
                    if (!that.cells[y][x-i] || that.cells[y][x-i].classList.contains('invincible')) {
                        break;
                    }
                    leftCells.push(that.cells[y][x-i]);
                }
                that.spreadBomb(leftCells, currentCell);
                // right
                var rightCells = [];
                for (var i = 1; i <= distanceSpread; i++) {
                    if (!that.cells[y][x+i] || that.cells[y][x+i].classList.contains('invincible')) {
                        break;
                    }
                    rightCells.push(that.cells[y][x+i]);
                }
                that.spreadBomb(rightCells, currentCell);
                // top
                var topCells = [];
                for (var i = 1; i <= distanceSpread; i++) {
                    if (!that.cells[y-i] || !that.cells[y-i][x] || that.cells[y-i][x].classList.contains('invincible')) {
                        break;
                    }
                    topCells.push(that.cells[y-i][x]);
                }
                that.spreadBomb(topCells, currentCell);
                // bottom
                var bottomCells = [];
                for (var i = 1; i <= distanceSpread; i++) {
                    if (!that.cells[y+i] || !that.cells[y+i][x] || that.cells[y+i][x].classList.contains('invincible')) {
                        break;
                    }
                    bottomCells.push(that.cells[y+i][x]);
                }
                that.spreadBomb(bottomCells, currentCell);
            }, 2000);
        }

        spreadBomb(cells, cellOrigin) {
            var that = this;
            var cell = cells.shift();
            setTimeout(function () {
                cellOrigin.classList.remove('bomb-explosion');
                if (cell) {
                    that.explosion(cell);
                    that.spreadBomb(cells, cell);
                }
            }, 100);
        }

        explosion(cell) {
            cell.classList.forEach(function (currentClass) {
                if (currentClass.search(/^character/) === 0) {
                    alert("Fin de la partie");
                }
                cell.classList.remove(currentClass);
            });
            cell.classList.add('bomb-explosion');
        }

        refreshCharacterState(character) {
            var x = character.x;
            var y = character.y;
            var currentCell = this.cells[y][x];
            if (character.putBomb && !currentCell.classList.contains('bomb')) {
                this.putBomb(x, y);
            }
            if (character.currentDirection === null) {
                clearInterval(character.intervalId);
                character.intervalId = null;
                return;
            }

            switch (character.currentDirection) {
                case Character.ACTION_MOVE_UP:
                    if (y - 1 >= 1) {
                        y = y - 1;
                    }
                    break;
                case Character.ACTION_MOVE_RIGHT:
                    if (x + 1 <= this.map.size) {
                        x = x + 1;
                    }
                    break;
                case Character.ACTION_MOVE_DOWN:
                    if (y + 1 <= this.map.size) {
                        y = y + 1;
                    }
                    break;
                case Character.ACTION_MOVE_LEFT:
                    if (x - 1 >= 1) {
                        x = x - 1;
                    }
                    break;
            }
            if (this.cells[y][x].classList.length == 0) {
                currentCell.classList.remove(character.getClass());
                this.cells[y][x].classList.add(character.getClass());
                character.x = x;
                character.y = y;
            }

            character.updateCurrentAction();
        }

        clear() {
            this.container.innerHTML = '';
        }
    }

    window.BimBamBoom.mapRender = new MapRender();
})();
