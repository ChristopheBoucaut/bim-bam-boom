(function () {
    var Character = window.BimBamBoom.Character;
    var character = new Character('red');
    character.addControl('KeyW', Character.ACTION_MOVE_UP);
    character.addControl('KeyD', Character.ACTION_MOVE_RIGHT);
    character.addControl('KeyS', Character.ACTION_MOVE_DOWN);
    character.addControl('KeyA', Character.ACTION_MOVE_LEFT);
    character.addControl('Space', Character.ACTION_PUT_BOMB);

    var character2 = new Character('blue');
    character2.x = 20;
    character2.x = 20;
    character2.addControl('ArrowUp', Character.ACTION_MOVE_UP);
    character2.addControl('ArrowRight', Character.ACTION_MOVE_RIGHT);
    character2.addControl('ArrowDown', Character.ACTION_MOVE_DOWN);
    character2.addControl('ArrowLeft', Character.ACTION_MOVE_LEFT);
    character2.addControl('Numpad0', Character.ACTION_PUT_BOMB);

    window.BimBamBoom.mapRender.addCharacter(character);
    window.BimBamBoom.mapRender.addCharacter(character2);

    window.BimBamBoom.mapRender.render(window.BimBamBoom.maps['map1']);
})();
