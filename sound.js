
var sound = {};

sound.music = new Howl({
    src: ['sounds/music.mp3'],
    volume: 0.1,
    loop: true
});

sound.level2 = new Howl({
    src: ['sounds/level2.mp3'],
    volume: 0.1,
    loop: true
});

sound.noice = new Howl({
    src: ['sounds/mix.mp3'],
    sprite: {
        blup: [0, 300],
        fire: [300, 1100],
        fail: [1300, 3000],
        win: [9780, 10300]
    },
    volume: 0.3,
});

sound.stop = function() {
    sound.music.stop();
    sound.noice.stop();
};

sound.play = function () {
    sound.music.play();
    //sound.noice.play();
}