let level1;

function initLevel() {
    level1 = new Level(
        [
            new Wraith(),
            new Wraith(),
            new Wraith(),
            new Wraith(),
            new Demon()
        ],
        [
            new Clouds('img/bg/layers/clouds_1.png'),
            new Clouds('img/bg/layers/clouds_1.png'),
            new Clouds('img/bg/layers/clouds_2.png'),
            new Clouds('img/bg/layers/clouds_2.png'),
            new Clouds('img/bg/layers/clouds_2.png')
        ],
        [
            new BgObject('img/bg/layers/sky.png', -570),
            new BgObject('img/bg/layers/rocks.png', -570),
            new BgObject('img/bg/layers/sky.png', 150),
            new BgObject('img/bg/layers/rocks.png', 150),
            new BgObject('img/bg/layers/sky.png', 720 + 150),
            new BgObject('img/bg/layers/rocks.png', 720 + 150),
            new BgObject('img/bg/layers/sky.png', 720*2 + 150),
            new BgObject('img/bg/layers/rocks.png', 720*2 + 150),
            new BgObject('img/bg/layers/sky.png', 720*3 + 150),
            new BgObject('img/bg/layers/rocks.png', 720*3 + 150)
        ],
        [
            new BgObject('img/bg/layers/ground_1.png', -570),
            new BgObject('img/bg/layers/ground_2.png', -570),
            new BgObject('img/bg/layers/ground_3.png', -570),
            new BgObject('img/bg/layers/ground_1.png', 150),
            new BgObject('img/bg/layers/ground_2.png', 150),
            new BgObject('img/bg/layers/ground_3.png', 150),
            new BgObject('img/bg/layers/ground_1.png', 720 + 150),
            new BgObject('img/bg/layers/ground_2.png', 720 + 150),
            new BgObject('img/bg/layers/ground_3.png', 720 + 150),
            new BgObject('img/bg/layers/ground_1.png', 720*2 + 150),
            new BgObject('img/bg/layers/ground_2.png', 720*2 + 150),
            new BgObject('img/bg/layers/ground_3.png', 720*2 + 150),
            new BgObject('img/bg/layers/ground_1.png', 720*3 + 150),
            new BgObject('img/bg/layers/ground_2.png', 720*3 + 150),
            new BgObject('img/bg/layers/ground_3.png', 720*3 + 150),
            new BgObject('img/bg/layers/final.png', 720*3 + 150)
        ],
        [
            new Plant(),
            new Plant(),
            new Plant(),
            new Plant(),
            new Plant(),
            new Plant(),
            new Plant(),
            new Plant(),
            new Plant(),
            new Plant()
        ],
        [
            new Crystal(),
            new Crystal(),
            new Crystal(),
            new Crystal(),
            new Crystal(),
            new Crystal(),
            new Crystal(),
            new Crystal(),
            new Crystal()
        ],
        [
            new Apple(),
            new Apple(),
            new Apple(),
            new Apple(),
            new Apple(),
            new Apple(),
            new Apple()
        ]
    );
}