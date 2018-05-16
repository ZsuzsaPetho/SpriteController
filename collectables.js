class Muffin extends fw.EntityWithSprite {
    constructor(x, y) {
        super(x, y);
        this.image = Muffin.image;
    }

    update() {
        const entities = index.query(this.getLeft(), this.getTop(),this.getWidth(), this.getHeight());
        for (const entity of entities) {
            if(entity instanceof Hero){
                init.scoreMuffin.increase();
                collected(this);
            }
        }
    }
}
Muffin.events = ['update'];
Muffin.image = fw.image('images/muffin.png');


class Donut extends fw.EntityWithSprite {
    constructor(x, y) {
        super(x, y);
        this.image = Donut.image;
    }

    update() {
        const entities = index.query(this.getLeft(), this.getTop(),this.getWidth(), this.getHeight());
        for (const entity of entities) {
            if(entity instanceof Hero){
                init.scoreDonut.increase();
                collected(this);
            }
        }
    }
}
Donut.events = ['update'];
Donut.image = fw.image('images/donutB.png');


class Clock extends fw.EntityWithSprite {
    constructor(x, y) {
        super(x, y);
        this.image = Clock.image;
    }

    update() {
        const entities = index.query(this.getLeft(), this.getTop(),this.getWidth(), this.getHeight());
        for (const entity of entities) {
            if(entity instanceof Hero){
                init.timeBar.reset();
                collected(this);
            }
        }
    }
}

Clock.events = ['update'];
Clock.image = fw.image('images/time.png');

function collected(item) {
    sound.noice.play('blup');
    states[state].remove(item);
}