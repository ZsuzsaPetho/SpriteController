class Background extends fw.EntityWithSprite {
    constructor(x, y) {
        super(x, y);
        this.image = Background.image;
    }

}

Background.image = fw.image('images/background_1.jpg');

class Wall extends fw.Entity {

    constructor(x, y, v, h, size) {
        super(x, y);
        this.v = v;
        this.h = h;
        this.size = size;
        this.anim = 0;
    }

    draw(ctx) {
        let x = this.x;
        let y = this.y;
        for (let i = 0; i < this.v; i++) {
            ctx.drawImage(Wall.image, x, y, this.size, this.size);
            for (let j = 0; j < this.h; j++) {
                ctx.drawImage(Wall.image, x, y, this.size, this.size);
                y += this.size;
            }
            y = this.y;
            x += this.size;
        }
    }

    getWidth()
    {
        return this.size*this.v;
    }

    getHeight()
    {
        return this.size*this.h;
    }

}

class Gate extends fw.Entity {

    constructor(x, y) {
        super(x, y);
    }

    draw(ctx) {
        ctx.drawImage(Gate.image, this.x, this.y, this.getWidth(), this.getHeight());
    }

    getWidth()
    {
        return 40;
    }

    getHeight()
    {
        return 125;
    }

    update()
    {
        if(init.scoreMuffin.value >= 5){
            states[state].remove(this);
        }
    }

}

Wall.events = ['draw'];
Wall.image = fw.image('images/wall3.png');

Gate.events = ['draw', 'update'];
Gate.image = fw.image('images/gateLeft.png');

class Bullet extends fw.EntityWithSprite {
    constructor(x, y, xs, ys) {
        super(x, y);
        this.image = Bullet.image;
        this.xs = xs;
        this.ys = ys;
    }

    update() {
        this.x += this.xs;
        this.y += this.ys;
        const entities = index.query(this.getLeft(), this.getTop(),this.getWidth(), this.getHeight());
        for (const entity of entities) {
            if(entity instanceof Wall){
                state[state].remove(this);
            }
        }
    }
}
Bullet.events = ['update'];
Bullet.image = fw.image('images/donut.png');