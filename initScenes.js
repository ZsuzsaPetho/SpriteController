var init = {};

init.easy = 0.0005;
init.hard = 0.002;
init.impossible = 0.004;

init.gameSpeed = init.easy;

init.scoreMuffin;
init.scoreDonut;
init.timeBar;

init.menu = function() {
    let scene = new fw.Scene();
    init.addBorderWalls(scene);
    scene.add(
        new MyString(350, 100, "menu"),
        new Menu(
            new BtnMenu(300, 200, "easy", function() {fw.gameStart(init.easy, init.level1)}),
            new BtnMenu(300, 270, "hard", function() {fw.gameStart(init.hard, init.level1)}),
            new BtnMenu(300, 340, "impossible", function() {fw.gameStart(init.impossible, init.level1)}),
            new BtnMenu(300, 410, "credits", null),
        ),
    );
    return scene;
}

init.game = function(scene) {
    scene.add(
        new Background(0, 0),
        new Wall(0, 0, 23, 1, 40),
        new Wall(0, 560, 30, 1, 40),
        new Wall(0, 165, 1, 12, 40),
        new Wall(860, 40, 1, 15, 40),
        new Gate(0, 40),
    );
}

init.display = function(scene) {
    scene.add(
        new SoundSign(860, 10),
        init.scoreMuffin = new Number(100, 10, 0),
        new Label(20, 10, 'images/muffin.png', init.scoreMuffin),
        new Char(60, 10, 'x'),
        init.scoreDonut = new Number(240, 10, 0),
        new Label(160, 10, 'images/donutB.png', init.scoreDonut),
        new Char(200, 10, 'x'),
        init.timeBar = new TimeBar(300, 10, init.gameSpeed)
    );
}

init.level1 = function() {
    let scene = new fw.Scene();
    init.game(scene);
    scene.add(
        new Hero(100, 100),
        new Enemy(200, 335),
        new Muffin(100, 310),
        new Muffin(550, 70),
        new Muffin(550, 250),
        new Muffin(40, 450),
        new Muffin(800, 450),
        new Donut(660, 200),
        new Clock(800, 50),
        new Wall(150, 165, 12, 1, 40),
        new Wall(380, 105, 1, 2, 40),
        new Wall(180, 105, 1, 2, 40),
        new Wall(470, 20, 1, 2, 40),
        new Wall(280, 20, 1, 2, 40),
        new Wall(600, 40, 1, 7, 40),
        new Wall(40, 270, 5, 1, 40),
        new Wall(600, 300, 5, 1, 40),
        new Wall(700, 300, 1, 5, 40),
        new Wall(200, 400, 1, 5, 40),
        new Wall(400, 300, 2, 2, 40),
        new Wall(400, 460, 8, 1, 40),
        new Wall(400, 380, 1, 3, 40),
    );
    init.display(scene);
    return scene;
}

init.level2 = function() {
    let scene = new fw.Scene();
    init.game(scene);
    scene.add(
        new Hero(100, 100),
        new Enemy(200, 335),
        new Muffin(100, 310),
        new Muffin(550, 70),
        new Muffin(550, 250),
        new Muffin(40, 450),
        new Muffin(800, 450),
        new Donut(660, 200),
        new Clock(800, 50),
        /*new Wall(150, 165, 12, 1, 40),
        new Wall(380, 105, 1, 2, 40),
        new Wall(180, 105, 1, 2, 40),
        new Wall(470, 20, 1, 2, 40),
        new Wall(280, 20, 1, 2, 40),
        new Wall(600, 40, 1, 7, 40),
        new Wall(40, 270, 5, 1, 40),
        new Wall(600, 300, 5, 1, 40),
        new Wall(700, 300, 1, 5, 40),
        new Wall(200, 400, 1, 5, 40),
        new Wall(400, 300, 2, 2, 40),
        new Wall(400, 460, 8, 1, 40),
        new Wall(400, 380, 1, 3, 40),*/
    );
    init.display(scene);
    return scene;
}

init.credit = function() {
    return new fw.Scene(
        new Background(0, 0),
        new Wall(0, 0, 23, 1, 40),
        new Wall(0, 0, 1, 15, 40),
        new Wall(860, 0, 1, 15, 40),
        new Wall(0, 560, 23, 1, 40),
        );
}

init.addBorderWalls = function(scene) {
    scene.add(
        new Background(0, 0),
        new Wall(0, 0, 23, 1, 40),
        new Wall(0, 0, 1, 15, 40),
        new Wall(860, 0, 1, 15, 40),
        new Wall(0, 560, 23, 1, 40),
        new SoundSign(860, 10))
}

init.addControlButtons = function() {
    states[state].add(
        new Button(751, 415, "up"),
        new Button(750, 485, "down"),
        new Button(690, 450, "left"),
        new Button(810, 450, "right"),
        new Button(65, 450, "fire"))
}
