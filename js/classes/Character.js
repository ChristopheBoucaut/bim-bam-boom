(function () {
    'use strict';

    class Character {
        constructor(color) {
            this.color = color;
            this.x = 1;
            this.y = 1;

            this.controllers = {};
            this.currentDirection = null;
            this.intervalId = null;
            this.putBomb = false;
        }

        addControl(code, action) {
            this.controllers[code] = {
                state: false,
                action: action
            };
        }

        triggerControl(code, active) {
            if (!this.controllers[code]) {
                return;
            }

            if (active) {
                if (this.controllers[code].action !== Character.ACTION_PUT_BOMB) {
                    for (var currentCode in this.controllers) {
                        if (this.controllers[currentCode].action === Character.ACTION_PUT_BOMB) {
                            continue;
                        }
                        this.controllers[currentCode].state = false;
                    }
                }
                this.controllers[code].state = true;
                this.updateCurrentAction();
            } else {
                this.controllers[code].state = false;
            }
        }

        updateCurrentAction() {
            var newDirection = null;
            for (var code in this.controllers) {
                if (this.controllers[code].action === Character.ACTION_PUT_BOMB) {
                    this.putBomb = this.controllers[code].state;
                } else if (this.controllers[code].state) {
                    newDirection = this.controllers[code].action;
                }
            }
            this.currentDirection = newDirection;
        }

        getClass() {
            return 'character-' + this.color;
        }
    }

    Character.ACTION_MOVE_UP = 'up';
    Character.ACTION_MOVE_RIGHT = 'right';
    Character.ACTION_MOVE_DOWN = 'down';
    Character.ACTION_MOVE_LEFT = 'left';
    Character.ACTION_PUT_BOMB = 'bomb';

    window.BimBamBoom.Character = Character;
})();
