class Hero extends fw.Entity {
    constructor(x, y) {
        super(x, y);
        this.j = 0;
        this.i = 0;
        this.cooldown = 0;
        this.direction;
        this.gameend = false;
        this.gameCoolDown = 1;
        this.loop = true;
    }

    draw(ctx){
        ctx.drawImage(Hero.image, this.j*Hero.horunit, this.i*Hero.vertunit, Hero.horunit, Hero.vertunit, this.x, this.y, Hero.horunit, Hero.vertunit);
    }

    update(){
        if((this.x < 0 || this.y < 0) && this.loop) {
            this.gameend = true;
            sound.noice.play('win');
            fw.gameWon();
            this.loop = false;
        }
        if (this.gameend) {

            this.gameCoolDown -= 0.0055;
            if (this.gameCoolDown < 0) {
                fw.gameStart(init.gameSpeed, init.level2)
            }
        }
        if(this.cooldown>0){
            this.cooldown--;
        }
        if (this.j > 3){
            this.j = 0;
        }
        this.moved = false;
        for (let key in fw._controlKeys) {
            if (fw._controlKeys[key][1] === "fire") {
                this._fire(32, this.direction);
            }
            else if (fw.isDown(key) && fw._controlKeys[key][1] != "sound") {
                this.direction = Hero.directions[fw._controlKeys[key][1]];
                this._move(this.direction);
            }

        }
        if (!this.moved) {
            this.j = 0;
        }
    }

    _fire(key, dir) {
        if (fw.isDown(key) && this.cooldown===0 && init.scoreDonut.value > 0) {
            this.cooldown = 10;
            init.scoreDonut.decrease();
            states[state].add(new Bullet(this.x + Hero.horunit/3, this.y + Hero.vertunit/2, dir[0], dir[1]));
            sound.noice.play('fire');

        }
    }

   _move(dir) {
       const entitiesInWay = index.query(this.getLeft() + dir[0], this.getTop() + dir[1], this.getWidth(), this.getHeight());
       for (const entity of entitiesInWay) {
           if (entity instanceof Wall || entity instanceof Gate) {
               return;
           }
       }
        this.i = dir[2];
        this.x += dir[0];
        this.y += dir[1];
        this.j++;
        this.moved = true;
    }

    getWidth() {
        return 50;
    }

    getHeight() {
        return 55;
    }

    getTop() {
        return this.y + 10;
    }
}

Hero.directions = {"right" : [10,0,3], "left" : [-10,0,2], "up" : [0,-10,1], "down" : [0,10,0], "fire" : [0,0,0]};

Hero.vertunit = 75;
Hero.horunit = 50;

Hero.events = ['update', 'draw'];

Hero.image = fw.image('images/smallsheet.png');

