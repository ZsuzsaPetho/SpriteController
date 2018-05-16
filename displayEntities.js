class TimeBar extends fw.Entity {
    constructor(x, y) {
        super(x, y);
        this.state = 1;
        this.image = TimeBar.green;
        this.speed = init.gameSpeed;
    }

    draw(ctx){
        ctx.drawImage(this.image, 0, 0, 295 * this.state, 18, this.x, this.y, 295 * this.state, 18);
    }

    update() {
        this.state -= this.speed;
        if (this.state < 0) {
            fw.menu();
        }
        else if (this.state < 0.25) {
            this.image = TimeBar.red;
        }
        else if (this.state < 0.5) {
            this.image = TimeBar.yellow;
        }
    }

    reset() {
        this.state = 1;
        this.image = TimeBar.green;
    }

    stop() {
        this.speed = 0;
    }

}

TimeBar.events = ['update', 'draw'];
TimeBar.green = fw.image('images/greenbar.png');
TimeBar.yellow = fw.image('images/yellowbar.png');
TimeBar.red = fw.image('images/redbar.png');

class Label extends fw.EntityWithSprite {
    constructor(x, y, imgPath, number) {
        super(x, y);
        this.image = fw.image(imgPath);
        this.value = number;

    }

    initValue() {
        this.value = new Number(this.x + 20, this.y, 0);
    }
}

class Number extends fw.Entity {
    constructor(x, y, value) {
        super(x, y);
        this.value = value;
        this.sheetX = value*50;
        this.sheetY = 50;
    }

    draw(ctx){
        ctx.drawImage(Symbol.sheet, this.sheetX, this.sheetY, Symbol.unit, Symbol.unit, this.x, this.y, Symbol.displayunit, Symbol.displayunit);
    }

    increase() {
        this.value += 1;
    }

    decrease() {
        this.value -= 1;
    }

    update() {
        this.sheetX = this.value*50;
    }
}
Number.events = ['update', 'draw'];

class Char extends fw.Entity {
    constructor(x, y, char) {
        super(x, y);
        this.char = char;
        this.sheetX = Symbol.cord[char]['x'];
        this.sheetY = Symbol.cord[char]['y'];
    }

    draw(ctx){
        ctx.drawImage(Symbol.sheet, this.sheetX, this.sheetY, Symbol.unit, Symbol.unit, this.x, this.y, Symbol.displayunit, Symbol.displayunit);
    }

}
Char.events = ['draw'];

class MyString extends fw.Entity {
    constructor(x, y, string) {
        super(x, y);
        this.string = string;
        this.array = [];
        this.init();
    }

    init() {
        for (let i=0; i < this.string.length; i++){
            this.array.push(new Char(this.x + i*Symbol.displayunit, this.y, this.string.charAt(i)));
        }
    }

    draw(ctx){
        for (let i=0; i < this.array.length; i++) {
            this.array[i].draw(ctx);
            }
    }

    update() {
    }
}
MyString.events = ['update', 'draw'];

Symbol.displayunit = 40;
Symbol.unit = 50;
row1 = 100;
row2 = 150;
unit = 50;
Symbol.cord = {' ': {x:0*unit, y:row1},'a': {x:1*unit, y:row1},'b': {x:2*unit, y:row1},'c': {x:3*unit, y:row1},'d': {x:4*unit, y:row1},
                'e': {x:5*unit, y:row1},'f': {x:6*unit, y:row1},'g': {x:7*unit, y:row1},'h': {x:8*unit, y:row1},'i': {x:9*unit, y:row1},
                'j': {x:10*unit, y:row1},'k': {x:11*unit, y:row1},'l': {x:12*unit, y:row1},'m': {x:13*unit, y:row1},'n': {x:14*unit, y:row1},
                'o': {x:15*unit, y:row1},
                'p': {x:0*unit, y:row2},'q': {x:1*unit, y:row2},'r': {x:2*unit, y:row2},'s': {x:3*unit, y:row2},'t': {x:4*unit, y:row2},
                'u': {x:5*unit, y:row2},'v': {x:6*unit, y:row2},'w': {x:7*unit, y:row2},'x': {x:8*unit, y:row2},'y': {x:9*unit, y:row2},
                'z': {x:10*unit, y:row2}, '!': {x:50, y:0}, ',': {x:600, y:0}};
Symbol.sheet = fw.image('images/symbols.png');