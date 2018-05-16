class Enemy extends fw.Entity {
    constructor(x, y) {
        super(x, y);
        this.image = Enemy.image;
        this.anim = true;
        this.cooldown = 0;
        this.gameend = false;
        this.gameCoolDown = 1;
    }

    draw(ctx){
        if (this.anim) {
            ctx.drawImage(Enemy.image, 0, 0, 100, 129, this.x, this.y, 31, 40 );
        } else {
            ctx.drawImage(Enemy.image, 128, 0, 100, 129, this.x, this.y, 31, 40 );
        }
        if (this.cooldown === 0) {
            this.cooldown = 30;
            this.anim = !this.anim;
        }
    }

    update() {
        if(this.cooldown>0){
            this.cooldown--;
        }
        const entities = index.query(this.getLeft(), this.getTop(),this.getWidth(), this.getHeight());
        for (const entity of entities) {
            if(entity instanceof Bullet){
                states[state].remove(entity);
                states[state].remove(this);
            }
            if(entity instanceof Hero){
                states[state].remove(entity);
                sound.noice.play('fail');
                this.gameend = true;
                fw.gameOver();
            }
        }
        if (this.gameend) {
            this.gameCoolDown -= 0.0045;
            if (this.gameCoolDown < 0) {
                fw.menu();
            }
        }
    }

    getWidth() {
        return 40;
    }

    getHeight() {
        return 40;
    }
}

Enemy.events = ['update', 'draw'];

Enemy.image = fw.image('images/enemysheet.png');
