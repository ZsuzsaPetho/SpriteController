class SoundSign extends fw.EntityWithSprite {
    constructor(x, y) {
        super(x, y);
        this.image = SoundSign.image;
    }

    switch() {
        if (this.image === SoundSign.sound) {
            this.image = SoundSign.mute;
            _setMusic(true);
        } else {
            this.image = SoundSign.sound;
            _setMusic(false);
        }
    }

    update() {
        if (fw.isDown(83)) {
            this.switch();
            fw._pressedKeys[83] = false;
        }
    }
}
function _setMusic(bol) {
    sound.music.mute(bol);
    sound.noice.mute(bol);
}

SoundSign.events = ['update'];
SoundSign.sound = fw.image('images/sound.png');
SoundSign.mute = fw.image('images/mute.png');
SoundSign.image = SoundSign.sound;

class Button extends fw.EntityWithSprite {
    constructor(x, y, dir) {
        super(x, y);
        this.image = Button.data[dir][0];
        this.key = Button.data[dir][1];
    }

    update() {

    }

}

Button.up = fw.image('images/upArrowO.png');
Button.down = fw.image('images/downArrowO.png');
Button.left = fw.image('images/leftArrowO.png');
Button.right = fw.image('images/rightArrowO.png');
Button.fire = fw.image('images/fireO.png');
Button.data = { "up" : [Button.up, 38], "down" : [Button.down, 40], "left" : [Button.left, 37], "right" : [Button.right, 39], "fire" : [Button.fire, 32]};
Button.events = ['update'];

class Menu extends fw.Entity {
    constructor() {
        super(300, 100);
        this.entities = [];
        this.add.apply(this, arguments);
        this.indexOfSelected = 0;
    }

    draw(ctx){
        for (const entity of this.entities) {
            entity.draw(ctx);
        }
    }

    update() {
        this.entities[this.indexOfSelected].setUnSelected();
        if (fw.isDown(32)) {
            this.entities[this.indexOfSelected].fire();
            console.log("fired");
            fw._pressedKeys[32] = false;
        }
        if (fw.isDown(40)) {
            console.log("le");
            if (this.entities.length > this.indexOfSelected+1) {
                this.indexOfSelected += 1;
            }
            fw._pressedKeys[40] = false;
        }
        if (fw.isDown(38)) {
            console.log("fel");
            if (0 < this.indexOfSelected) {
                this.indexOfSelected -= 1;
            }
            fw._pressedKeys[38] = false;
        }
        this.entities[this.indexOfSelected].setSelected();
    }

    add() {
        for (const entity of arguments) {
            this.entities.push(entity);
        }
    }
}

Menu.events = ['update', 'draw'];


class BtnMenu extends fw.Entity {

    constructor(x, y, text, func) {
        super(x, y);
        this.text = new MyString(x + 15, y + 5, text);
        this.selector = new Selector(x - 30, y + 5);
        this.selected = false;
        this.func = func;
    }

    draw(ctx){
        this.text.draw(ctx);
        if (this.selected) {
            this.selector.draw(ctx);
        }
    }

    setSelected() {
        this.selected = true;
    }

    setUnSelected() {
        this.selected = false;
    }

    fire() {
        this.func();
    }

    update() {
    }

}

BtnMenu.events = ['update', 'draw'];

class Selector extends fw.EntityWithSprite {
    constructor(x, y) {
        super(x, y);
        this.image = Selector.image;
    }
}
Donut.events = ['update'];
Selector.image = fw.image('images/donutB.png');