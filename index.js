var isMobile = fw.checkMobile();

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var mouseX;
var mouseY;
var mouseClicked = false;
var pressedBtn;
const states = { "menu": null, "game" : null};
fw.initScenes();
var state = "menu";

$("#canvas").click(function(e){
    mouseClicked = true;
    fw.getPointerData(e);
});

$("#canvas")
    .on('pointerup', function () {
        fw._pressedKeys[pressedBtn] = false;
    })
    .on("pointerdown", function (e) {
        fw.getPointerData(e);
        const entities = index.query(mouseX, mouseY, 1, 1);
        for (const entity of entities) {
            if (entity instanceof Button) {
                fw._pressedKeys[entity.key] = true;
                pressedBtn = entity.key;
            }
        }
    });


fw.load([Hero.image, Wall.image, Background.image, Muffin.image, Donut.image, Enemy.image, Selector.image, Symbol.sheet], function() {
    setInterval(update, 16);
});

var index;

function update() {
    index = fw.createIndex(states[state]);
    fw.handlingClicks();
    states[state].fire('update');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    states[state].fire('draw', ctx);
}


