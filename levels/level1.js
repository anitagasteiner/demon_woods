let level1;

function initLevel() {
    level1 = new Level(
        [
            new Wraith(0),
            new Wraith(1),
            new Wraith(2),
            new Wraith(3),
            new Wraith(4),
            new Wraith(5),
            new Wraith(6),
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
            new Crystal(0),
            new Crystal(1),
            new Crystal(2),
            new Crystal(3),
            new Crystal(4),
            new Crystal(5),
            new Crystal(6),
            new Crystal(7),
            new Crystal(8)
        ],
        [
            new Apple(0),
            new Apple(1),
            new Apple(2),
            new Apple(3),
            new Apple(4),
            new Apple(5),
            new Apple(6),
            new Apple(7),
            new Apple(8),
            new Apple(9)
        ]
    );
}